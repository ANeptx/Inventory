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
const historys = [
  {
    id: 1,
    date: "March 18th 2024, 3:20:19 p.m.",
    warehouse_id: 9,
    warehouse_name: "Warehouse1",
    note: "",
  },
  {
    id: 2,
    date: "March 18th 2024, 3:20:19 p.m.",
    warehouse_id: 3,
    warehouse_name: "Warehouse2",
    note: "add defult from system",
  },
  {
    id: 3,
    date: "March 18th 2024, 3:20:19 p.m.",
    warehouse_id: 9,
    warehouse_name: "Warehouse1",
    note: "add defult from system",
  },
  {
    id: 4,
    date: "March 18th 2024, 3:20:19 p.m.",
    warehouse_id: 3,
    warehouse_name: "Warehouse2",
    note: "add defult from system",
  },
  {
    id: 5,
    date: "March 18th 2024, 3:20:19 p.m.",
    warehouse_id: 9,
    warehouse_name: "Warehouse1",
    note: "add defult from system",
  },
  {
    id: 6,
    date: "March 18th 2024, 3:05:32 p.m.",
    warehouse_id: 9,
    warehouse_name: "Warehouse1",
    note: "add defult from system",
  },
  {
    id: 7,
    date: "March 18th 2024, 2:42:05 p.m.",
    warehouse_id: 10,
    warehouse_name: "Warehouse5",
    note: "",
  },
];
export function TableHistory() {
  const [historyData, setData] = useState(historys);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddHistory, setShowAddHistory] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [showEditHistory, setShowEditHistory] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSave = (newData) => {
    addDataToHistory(newData); // เพิ่มข้อมูลใหม่เข้าไปในตาราง
    setShowAddHistory(false); // ปิดหน้าต่าง Add Supplier
  };
  const handleEdit = (history) => {
    setSelectedHistory(history);
    setShowEditHistory(true); // ปิดหน้าต่าง EditSupplier
  };
  const handleSaveEdit = (editedHistory) => {
    const updatedHistory = historyData.map((item) =>
      item.id === editedHistory.id ? editedHistory : item
    );
    setData(updatedHistory);
    setShowEditHistory(false);
  };
  const handleDelete = (id) => {
    const updatedHistory = historyData.filter((item) => item.id !== id);
    setData(updatedHistory);
  };
  const addDataToHistory = (newData) => {
    const latestId = Math.max(...historyData.map((item) => item.id));
    newData.id = latestId + 1;
    setData([...historyData, newData]);
  };

  const filteredData = historyData.filter((item) =>
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
    const ws = XLSX.utils.json_to_sheet(historys);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Good Recieved Note history");

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
    <div className="flex flex-col font-lexend">
      <div className="items-center text-sm ">
        <div className="flex justify-end pb-4">
          <Button
            className="mr-4 font-lexend bg-green-500 hover:bg-green-600"
            onClick={exportToExcel}
          >
            Export
          </Button>
        </div>
      </div>
      <span className="text-base font-semibold text-[#6C6A6A]">Attendance</span>
      <Card>
        <CardContent>
          <Table>
            <TableHeader className="text-lg font-semibold">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Warehouse Name</TableHead>
                <TableHead>Note</TableHead>
                <TableHead className="w-[50px]">Action</TableHead>
              </TableRow>
            </TableHeader>
           
            <TableBody className="text-base font-light text-[#6C6A6A]">
              {filteredData.map((history) => (
                <TableRow key={history.id}>
                  <TableCell >{history.date}</TableCell>
                  <TableCell>{history.warehouse_name}</TableCell>
                  <TableCell>{history.note}</TableCell>
                  <TableCell className="flex justify-center">
                    <Pencil2Icon
                      className="mx-2 cursor-pointer size-5"
                      onClick={() => handleEdit(history)}
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
                            onClick={() => handleDelete(history.id)}
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
  );
}
