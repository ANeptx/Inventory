import React from 'react'
import Layout from '@/components/layout'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TableHistory } from './tablehistory'
import { UploadFile } from './uploadfile'
import { GoodReceivedList } from './goodreceivedlist'
export default function index(){
  return (
    <Layout>
    <div className='font-lexend'>
    <Tabs defaultValue="list" className=' font-semibold text-lg' >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="list">Good Received Note List</TabsTrigger>
        <TabsTrigger value="history">Good Recieved Note History</TabsTrigger>
      </TabsList>
      <TabsContent value="list">
        <UploadFile/>
        <GoodReceivedList/>
      </TabsContent>
      <TabsContent value="history">
        <TableHistory/>
      </TabsContent>
    </Tabs>
    </div>
    </Layout>
  )
}
