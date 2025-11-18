import React from "react";
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const CreateSubCategory = ({ categories = [] }) => {
  // Zod Validation Schema
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Sub-category Name must be at least 2 characters.",
    }),
    categoryId: z.string().min(1, {
      message: "Please select a category.",
    }),
  });

  // React Hook Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryId: "",
    },
  });

  function onSubmit(values) {
    console.log(values);

    // Example:
    // axios.post("/api/subcategory", values)

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* ========================= Sub-category Name ========================= */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Sub-category Name..." {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your sub-category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ========================= Category Dropdown ========================= */}
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
              <FormDescription>
                Select which category this sub-category belongs to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ========================= Submit Button ========================= */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateSubCategory;
