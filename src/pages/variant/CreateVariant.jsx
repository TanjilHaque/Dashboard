import React, { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const CreateVariant = ({ productList = [] }) => {
  const fileInputRef = useRef(null);

  // ---------------- Zod Schema ----------------
  const formSchema = z.object({
    product: z.string().min(1, { message: "Product is required" }),
    variantName: z.string().min(2, { message: "Variant name is required" }),
    size: z.string().min(1, { message: "Size is required" }),
    color: z.array(z.string()).min(1, { message: "Select at least 1 color" }),
    stockVariant: z.number().min(0),
    alertVariantStock: z.number().min(0),
    retailPrice: z.number().min(0),
    wholeSalePrice: z.number().min(0),
    image: z.any().optional(),
  });

  // ---------------- Form ----------------
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: "",
      variantName: "",
      size: "",
      color: [],
      stockVariant: 0,
      alertVariantStock: 0,
      retailPrice: 0,
      wholeSalePrice: 0,
      image: null,
    },
  });

  // ---------------- Handle Submit ----------------
  function onSubmit(values) {
    console.log(values);

    const formData = new FormData();
    formData.append("product", values.product);
    formData.append("variantName", values.variantName);
    formData.append("size", values.size);
    values.color.forEach((c) => formData.append("color[]", c));
    formData.append("stockVariant", values.stockVariant);
    formData.append("alertVariantStock", values.alertVariantStock);
    formData.append("retailPrice", values.retailPrice);
    formData.append("wholeSalePrice", values.wholeSalePrice);

    if (values.image && values.image.length > 0) {
      for (let imgFile of values.image) {
        formData.append("image", imgFile);
      }
    }

    console.log("FORMDATA:", [...formData.entries()]);

    form.reset();
    fileInputRef.current.value = "";
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-4 max-w-xl mx-auto"
      >
        {/* Product Dropdown */}
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Product</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {productList.length > 0 ? (
                    productList.map((p) => (
                      <SelectItem key={p._id} value={p._id}>
                        {p.title}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-neutral-500">
                      No products found
                    </div>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Variant Name */}
        <FormField
          control={form.control}
          name="variantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Small Blue Variant" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Size */}
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., XL, Medium, 32" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Color Multi-Select (comma separated input) */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colors</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter colors separated by comma: red, blue, black"
                  onChange={(e) => {
                    const arr = e.target.value
                      .split(",")
                      .map((c) => c.trim())
                      .filter(Boolean);
                    field.onChange(arr);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stock */}
        <FormField
          control={form.control}
          name="stockVariant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Alert Stock */}
        <FormField
          control={form.control}
          name="alertVariantStock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alert Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Retail Price */}
        <FormField
          control={form.control}
          name="retailPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Retail Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Wholesale Price */}
        <FormField
          control={form.control}
          name="wholeSalePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wholesale Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload (multiple) */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={(e) => field.onChange(e.target.files)}
                  accept="image/*"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button type="submit" className="w-full">
          Create Variant
        </Button>
      </form>
    </Form>
  );
};

export default CreateVariant;
