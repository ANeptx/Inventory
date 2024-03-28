import React from "react";
import Layout from "@/components/layout";
import { TableSupplier } from "./tablesupplier";

export default function Index() {
 
  return (
    <Layout>
      <main className="h-screen">
            <TableSupplier/>
      </main>
    </Layout>
  );
}
