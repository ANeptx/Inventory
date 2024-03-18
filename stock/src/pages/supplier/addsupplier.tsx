"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Label } from "@/components/ui/label";
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

export function AddSupplier({ onSave, onClose }) {
  const formSchema = z.object({
    company_name: z.string().min(1, {
      message: "Organization ID field is required",
    }),
    warehouse_name: z.string().min(1, {
      message: "Warehouse Name field is required",
    }),
    address: z.string().min(1, {
      message: "Address / Location field is required",
    }),
    contact_name: z.string().min(1, {
      message: "Contract Name field is required",
    }),
    contact_email: z.string().min(1, {
      message: "Contract Email field is required",
    }),
    contact_tel: z.string().min(1, {
      message: "Contract Tel field is required",
    }),
  });
  const form = useForm<{
    company_name: string;
    warehouse_name: string;
    address: string;
    contact_name: string;
    contact_email: string;
    contact_tel: string;
    branch: string;
    receive_email: boolean;
  }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      warehouse_name: "",
      address: "",
      contact_name: "",
      contact_email: "",
      contact_tel: "",
      branch: "",
      receive_email: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values);
    console.log(values);
  }
  return (
    <div className="h-[50%] ">
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
                  <FormLabel>Company name *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="warehouse_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
              name="contact_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email *</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
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
                  <FormLabel>Contact Email *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-3 w-[80%]">
              <Label htmlFor="active">Active</Label>
              <Switch id="active" />
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
