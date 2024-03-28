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
import { AddSupplier } from "./addsupplier";
import { EditSupplier } from "./editsupplier";

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
const inventorys = [
  {
    id: 1,
    company_name: "test",
    item_category: "Food",
    address: "test",
    contact_name: "test",
    contact_tel: "test",
    contact_email: "teest!@email.com",
    lastupdate: "June 23rd 2023, 9:18:43 a.m.",
    status: "Active",
  },
  {
    id: 5,
    company_name: "macro",
    item_category: "Fruit",
    address: "macro",
    contact_name: "macro staff",
    contact_tel: "0808000000",
    contact_email: "email@email.com",
    lastupdate: "February 9th 2024, 9:57:22 a.m.",
    status: "Active",
  },
  {
    id: 6,
    company_name: "test1",
    item_category: "Fruit",
    address: "",
    contact_name: "Owen",
    contact_tel: "000000000000000000",
    contact_email: "Owen@hotmail.com",
    lastupdate: "February 29th 2024, 1:53:28 p.m.",
    status: "Active",
  },
  {
    id: 7,
    company_name: "Main warehouse",
    item_category: "Product",
    address: "Main company",
    contact_name: "Oat",
    contact_tel: "0831709090",
    contact_email: "tissanu.sakhamut@triggersplus.com",
    lastupdate: "March 18th 2024, 3:19:29 p.m.",
    status: "Active",
  },
];
export function TableSupplier() {
  const [inventoryData, setData] = useState(inventorys);
  const [searchTerm, setSearchTerm] = useState("");
  const [newSupplier, setNewSupplier] = useState(null);
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showEditSupplier, setShowEditSupplier] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSave = (newData) => {
    setNewSupplier(newData);
    addDataToInventory(newData); // เพิ่มข้อมูลใหม่เข้าไปในตาราง
    setShowAddSupplier(false); // ปิดหน้าต่าง Add Supplier
  };
  const handleEdit = (inventory) => {
    setSelectedSupplier(inventory);
    setShowEditSupplier(true); // ปิดหน้าต่าง EditSupplier
  };
  const handleSaveEdit = (editedSupplier) => {
    const updatedInventory = inventoryData.map((item) =>
      item.id === editedSupplier.id ? editedSupplier : item
    );
    setData(updatedInventory);
    setShowEditSupplier(false);
  };
  const handleDelete = (id) => {
    const updatedInventory = inventoryData.filter((item) => item.id !== id);
    setData(updatedInventory);
  };
  const addDataToInventory = (newData) => {
    const latestId = Math.max(...inventoryData.map((item) => item.id));
    newData.id = latestId + 1;
    setData([...inventoryData, newData]); // เพิ่มข้อมูลใหม่ลงใน state inventoryData
  };

  const filteredData = inventoryData.filter((item) =>
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
    const ws = XLSX.utils.json_to_sheet(inventorys);
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
    <div className="flex flex-col font-lexend font-light text-base text-gray-500">
      <div className="flex justify-end pb-4">
        <Button
          className="font-lexend bg-cyan-500 shadow-md shadow-cyan-500/50 hover:bg-cyan-600"
          onClick={() => setShowAddSupplier(true)}
        >
          Add Supplier
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
          <span className="flex items-center justify-center mr-2">Status</span>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <MagnifyingGlassIcon className="size-6 m-2" />
          <Input
            className="w-350"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      {showEditSupplier && (
        <div style={styles.addSupplierContainer}>
          <EditSupplier
            inventory={selectedSupplier}
            onSave={handleSaveEdit}
            onClose={() => setShowEditSupplier(false)}
          />
        </div>
      )}
      {showAddSupplier && (
          <div style={styles.addSupplierContainer}>
            <AddSupplier
              onSave={handleSave}
              onClose={() => setShowAddSupplier(false)}
            />
          </div>
        )}
      <div className="">
        
        <Card>
          <CardContent>
            <Table>
              <TableHeader className="font-semibold text-gray-600">
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Item Category</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Contact Name</TableHead>
                  <TableHead>Contact Tel</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-base font-light text-gray-500">
                {filteredData.map((inventory) => (
                  <TableRow key={inventory.id}>
                    <TableCell>{inventory.id}</TableCell>
                    <TableCell>{inventory.company_name}</TableCell>
                    <TableCell>{inventory.item_category}</TableCell>
                    <TableCell>{inventory.address}</TableCell>
                    <TableCell>{inventory.contact_name}</TableCell>
                    <TableCell>{inventory.contact_tel}</TableCell>
                    <TableCell>{inventory.contact_email}</TableCell>
                    <TableCell>{inventory.lastupdate}</TableCell>
                    <TableCell>
                      <Button
                        className={
                          inventory.status === "Inactive"
                            ? "outline outline-red-500 text-red-500  shadow-md shadow-red-500/50 size-6 w-fit hover:outline hover:outline-red-600 hover:text-red-600 hover:bg-white bg-white"
                            : "outline outline-green-500 text-green-500  shadow-md shadow-green-500/50 size-6 w-fit hover:outline hover:outline-green-600 hover:text-green-600 hover:bg-white bg-white"
                        }
                      >
                        {inventory.status}
                      </Button>
                    </TableCell>
                    <TableCell className="flex justify-center items-center">
                      <Pencil2Icon
                        className="mx-2 cursor-pointer size-5"
                        onClick={() => handleEdit(inventory)}
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
                              onClick={() => handleDelete(inventory.id)}
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
