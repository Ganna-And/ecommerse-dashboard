"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { toast } from "react-hot-toast";

interface CellActionProps{
data: BillboardColumn;
}


export const CellAction:React.FC<CellActionProps>=({
    data
})=> {

    const onCopy = (id: string) =>{
        navigator.clipboard.writeText(id);
        toast.success("Bilboard ID copied to the clipboard.")
           }

  return (
   <DropdownMenu>
    <DropdownMenuTrigger asChild>
 <Button
 variant='ghost'
 className="h-8 w-8 p-0">
    <span className="sr-only">open menu</span>
    <MoreHorizontal className="h-4 w-4"/>
 </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
        <DropdownMenuLabel>
            Actions
        </DropdownMenuLabel>
        <DropdownMenuItem>
            <Edit className="h-4 w-4 mr-2"/>
            Update
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Copy className="h-4 w-4 mr-2" onClick={()=> onCopy(data.id)}/>
            Copy id
        </DropdownMenuItem>
        <DropdownMenuItem>
            <Trash className="h-4 w-4 mr-2"/>
            Delete
        </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
  )
}
