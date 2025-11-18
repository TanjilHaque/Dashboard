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

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const rowData = location.state; // row data from ProductList

  console.log("Editing Product ID:", id, "Row Data:", rowData);

  const fileInputRef = useRef(null);

  const handleBackBtn = () => {
    navigate("/all-product");
  };

  // Zod Validation Schema
  const formSchema = z.object({
    name: z.string().min(2),
    category: z.string().min(2),
    price: z.number(),
    stock: z.number(),
    image: z.any(),
    description: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: rowData?.name || "",
      category: rowData?.category || "",
      price: rowData?.price || 0,
      stock: rowData?.stock || 0,
      description: rowData?.description || "",
      image: null, // cannot prefill file input
    },
  });

  function onSubmit(values) {
    console.log("Product submitted:", values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("stock", values.stock);
    formData.append("description", values.description || "");

    if (values.image) {
      formData.append("image", values.image);
    }

    // axios.patch(`/api/product/${id}`, formData);

    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <Form {...form}>
      <div className="font-bold text-[32px] text-center">
        Editing Product #{id}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-evenly items-center gap-5 pt-20 max-md:block">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-[30px]">
            {/* Product Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name..." {...field} />
                  </FormControl>
                  <FormDescription>This is your product name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category..." {...field} />
                  </FormControl>
                  <FormDescription>Product category.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormDescription>Upload a product image.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Description..." {...field} />
                  </FormControl>
                  <FormDescription>Your product description.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-[30px]">
            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price..."
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? undefined : Number(val));
                      }}
                    />
                  </FormControl>
                  <FormDescription>Product price.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stock */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Stock..."
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? undefined : Number(val));
                      }}
                    />
                  </FormControl>
                  <FormDescription>Available stock.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-around items-center">
          <Button onClick={handleBackBtn}>Back</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProduct;
