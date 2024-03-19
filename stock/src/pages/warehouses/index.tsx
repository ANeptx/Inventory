import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AddWarehouse } from "./addwarehouse";
import WarehouseInfo from "./warehouseinfo";
import Layout from "@/components/layout";

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
export default function index() {
    const [showAddWarehouse, setShowAddWarehouse] = useState(false);
    const [showWarehouseInfo, setShowWarehouseInfo] = useState(false);
    const [warehouses, setWarehouses] = useState<WarehouseData[]>([]);

    const handleAddWarehouseClick = () => {
        setShowAddWarehouse(true);
    };

    const handleCloseWarehouseClick = () => {
        setShowAddWarehouse(false);
    };

    const handleSaveWarehouse = (warehouseData: WarehouseData) => {
        setWarehouses([...warehouses, warehouseData]);
        setShowAddWarehouse(false); // เมื่อบันทึกเสร็จให้ปิดหน้า AddWarehouse
    };

    const handleWarehouseClick = () => {
        setShowWarehouseInfo(true);
    };

    return (
        <Layout>
            <main className="flex h-screen flex-col items-center justify-between">
                <div className="w-full items-center font-mono text-sm ">
                    <div className="flex justify-end pb-4">
                        <Button className="bg-sky-900" onClick={handleAddWarehouseClick}>
                            Add Warehouse
                        </Button>
                    </div>
                </div>
                {showAddWarehouse && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="z-99">
                            <AddWarehouse
                                onSave={handleSaveWarehouse}
                                onClose={handleCloseWarehouseClick}
                            />
                        </div>
                    </div>
                )}
                <div className="h-screen w-full p-4">
                    {/* แสดงข้อมูล Warehouse ที่ถูกเพิ่มเข้ามา */}
                    <div className=" grid grid-cols-1 gap-2">
                        {warehouses.map((warehouse, index) => (
                            <a href="/warehouses/warehouseinfo" key={index} className="h-fit">
                                <Card className="gap-4">
                                    <CardHeader>
                                        <CardTitle className="light:invert">
                                            Warehouse {index + 1}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {/* แสดงข้อมูล Warehouse ที่ได้รับมา */}
                                        <div>
                                            <p>Organization ID: {warehouse.organization_id}</p>
                                            <p>Warehouse Name: {warehouse.warehouse_name}</p>
                                            <p>Address: {warehouse.address}</p>
                                            <p>Contract Name: {warehouse.contract_name}</p>
                                            <p>Contract Email: {warehouse.contract_email}</p>
                                            <p>Contract Tel: {warehouse.contract_tel}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </a>
                        ))}
                        {/* หน้า WarehouseInfo ที่จะแสดงเมื่อคลิกที่ Warehouse แต่ละรายการ */}
                        {showWarehouseInfo && (
                            <WarehouseInfo onClick={handleWarehouseClick} />
                        )}
                    </div>
                </div>
            </main>
        </Layout>
    );
}
