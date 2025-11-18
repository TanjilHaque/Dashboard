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

const EditBrand = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const rowData = location.state;

  console.log("Editing row:", rowData);

  const fileInputRef = useRef(null);

  const formSchema = z.object({
    name: z.string().min(2),
    image: z.any(),
    startDate: z.date(),
    endDate: z.date(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: rowData?.name || "",
      image: null,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  function onSubmit(values) {
    console.log("Submitted values:", values);

    const formData = new FormData();
    formData.append("title", values.name);

    if (values.image) {
      formData.append("image", values.image);
    }

    form.reset();
  }

  return (
    <Form {...form}>
      <div className="font-bold text-[32px] text-center">
        Editing Brand #{id}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-around items-center">
          <Button onClick={() => navigate("/all-brand")}>Back</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditBrand;
