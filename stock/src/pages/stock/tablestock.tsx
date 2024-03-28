import { useState } from "react";
import React from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { TriangleAlertIcon } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { AddStock } from "./addstock";
import { EditStock } from "./editstock";
const styles = {
  addSupplierContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // สีพื้นหลังสำหรับให้มืดลง
    display: "flex",
    justifyContent: "center",
    zIndex: 999, // ตั้งค่า z-index สูงกว่า Table
  },
};
const stocks = [
  {
    id: 1,
    code: "APPLE-10",
    name: "Fruit",
    item_category: "Fruit",
    description: "A sweet, red fruit",
    stock_level: "-1705",
    display_unit: "Piece",
    base_unit: "Piece",
  },
  {
    id: 2,
    code: "ORANGE-10",
    name: "Orange",
    item_category: "Fruit",
    description: "A citrusy, orange fruitt",
    stock_level: "-158",
    display_unit: "Piece",
    base_unit: "Piece",
  },
  {
    id: 3,
    code: "SODA-10",
    name: "Soda",
    item_category: "Beverage",
    description: "A refreshing, carbonated beverage",
    stock_level: "200",
    display_unit: "Can",
    base_unit: "Can",
  },
  {
    id: 4,
    code: "CHEKEN-10",
    name: "Chicken",
    item_category: "Food",
    description: "",
    stock_level: "299934",
    display_unit: "Kilogram",
    base_unit: "Gram",
  },
  {
    id: 5,
    code: "test-001",
    name: "test",
    item_category: "Fruit",
    description: "test",
    stock_level: "132517.6",
    display_unit: "Pound",
    base_unit: "Gram",
  },
];
export function TableStock() {
  const [stockData, setData] = useState(stocks);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddStock, setShowAddStock] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [showEditStock, setShowEditStock] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSave = (newData) => {
    addDataToStock(newData); // เพิ่มข้อมูลใหม่เข้าไปในตาราง
    setShowAddStock(false); // ปิดหน้าต่าง Add Supplier
  };
  const handleEdit = (stock) => {
    setSelectedStock(stock);
    setShowEditStock(true); // ปิดหน้าต่าง EditSupplier
  };
  const handleSaveEdit = (editedStock) => {
    const updatedStock = stockData.map((item) =>
      item.id === editedStock.id ? editedStock : item
    );
    setData(updatedStock);
    setShowEditStock(false);
  };
  const handleDelete = (id) => {
    const updatedStock = stockData.filter((item) => item.id !== id);
    setData(updatedStock);
  };
  const addDataToStock = (newData) => {
    const latestId = Math.max(...stockData.map((item) => item.id));
    newData.id = latestId + 1;
    setData([...stockData, newData]);
  };

  const filteredData = stockData.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = "inventory_data";

    // สร้าง Workbook และ Worksheet
    const ws = XLSX.utils.json_to_sheet(stocks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stock");

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
    <div className="flex flex-col font-lexend font-light">
      <div className="flex justify-end pb-4">
        <Button
          className="bg-cyan-500 shadow-md shadow-cyan-500/50 hover:bg-cyan-600"
          onClick={() => setShowAddStock(true)}
        >
          Add Item
        </Button>
      </div>

      <div className="items-center text-sm ">
        <div className="flex justify-end pb-4">
          <Button
            className="mr-4 font-prompt bg-green-500 hover:bg-green-600"
            onClick={exportToExcel}
          >
            Export
          </Button>
    
          <MagnifyingGlassIcon className="size-6 m-2" />
          <Input
            className="w-350"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      {showEditStock && (
        <div style={styles.addSupplierContainer}>
          <EditStock
            stock={selectedStock}
            onSave={handleSaveEdit}
            onClose={() => setShowEditStock(false)}
          />
        </div>
      )}
      <div className="top-0 left-0 w-full h-full z-0">
        {showAddStock && (
          <div style={styles.addSupplierContainer}>
            <AddStock
              onSave={handleSave}
              onClose={() => setShowAddStock(false)}
            />
          </div>
        )}
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Item Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Display Unit</TableHead>
                  <TableHead>Base Unit</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="font-light text-base text-gray-500">
                {filteredData.map((stock) => (
                  <TableRow key={stock.id}>
                    <TableCell>{stock.id}</TableCell>
                    <TableCell>{stock.code}</TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.item_category}</TableCell>
                    <TableCell>{stock.description}</TableCell>
                    <TableCell>{stock.stock_level}</TableCell>
                    <TableCell>{stock.display_unit}</TableCell>
                    <TableCell>{stock.base_unit}</TableCell>
                    <TableCell className="flex justify-center items-center">
                      <Pencil2Icon
                        className="mx-2 cursor-pointer size-5"
                        onClick={() => handleEdit(stock)}
                      />
                      <Dialog>
                        <DialogTrigger asChild>
                          <TrashIcon className="mx-2 cursor-pointer size-5" />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader className="flex justify-center items-center text-center">
                            <TriangleAlertIcon
                              className="justify-center text-yellow-500"
                              size={72}
                            />
                            <DialogTitle className="text-3xl">
                              Are you sure?
                            </DialogTitle>
                            <DialogDescription>
                              You wont be able to revert this!
                            </DialogDescription>
                          </DialogHeader>

                          <DialogFooter>
                            <Button
                              onClick={() => handleDelete(stock.id)}
                              type="submit"
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
