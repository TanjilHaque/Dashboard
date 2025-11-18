import React, { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams, useLocation } from "react-router";

const EditVariant = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const rowData = location.state; // coming from VariantList

  console.log("Editing Variant ID:", id, "Row Data:", rowData);

  const fileInputRef = useRef(null);

  const handleBack = () => {
    navigate("/all-variant");
  };

  // Zod Schema (matches your Variant Schema)
  const formSchema = z.object({
    variantName: z.string().min(2),
    size: z.string().min(1),
    color: z.string().min(1), // comma separated input → will convert to array
    retailPrice: z.number(),
    wholeSalePrice: z.number(),
    stockVariant: z.number(),
    alertVariantStock: z.number(),
    isActive: z.boolean().optional(),
    image: z.any().optional(), // allow multiple images
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variantName: rowData?.variantName || "",
      size: rowData?.size || "",
      color: rowData?.color?.join(", ") || "",
      retailPrice: rowData?.retailPrice || 0,
      wholeSalePrice: rowData?.wholeSalePrice || 0,
      stockVariant: rowData?.stockVariant || 0,
      alertVariantStock: rowData?.alertVariantStock || 0,
      isActive: rowData?.isActive ?? true,
      image: null,
    },
  });

  function onSubmit(values) {
    console.log("Variant submit:", values);

    const formData = new FormData();
    formData.append("variantName", values.variantName);
    formData.append("size", values.size);
    formData.append(
      "color",
      JSON.stringify(values.color.split(",").map((c) => c.trim()))
    );
    formData.append("retailPrice", values.retailPrice);
    formData.append("wholeSalePrice", values.wholeSalePrice);
    formData.append("stockVariant", values.stockVariant);
    formData.append("alertVariantStock", values.alertVariantStock);
    formData.append("isActive", values.isActive);

    if (values.image && values.image.length > 0) {
      Array.from(values.image).forEach((file) => {
        formData.append("image", file);
      });
    }

    // axios.patch(`/api/variant/${id}`, formData);

    form.reset();
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <Form {...form}>
      <div className="font-bold text-[32px] text-center">
        Editing Variant #{id}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-evenly items-center gap-5 pt-20 max-md:block">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-[30px]">
            {/* Variant Name */}
            <FormField
              control={form.control}
              name="variantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Variant Name..." {...field} />
                  </FormControl>
                  <FormDescription>Enter variant name.</FormDescription>
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
                    <Input placeholder="Size (e.g. M, L, XL)" {...field} />
                  </FormControl>
                  <FormDescription>Variant size.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Color */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color(s)</FormLabel>
                  <FormControl>
                    <Input placeholder="Red, Blue, Black..." {...field} />
                  </FormControl>
                  <FormDescription>Comma separated colors.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Images</FormLabel>
                  <FormControl>
                    <Input
                      multiple
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormDescription>Upload multiple images.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-[30px]">
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
                      placeholder="Retail Price..."
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
                  <FormDescription>Retail selling price.</FormDescription>
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
                      placeholder="Wholesale Price..."
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
                  <FormDescription>Wholesale price.</FormDescription>
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
                      placeholder="Stock..."
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
                  <FormDescription>Available stock.</FormDescription>
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
                  <FormLabel>Alert on Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Alert stock value..."
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
                  <FormDescription>Stock alert threshold.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-around items-center">
          <Button onClick={handleBack}>Back</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditVariant;
