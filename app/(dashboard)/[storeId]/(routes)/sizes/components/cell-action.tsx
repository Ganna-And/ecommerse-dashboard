"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SizeColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modals";



interface CellActionProps{
data: SizeColumn;
}


export const CellAction:React.FC<CellActionProps>=({
    data
})=> {

    const router = useRouter();
    const params = useParams();

    const [open, setOpen] = useState(false);
    const[loading, setLoading]= useState(false)

    
    const onCopy = (id: string) =>{
        navigator.clipboard.writeText(id);
        toast.success("Size ID copied to the clipboard.")
           }

           const onDelete = async () => {
            try {
                setLoading(true);
                await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
                router.refresh();
                toast.success("Size is deleted.")
            
            } catch (error) {
                toast.error("Make sure you removed all products using this size first")
            }finally{
            setLoading(false);
            setOpen(false);
            }
              }
  return (
    <>
    <AlertModal 
    isOpen={open}
    onClose={()=> setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
    />
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
        <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/sizes/${data.id}`)}>
            <Edit className="h-4 w-4 mr-2"/>
            Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=> onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy id
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setOpen(true)}>
            <Trash className="h-4 w-4 mr-2"/>
            Delete
        </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
   </>
  )
}