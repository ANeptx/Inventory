"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddStock({ onSave, onClose }:any) {
  const formSchema = z.object({
    code: z.string().min(1, {
      message: "Code field is required",
    }),
    description: z.string(),
    name: z.string().min(1, {
      message: "Name field is required",
    }),
    item_category: z.string().min(1, {
      message: "Category Name field is required",
    }),
    display_unit: z.string().min(1, {
      message: "Display Unit field is required",
    }),
    base_unit: z.string().min(1, {
      message: "Cutting Stock Unit field is required",
    }),
  });
  const form = useForm<{
    id: number;
    code: string;
    name: string;
    description: string;
    item_category: string;
    display_unit: string;
    base_unit: string;
  }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 1,
      code: "",
      name: "",
      description: "",
      item_category: "",
      display_unit: "",
      base_unit: "",
    },
  });

  function onSubmit(values:any) {
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
                    <FormLabel className="text-stone-700">Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel className="text-stone-700">Code *</FormLabel>
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
              <FormField
                control={form.control}
                name="item_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Category *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="fruit">Fruit</SelectItem>
                            <SelectItem value="food">Food</SelectItem>
                            <SelectItem value="beverage">Beverage</SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                            <SelectItem value="icecream">Icecream</SelectItem>
                            <SelectItem value="meat">Meat</SelectItem>
                            <SelectItem value="drink">Drink</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-12">
              <FormField
                control={form.control}
                name="display_unit"
                render={({ field }) => (
                  <FormItem className="col-span-6">
                    <FormLabel>Display Unit *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="gram">Gram</SelectItem>
                            <SelectItem value="milligram">Milligram</SelectItem>
                            <SelectItem value="kilogram">Kilogram</SelectItem>
                            <SelectItem value="100grams">ขีด</SelectItem>
                            <SelectItem value="ounce">Ounce</SelectItem>
                            <SelectItem value="pound">Pound</SelectItem>
                            <SelectItem value="unit">Unit</SelectItem>
                            <SelectItem value="box">Box</SelectItem>
                            <SelectItem value="can">Can</SelectItem>
                            <SelectItem value="piece">Piece</SelectItem>
                            <SelectItem value="milliliter">Milliliter</SelectItem>
                            <SelectItem value="sheep">แกะตัว</SelectItem>
                            <SelectItem value="oil">น้ำมัน ขวด</SelectItem>
                            <SelectItem value="oilpack">น้ำมัน ลัง</SelectItem>
                            <SelectItem value="liter">Liter</SelectItem>
                            <SelectItem value="water">น้ำดื่มแพ็ค</SelectItem>
                            <SelectItem value="waterpack">น้ำดื่มขวด</SelectItem>
                            <SelectItem value="bowl">กระปุก</SelectItem>
                            <SelectItem value="wiskey">Wiskey 700ml Bottle</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="base_unit"
                render={({ field }) => (
                  <FormItem className="col-span-6 ml-6">
                    <FormLabel>Cutting Stock Unit *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                          <SelectItem value="gram">Gram</SelectItem>
                            <SelectItem value="ounce">Ounce</SelectItem>
                            <SelectItem value="unit">Unit</SelectItem>
                            <SelectItem value="box">Box</SelectItem>
                            <SelectItem value="can">Can</SelectItem>
                            <SelectItem value="piece">Piece</SelectItem>
                            <SelectItem value="milliliter">Milliliter</SelectItem>
                            <SelectItem value="oil">น้ำมัน ขวด</SelectItem>
                            <SelectItem value="liter">Liter</SelectItem>
                            <SelectItem value="water">น้ำดื่มแพ็ค</SelectItem>
                            <SelectItem value="waterpack">น้ำดื่มขวด</SelectItem>
                            <SelectItem value="bowl">กระปุก</SelectItem>
                            <SelectItem value="bottle">Bottle</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>


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
