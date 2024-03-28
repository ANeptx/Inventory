"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";

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

export function EditSupplier({ onSave, onClose, inventory }) {


  
  const formSchema = z.object({
    id: z.number(),
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
        id: inventory.id,
        company_name: inventory.company_name,
        item_category: inventory.item_category,
        address: inventory.address,
        contact_name: inventory.contact_name,
        contact_tel: inventory.contact_tel,
        contact_email: inventory.contact_email,
        lastupdate: inventory.lastupdate,
        status: false,
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
    <div className="h-[50%]">
      <Card className="w-[500px] h-[700px] overflow-y-auto">
        <CardHeader className="bg-gray-100">
          <CardTitle className="light:invert">Edit Supplier</CardTitle>
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
                    
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        </FormControl>
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
