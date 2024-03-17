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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WarehouseData {
    organization_id: string;
    warehouse_name: string;
    address: string;
    contract_name: string;
    contract_email: string;
    contract_tel: string;
    branch: string;
    receive_email: boolean;
  }
  

export function EditWarehouse({ warehouseData, onSave, onClose }) {
    
  const formSchema = z.object({
    organization_id: z.string().min(1, {
      message: "Organization ID field is required",
    }),
    warehouse_name: z.string().min(1, {
      message: "Warehouse Name field is required",
    }),
    address: z.string().min(1, {
      message: "Address / Location field is required",
    }),
    contract_name: z.string().min(1, {
      message: "Contract Name field is required",
    }),
    contract_email: z.string().min(1, {
      message: "Contract Email field is required",
    }),
    contract_tel: z.string().min(1, {
      message: "Contract Tel field is required",
    }),
  });
  const form = useForm<{
    organization_id: string;
    warehouse_name: string;
    address: string;
    contract_name: string;
    contract_email: string;
    contract_tel: string;
    branch: string;
    receive_email: boolean;
  }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization_id: warehouseData?.organization_id || "",
      warehouse_name: warehouseData?.warehouse_name || "",
      address: warehouseData?.address || "",
      contract_name: warehouseData?.contract_name || "",
      contract_email: warehouseData?.contract_email || "",
      contract_tel: warehouseData?.contract_tel || "",
      branch: warehouseData?.branch || "",
      receive_email: warehouseData?.receive_email || false,
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
          <CardTitle className="light:invert">Edit Warehouse</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="organization_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization ID *</FormLabel>
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
                    <FormLabel>Warehouse Name *</FormLabel>
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
                    <FormLabel>Address / Location *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contract_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contract_email"
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
                name="contract_tel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract Tel *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col space-y-3 w-[80%]">
                <Label htmlFor="branch">Branch</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="shop2">Shop2</SelectItem>
                      <SelectItem value="shop3">Shop3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-3 w-[80%]">
                <Label htmlFor="receive_email">Receive Email</Label>
                <Switch id="receive-email" />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button className="bg-sky-800" type="submit" onClick={onSave}>
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
