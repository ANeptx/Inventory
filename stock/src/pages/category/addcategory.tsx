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

export function AddCategory({ onSave, onClose }) {
  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Category Name field is required",
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
      id: 1,
      name: "",
      description: "",
      lastupdate: "",
    },
  });

  function onSubmit(values) {
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
    }; // เพิ่มค่า last_update ใน object values
    onSave(valuesWithDate); // ส่งข้อมูลไปยัง onSave พร้อมกับข้อมูล last_update
    onClose();
  }
  return (
    <div className="flex items-center justify-center ">
      <Card className="w-[500px] h-fit overflow-y-auto">
        <CardHeader className="bg-zinc-100">
          <CardTitle className="light:invert text-stone-600">New Item Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel className="text-stone-700">Category Name *</FormLabel>
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
                      <Input {...field}/>
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
