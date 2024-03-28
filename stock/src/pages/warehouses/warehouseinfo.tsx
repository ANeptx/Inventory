"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import * as XLSX from "xlsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { EditWarehouse } from "./editwarehouse";
import Layout from "@/components/layout";
interface EditWarehouseProps {
  warehouseData: any;
  onSave: () => void;
  onClose: () => void;
}

const inventorys = [
  {
    itemcode: "BF-002",
    stocklevel: 5,
    minimumlevel: 0,
    name: "เนื้อแกะ",
    description: "เนื้อแกะ",
    category: "meat",
    unit: "kilogram",
    status: "success",
    lastupdate: "February 9th 2024, 10:12:21 a.m.",
  },
  {
    itemcode: "BVG-200",
    stocklevel: 100,
    minimumlevel: 0,
    name: "matcha powder",
    description: "matcha powder",
    category: "Beverage",
    unit: "Kilogram",
    status: "success",
    lastupdate: "February 9th 2024, 10:14:21 a.m.",
  },
  {
    itemcode: "C001",
    stocklevel: -504,
    minimumlevel: 0,
    name: "แกะ",
    description: "แกะ 1 ตัว",
    category: "Food",
    unit: "เเกะตัว",
    status: "success",
    lastupdate: "March 13th 2024, 1:08:05 p.m.",
  },
  {
    itemcode: "APPLE-10",
    stocklevel: -1393,
    minimumlevel: 10,
    name: "Apple",
    description: "A sweet, red fruit",
    category: "Fruit",
    unit: "Piece",
    status: "success",
    lastupdate: "March 17th 2024, 4:38:00 p.m.",
  },
];

export default function WarehouseInfo() {
  const [data, setData] = useState(inventorys);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [adjustMinimumLevel, setAdjustMinimumLevel] = useState(0);
  const [selectedItem, setSelectedItem] = useState<{
    item_code: string;
    unit: string;
  } | null>(null);

  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleSearch = (event:any) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // ฟังก์ชันสำหรับสร้างไฟล์ Excel
  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = "inventory_data";

    // สร้าง Workbook และ Worksheet
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");

    // สร้างไฟล์ Excel และดาวน์โหลด
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: fileType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName + fileExtension;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Layout>
      <div className="h-screen w-full font-lexend font-light text-gray-500">
        <div className="flex items-center justify-center">
          <MagnifyingGlassIcon className="size-6 m-2" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex justify-end m-5">
          <Button className="bg-orange-500 mr-4" onClick={handleEditOpen}>
            Edit Warehouse
          </Button>
          <Button className="bg-green-500 " onClick={exportToExcel}>
            Export
          </Button>
        </div>
        <div className="w-full">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Itemcode</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Minimum Level</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Adjust</TableHead>
                    <TableHead>Adjust Minimum Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="font-light text-base text-gray-500">
                  {filteredData.map((inventory) => (
                    <TableRow key={inventory.itemcode}>
                      <TableCell>{inventory.itemcode}</TableCell>
                      <TableCell className="font-medium">
                        {inventory.stocklevel}
                      </TableCell>
                      <TableCell>{inventory.minimumlevel}</TableCell>
                      <TableCell>{inventory.name}</TableCell>
                      <TableCell>{inventory.description}</TableCell>
                      <TableCell>{inventory.category}</TableCell>
                      <TableCell>{inventory.unit}</TableCell>
                      <TableCell>{inventory.status}</TableCell>
                      <TableCell>{inventory.lastupdate}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() =>
                                setSelectedItem({
                                  item_code: inventory.itemcode,
                                  unit: inventory.unit,
                                })
                              }
                            >
                              Adjust
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Adjust</DialogTitle>
                              <DialogDescription>
                                Adjust item: {selectedItem?.item_code} on
                                warehouse: DEFAULT
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Item Lot ID
                                </Label>
                                <Select>
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="29">29</SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="note" className="text-right">
                                  Note
                                </Label>
                                <Input id="note" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center justify-between gap-4">
                                <div className="col-span-3">
                                  <Label
                                    htmlFor="quantity"
                                    className="text-right"
                                  >
                                    Quantity
                                  </Label>
                                  <Input id="quantity" />
                                </div>
                                <div className="flex flex-col text-center">
                                  <Label htmlFor="unit">Unit</Label>
                                  {selectedItem?.unit}
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit">Save changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">Adjust</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Adjust</DialogTitle>
                              <DialogDescription>
                                Adjust item minimum level: item_code:name on
                                warehouse: branch
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <Label>Minimum Level</Label>
                              <Input
                                type="number"
                                min={0}
                                value={adjustMinimumLevel}
                                onChange={(e) =>
                                  setAdjustMinimumLevel(
                                    parseInt(e.target.value)
                                  )
                                }
                              />
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={() => {
                                  const updatedData = data.map((item) => {
                                    if (item.itemcode === inventory.itemcode) {
                                      return {
                                        ...item,
                                        minimumlevel: adjustMinimumLevel,
                                      };
                                    }
                                    return item;
                                  });
                                  setData(updatedData);
                                  setIsEditOpen(false); // ปิด Dialog หลังจากแก้ไขเรียบร้อย
                                }}
                              >
                                Save changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">
                      <Pagination />
                    </TableCell>
                  </TableRow>
                </TableFooter> */}
              </Table>
            </CardContent>
          </Card>
          {isEditOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <div className="z-99">
                <EditWarehouse
                  warehouseData={"TEST"}
                  onSave={handleEditOpen}
                  onClose={handleEditClose}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
