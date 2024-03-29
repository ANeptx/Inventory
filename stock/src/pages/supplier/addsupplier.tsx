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

export function AddSupplier({ onSave, onClose }) {
  const formSchema = z.object({
    company_name: z.string().min(1, {
      message: "Company Name field is required",
    }),
    item_category: z.string(),
    address: z.string(),
    contact_name: z.string().min(1, {
      message: "Contact Name field is required",
    }),
    contact_tel: z.string().min(1, {
      message: "Contact Tel field is required",
    }),
    contact_email: z.string().min(1, {
      message: "Contact Email field is required",
    }),
    status: z.boolean(),
  });
  const form = useForm<{
    id: number;
    company_name: string;
    item_category: string;
    address: string;
    contact_name: string;
    contact_tel: string;
    contact_email: string;
    lastupdate: string;
    status: boolean;
  }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 1,
      company_name: "",
      item_category: "",
      address: "",
      contact_name: "",
      contact_tel: "",
      contact_email: "",
      lastupdate: "",
      status: false,
    },
  });

  function onSubmit(values) {
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
    onSave(valuesWithDate); // ส่งข้อมูลไปยัง onSave พร้อมกับข้อมูล last_update
    onClose();
  }
  return (
    <div className="flex items-center">
      <Card className="w-[500px] h-[700px] overflow-y-auto">
        <CardHeader className="bg-gray-100">
          <CardTitle className="light:invert">New Supplier</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Item Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent  style={{ zIndex: 9999 }}>
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
              <FormField
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact_tel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Tel *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract Email *</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
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
