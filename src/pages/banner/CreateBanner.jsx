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

const CreateBanner = () => {
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
    priority: z
      .number({ invalid_type_error: "Priority must be a number" })
      .min(0, { message: "Priority cannot be negative" })
      .refine((val) => val !== undefined, { message: "Priority is required" }),
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
      priority: "",
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
    formData.append("priority", values.priority);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-evenly items-center gap-5 pt-20 max-md:block">
          <div className="flex flex-col gap-[30px]">
            {/*========================= Banner Title =========================*/}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Banner Title..." {...field} />
                  </FormControl>
                  <FormDescription>This is your banner title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*========================= Banner Description =========================*/}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Banner Description..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your banner description.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*========================= Banner Image =========================*/}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Image</FormLabel>
                  <FormControl>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload an optional banner image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*========================= Banner TargetURL =========================*/}
            <FormField
              control={form.control}
              name="targetUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Target URL..." {...field} />
                  </FormControl>
                  <FormDescription>This is your target url.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-[30px]">
            {/*========================= Banner Priority =========================*/}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Priority..."
                      value={field.value ?? ""} // allow empty string
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? undefined : Number(val));
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Give the priority of the banner.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*========================= Banner Target Type =========================*/}
            <FormField
              control={form.control}
              name="targetType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Target Type..." {...field} />
                  </FormControl>
                  <FormDescription>Target type of your banner.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*========================= Banner Start Date =========================*/}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value
                          ? field.value.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Start Date for your banner.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*========================= Banner Target Type =========================*/}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={
                        field.value
                          ? field.value.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>End date for your banner.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Button className="cursor-pointer" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateBanner;
