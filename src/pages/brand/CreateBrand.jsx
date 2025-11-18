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

const CreateBrand = () => {
  // const form = useForm();
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Brand Name must be at least 2 characters.",
    }),
    image: z.any().optional(),
    // discount: z
    //   .number()
    //   .min(0, {
    //     message: "Discount cannot be less than 0%.",
    //   })
    //   .max(100, {
    //     message: "Discount cannot be more than 100%",
    //   }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: null,
      // discount: 0,
    },
  });
  const fileInputRef = useRef(null);
  function onSubmit(values) {
    const formData = new FormData();
    formData.append("name", values.name);

    if (values.image) {
      formData.append("image", values.image);
    }
    // formData.append("discount", values.discount);

    console.log(values);
    // axios.post("/api/category", formData)

    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/*========================= Brand Name =========================*/}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input placeholder="Brand Name..." {...field} />
              </FormControl>
              <FormDescription>
                This is your product brand name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*========================= Brand Image =========================*/}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Image</FormLabel>
              <FormControl>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormDescription>Upload an optional brand image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreateBrand;
