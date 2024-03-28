import React from "react";
import Layout from "@/components/layout";
import { TableStock } from "./tablestock";

export default function index() {
  return (
    <Layout>
      <main className="h-screen">
        <TableStock />
      </main>
    </Layout>
  );
}
