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
import { useNavigate, useParams, useLocation } from "react-router";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const EditSubCategory = ({ categories = [] }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const rowData = location.state;

  console.log("Editing Sub-Category Row:", rowData);

  const fileInputRef = useRef(null);

  // ---------------- Zod Validation ----------------
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    categoryId: z.string().min(1, { message: "Category is required" }),
    image: z.any().optional(),
  });

  // ---------------- Form Defaults ----------------
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: rowData?.name || "",
      categoryId: rowData?.categoryId || "",
      image: null,
    },
  });

  // ---------------- Submit Handler ----------------
  function onSubmit(values) {
    console.log("Updated SubCategory:", values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("categoryId", values.categoryId);

    if (values.image) {
      formData.append("image", values.image);
    }

    form.reset();
  }

  return (
    <Form {...form}>
      <div className="font-bold text-[32px] text-center">
        Editing Sub-Category #{id}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Sub-Category Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-Category Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter sub-category name..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Parent Category Dropdown */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Parent Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a category..." />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      No categories found
                    </div>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-Category Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  accept="image/*"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-around items-center">
          <Button onClick={() => navigate("/all-subcategory")}>Back</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditSubCategory;
