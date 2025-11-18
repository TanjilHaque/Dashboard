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

const EditBanner = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const rowData = location.state; // row data from BannerList

  console.log("Editing Banner ID:", id, "Row Data:", rowData);

  const handleBackBtn = () => {
    navigate("/all-banner");
  };

  const fileInputRef = useRef(null);

  const formSchema = z.object({
    title: z.string().min(2),
    image: z.any(),
    description: z.string().min(5),
    targetUrl: z.string(),
    targetType: z.string(),
    priority: z.number(),
    startDate: z.date(),
    endDate: z.date(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: rowData?.title || "",
      description: rowData?.description || "",
      targetUrl: rowData?.targetUrl || "",
      priority: rowData?.priority || 0,
      targetType: rowData?.targetType || "Category",
      image: null, // file cannot be prefilled
      startDate: rowData?.startDate ? new Date(rowData.startDate) : new Date(),
      endDate: rowData?.endDate ? new Date(rowData.endDate) : new Date(),
    },
  });

  function onSubmit(values) {
    console.log("Banner submitted:", values);

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

    // axios.patch(`/api/banner/${id}`, formData);

    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <Form {...form}>
      <div className="font-bold text-[32px] text-center">
        Editing Banner #{id}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-evenly items-center gap-5 pt-20 max-md:block">
          <div className="flex flex-col gap-[30px]">
            {/* Banner Title */}
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

            {/* Banner Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Banner Description..." {...field} />
                  </FormControl>
                  <FormDescription>Your banner description.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Banner Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormDescription>Upload a banner image.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Banner Target URL */}
            <FormField
              control={form.control}
              name="targetUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Target URL..." {...field} />
                  </FormControl>
                  <FormDescription>Link for the banner.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-[30px]">
            {/* Priority */}
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
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? undefined : Number(val));
                      }}
                    />
                  </FormControl>
                  <FormDescription>Higher means more visible.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Target Type */}
            <FormField
              control={form.control}
              name="targetType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Target Type..." {...field} />
                  </FormControl>
                  <FormDescription>Category or Product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date */}
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
                  <FormDescription>Start date of banner.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date */}
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
                  <FormDescription>End date of banner.</FormDescription>
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

export default EditBanner;
