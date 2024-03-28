import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const UploadFile = () => {
  return (
    <div className="flex flex-col">
      <Card>
        <CardContent className="mt-4">
          <Checkbox id="header" />
          <Label
            htmlFor="header"
            className="ml-4 font-light text-base text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            File Has Headers
          </Label>
          <Input type="file" id="file" className="mt-2 cursor-pointer" />
          <Button className="mt-4 marker:text-base bg-cyan-500">Upload File</Button>
        </CardContent>
      </Card>
    </div>
  );
};
