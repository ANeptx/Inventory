"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function EditCategory({ onSave, onClose, category }) {


  
  const formSchema = z.object({
    id: z.number(),
    name: z.string().min(1, {
      message: "Item Category name field is required",
    }),
    description: z.string(),
    lastupdate: z.string(),
  });
  const form = useForm<{
    id: number;
    name: string;
    description: string;
    lastupdate: string;
  }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        id: category.id,
        name: category.name,
        description: category.description,
        lastupdate: category.lastupdate,
      },
  });


  function onSubmit(values) {
    console.log(values)
    const statusValue = values.status ? "Active" : "Inactive";
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      weekday: undefined,
      era: undefined,
      timeZoneName: undefined,
    };
    const currentDate = new Date().toLocaleString("en-US", options); // ดึงข้อมูลวันที่และเวลาปัจจุบัน
    const formattedDate = currentDate.replace(/(\d+)(st|nd|rd|th)/, "$1$2");
    const valuesWithDate = {
      ...values,
      lastupdate: formattedDate,
      status: statusValue,
    }; // เพิ่มค่า last_update ใน object values
  onSave(valuesWithDate); // ส่ง id และข้อมูลที่แก้ไขไปยัง onSave
  onClose();
  }
  return (
    <div className="flex items-center">
      <Card className="w-[500px] h-fit overflow-y-auto">
        <CardHeader className="bg-gray-100">
          <CardTitle className="light:invert">Edit Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button className="bg-sky-800" type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
