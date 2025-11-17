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
import { useNavigate } from "react-router";

const EditCategory = () => {
  const naviagate = useNavigate();
  const handleBackBtn = () => {
    console.log("handleBackBtn clicked");
    naviagate("/all-category");
  };
  // const form = useForm();
  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    image: z.any().refine((file) => file instanceof File, {
      message: "Image is required",
    }),
    description: z.string().min(5, {
      message: "Description has to be at least 5 characters.",
    }),
    targetUrl: z.string(),
    targetType: z.string(),
    startDate: z.date(),
    endDate: z.date(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: null,
      description: "",
      targetUrl: "",
      targetType: "Category",
      startDate: new Date(),
      endDate: new Date(),

      // discount: 0,
    },
  });
  const fileInputRef = useRef(null);
  function onSubmit(values) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("targetUrl", values.targetUrl);
    formData.append("targetType", values.targetType);
    formData.append("startDate", values.startDate);
    formData.append("endDate", values.endDate);

    if (values.image) {
      formData.append("image", values.image);
    }

    console.log(values);
    // axios.post("/api/category", formData)

    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }
  return (
    <Form {...form}>
      <div className="font-bold text-[32px] text-center">
        Edit Your Category
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-evenly items-center gap-5 pt-20 max-md:block">
          <div className="flex flex-col gap-[30px]">
            {/*========================= Category Name =========================*/}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Banner Title..." {...field} />
                  </FormControl>
                  <FormDescription>This is your Category Name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*========================= Category Image =========================*/}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Image</FormLabel>
                  <FormControl>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload an optional Category image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-around items-center">
          <Button className="cursor-pointer" onClick={handleBackBtn}>
            Back
          </Button>
          <Button className="cursor-pointer" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditCategory;
