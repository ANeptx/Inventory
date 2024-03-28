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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { AddCategory } from "./addcategory";
import { EditCategory } from "./editcategory";

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
const categorys = [
  {
    id: 1,
    name: "Fruit",
    description: "so sweety",
    lastupdate: "May 11th 2023, 4:15:29 p.m",
  },
  {
    id: 2,
    name: "Food",
    description: "so sweety",
    lastupdate: "May 11th 2023, 4:15:29 p.m.",
  },
  {
    id: 3,
    name: "test",
    description: "Food",
    lastupdate: "May 11th 2023, 4:15:29 p.m.",
  },
  {
    id: 4,
    name: "test",
    description: "Food",
    lastupdate: "May 11th 2023, 4:15:29 p.m.",
  },
  {
    id: 5,
    name: "Icecream",
    description: "so sweety",
    lastupdate: "May 11th 2023, 4:15:29 p.m.",
  },
  {
    id: 7,
    name: "meat",
    description: "เนื้อสัตว์",
    lastupdate: "February 9th 2024, 10:01:27 a.m.",
  },
  {
    id: 8,
    name: "Drink",
    description: "Drink",
    lastupdate: "February 29th 2024, 2:01:33 p.m.",
  },
];
export function TableCategory() {
  const [categoryData, setData] = useState(categorys);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditCategory, setShowEditCategory] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSave = (newData) => {
    addDataToCategory(newData); // เพิ่มข้อมูลใหม่เข้าไปในตาราง
    setShowAddCategory(false); // ปิดหน้าต่าง Add Supplier
  };
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowEditCategory(true); // ปิดหน้าต่าง EditSupplier
  };
  const handleSaveEdit = (editedCategory) => {
    const updatedCategory = categoryData.map((item) =>
      item.id === editedCategory.id ? editedCategory : item
    );
    setData(updatedCategory);
    setShowEditCategory(false);
  };
  const handleDelete = (id) => {
    const updatedCategory = categoryData.filter((item) => item.id !== id);
    setData(updatedCategory);
  };
  const addDataToCategory = (newData) => {
    const latestId = Math.max(...categoryData.map((item) => item.id));
    newData.id = latestId + 1;
    setData([...categoryData, newData]);
  };

  const filteredData = categoryData.filter((item) =>
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
    const ws = XLSX.utils.json_to_sheet(categorys);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Category");

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
          className="font-lexend bg-cyan-500 shadow-md shadow-cyan-500/50 hover:bg-cyan-600"
          onClick={() => setShowAddCategory(true)}
        >
          Add Item Category
        </Button>
      </div>
      

      <div className="items-center text-sm ">
        <div className="flex justify-end pb-4">
          <Button
            className="mr-4 font-lexend bg-green-500 hover:bg-green-600"
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
      {showEditCategory && (
        <div style={styles.addSupplierContainer}>
          <EditCategory
            category={selectedCategory}
            onSave={handleSaveEdit}
            onClose={() => setShowEditCategory(false)}
          />
        </div>
      )}
      <div className="top-0 left-0 w-full h-full z-0">
      {showAddCategory && (
        <div style={styles.addSupplierContainer}>
          <AddCategory
            onSave={handleSave}
            onClose={() => setShowAddCategory(false)}
          />
        </div>
      )}
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead  className="w-[50px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="font-light text-base text-gray-500">
                {filteredData.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>{category.lastupdate}</TableCell>
                    <TableCell className="flex justify-center">
                      <Pencil2Icon
                        className="mx-2 cursor-pointer size-5"
                        onClick={() => handleEdit(category)}
                      />
                      <Dialog>
      <DialogTrigger asChild>
      <TrashIcon
                        className="mx-2 cursor-pointer size-5"              
                      />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        
        <DialogHeader className="flex justify-center items-center text-center">
        <TriangleAlertIcon className="justify-center text-yellow-500" size={72}/>
          <DialogTitle className="text-3xl">Are you sure?</DialogTitle>
          <DialogDescription>
            You wont be able to revert this!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={() => handleDelete(category.id)} type="submit" className="bg-red-600 hover:bg-red-700">Delete</Button>
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
