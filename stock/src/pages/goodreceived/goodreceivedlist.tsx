import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { Label } from "@radix-ui/react-label";
export const GoodReceivedList = () => {
  const [items, setItems] = useState([]);
  const formSchema = z.object({
    warehouse_id: z.number(),
    warehouse: z.string().min(1, {
      message: "Warehouse field is required",
    }),
    supplier: z.string().min(1, {
      message: "Supplier field is required",
    }),
    date: z.date(),
    credit: z.string(),
    duedate: z.date(),
    item_id: z.number(),
    item: z.string().min(1, {
      message: "Item field is required",
    }),
    quantity: z.string().min(1, {
      message: "Quantity field is required",
    }),
    price: z.string().min(1, {
      message: "Price field is required",
    }),
    total: z.number(),
    unit: z.string().min(1, {
      message: "Unit field is required",
    }),
    expire: z.date(),
  });
  const form = useForm<{
    warehouse_id: number;
    warehouse: string;
    supplier: string;
    date: Date;
    credit: string;
    duedate: Date;
    item_id: number;
    item: string;
    quantity: string;
    price: string;
    total: number;
    unit: string;
    expire: Date;
  }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      warehouse_id: 1,
      warehouse: "",
      supplier: "",
      date: new Date(),
      credit: "",
      duedate: new Date(),
      item_id: 1,
      item: "",
      quantity: "",
      price: "",
      total: 0.0,
      unit: "",
      expire: new Date(),
    },
  });
  const onSubmit = (values:any) => {
  };
  const handleAddItem = () => {
    const newItem = {
      id: generateUniqueId(), // สร้าง ID ใหม่สำหรับแถวใหม่
      item: form.getValues("item"), // ใช้ค่าจากฟอร์มสำหรับรายการ item
      quantity: form.getValues("quantity"),
      price: form.getValues("price"),
      total: Number(form.getValues("quantity")) * Number(form.getValues("price")), // คำนวณค่า total
      unit: form.getValues("unit"),
    };
    setItems([...items, newItem]);
  };

  return (
    <div className="flex mt-6 items-center justify-center text-base">
      <Card className="w-full">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-12 mt-4">
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="warehouse"
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel className="font-light text-base text-gray-600">
                          Warehouse *
                        </FormLabel>
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
                                <SelectItem value="shop2">
                                  organization id:1 SHOP2
                                </SelectItem>
                                <SelectItem value="main">
                                  organization id:1 Main warehouse
                                </SelectItem>
                                <SelectItem value="shop1">
                                  organization id:1 SHOP1
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4 ml-6">
                  <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel className="font-light text-base text-gray-600">
                          Supplier *
                        </FormLabel>
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
                                <SelectItem value="test">
                                  company:test, name:test
                                </SelectItem>
                                <SelectItem value="macro_manager">
                                  company:Macro, name:Maneger
                                </SelectItem>
                                <SelectItem value="macro_staff">
                                  company:Macro, name:Macro Staff
                                </SelectItem>
                                <SelectItem value="test_owen">
                                  company:test1, name:Owen
                                </SelectItem>
                                <SelectItem value="main">
                                  company:Main warehouse, name:Oat
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-3 ml-6 flex items-center justify-end font-light text-base text-gray-600">
                  Good Received Note
                </div>
              </div>
              <div className="grid grid-cols-12 mt-4">
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-light text-base text-gray-600">
                          Date *
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-light text-base text-gray-500",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4 ml-6">
                  <FormField
                    control={form.control}
                    name="credit"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="font-light text-base text-gray-600">
                          Credit(days)
                        </FormLabel>
                        <FormControl>
                          <Input {...field}></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4 ml-6 font-thin">
                  <FormField
                    control={form.control}
                    name="duedate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-light text-base text-gray-600">
                          Due Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left font-light text-base text-gray-500",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div>
                <Label className="font-light text-base text-gray-600">
                  Search
                </Label>
                <Input type="search"></Input>
              </div>
              {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 mt-4">
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="item"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="font-light text-base text-gray-600">
                          Item *
                        </FormLabel>
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
                                <SelectItem value="apple">
                                  APPLE-10: Apple
                                </SelectItem>
                                <SelectItem value="sheep">
                                  BF-002: เนื้อแกะ
                                </SelectItem>
                                <SelectItem value="water">
                                  BVG-000: น้ำดื่ม
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2 ml-6">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="font-light text-base text-gray-600">
                          Qty *
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="font-light text-base text-gray-500"></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2 ml-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="font-light text-base text-gray-600">
                          Price *
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="font-light text-base text-gray-500"></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="ml-6">
                  <FormField
                    control={form.control}
                    name="total"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="font-light text-base text-gray-600">
                          Total Price
                        </FormLabel>
                        <FormControl>
                          <Label
                            className="font-light text-base text-gray-500"
                            style={{ display: "block" }}
                          >
                            {(
                              Number(form.getValues("quantity")) *
                              Number(form.getValues("price"))
                            ).toFixed(2)}
                          </Label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="font-light text-base text-gray-600">
                          Unit *
                        </FormLabel>
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
                                <SelectItem value="select">Select</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-3 ml-6">
                  <FormField
                    control={form.control}
                    name="expire"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-light text-base text-gray-600">
                          Due Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left font-light text-base text-gray-500",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              ))}
              <div className="font-light text-semibold flex justify-end text-gray-500">
                Amount Total 0.000
              </div>
              <div className="flex justify-between">
                <Button className="bg-cyan-500" onClick={handleAddItem}>Add Item</Button>
              </div>
              <div className="flex justify-end">
                <Button className="bg-green-500" type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
