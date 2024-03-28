import React from "react";
import Layout from "@/components/layout";
import { TableCategory } from "./tablecategory";

export default function index() {
  return (
    <Layout>
      <main className="h-screen">
        <TableCategory />
      </main>
    </Layout>
  );
}
