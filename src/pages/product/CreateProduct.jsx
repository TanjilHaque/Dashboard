import React, { useRef, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

// -------------------------------- //
//           ZOD SCHEMA             //
// -------------------------------- //
const formSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  wholeSalePrice: z.number().min(0, "Wholesale price can't be negative"),
  retailPrice: z.number().min(0, "Retail price can't be negative"),
  stock: z.number().min(0, "Stock can't be negative"),

  category: z.string().min(1, "Category is required"),
  subCategory: z.string().optional(),

  brand: z.string().optional(),

  unit: z.string().min(1, "Unit is required"),
  variantType: z.string().min(1, "Variant type is required"),

  tags: z.string().optional(),

  images: z
    .any()
    .refine(
      (files) => files && files.length > 0,
      "At least one product image is required"
    ),
});

// -------------------------------- //
//          MAIN COMPONENT          //
// -------------------------------- //
const CreateProduct = () => {
  const fileInputRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      wholeSalePrice: "",
      retailPrice: "",
      stock: "",
      category: "",
      subCategory: "",
      brand: "",
      unit: "pcs",
      variantType: "singleVariant",
      tags: "",
    },
  });

  // -------------------------------- //
  //           IMAGE PREVIEW          //
  // -------------------------------- //
  const handleImagePreview = (e) => {
    const files = Array.from(e.target.files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
    form.setValue("images", e.target.files);
  };

  // -------------------------------- //
  //             SUBMIT               //
  // -------------------------------- //
  function onSubmit(values) {
    const fd = new FormData();

    fd.append("name", values.name);
    fd.append("description", values.description);
    fd.append("wholeSalePrice", values.wholeSalePrice);
    fd.append("retailPrice", values.retailPrice);
    fd.append("stock", values.stock);
    fd.append("category", values.category);
    fd.append("subCategory", values.subCategory);
    fd.append("brand", values.brand);
    fd.append("unit", values.unit);
    fd.append("variantType", values.variantType);

    // tags → convert comma-separated text into array
    const tagArr = values.tags
      ? values.tags.split(",").map((t) => t.trim())
      : [];
    fd.append("tags", JSON.stringify(tagArr));

    // multiple images
    for (let i = 0; i < values.images.length; i++) {
      fd.append("images", values.images[i]);
    }

    console.log("Submitted Values:", values);

    // axios.post("/api/product", fd)

    form.reset();
    setPreviewImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ---------------- NAME ---------------- */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ---------------- WHOLESALE PRICE ---------------- */}
          <FormField
            control={form.control}
            name="wholeSalePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wholesale Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ---------------- RETAIL PRICE ---------------- */}
          <FormField
            control={form.control}
            name="retailPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Retail Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value ?? ""}
                    placeholder="0"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ---------------- STOCK ---------------- */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ---------------- CATEGORY ---------------- */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ---------------- SUBCATEGORY ---------------- */}
          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category</FormLabel>
                <FormControl>
                  <Input placeholder="Optional..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* ---------------- BRAND ---------------- */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Brand..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* ---------------- UNIT ---------------- */}
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pcs">PCS</SelectItem>
                    <SelectItem value="kg">KG</SelectItem>
                    <SelectItem value="gram">GRAM</SelectItem>
                    <SelectItem value="custom">CUSTOM</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ---------------- VARIANT TYPE ---------------- */}
          <FormField
            control={form.control}
            name="variantType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Variant Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select variant type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="singleVariant">
                      Single Variant
                    </SelectItem>
                    <SelectItem value="multiVariant">Multi Variant</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ---------------- TAGS ---------------- */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="tag1, tag2, tag3..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* ---------------- DESCRIPTION ---------------- */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Product description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ---------------- IMAGES ---------------- */}
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem className="md:col-span-2">
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImagePreview}
                  />
                </FormControl>
                <FormMessage />

                {/* Image previews */}
                <div className="flex gap-4 mt-4 flex-wrap">
                  {previewImages.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="preview"
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* SUBMIT */}
        <div className="flex justify-center">
          <Button type="submit">Create Product</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateProduct;
