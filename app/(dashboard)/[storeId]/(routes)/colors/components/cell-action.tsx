"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColorColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modals";



interface CellActionProps{
data: ColorColumn;
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
        toast.success("Color ID copied to the clipboard.")
           }

           const onDelete = async () => {
            try {
                setLoading(true);
                await axios.delete(`/api/${params.storeId}/colors/${data.id}`);
                router.refresh();
                toast.success("Color is deleted.")
            
            } catch (error) {
                toast.error("Make sure you removed all products using this color first")
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
    <DropdownMenuLabel className="font-semibold text-center mb-2">
            Actions
        </DropdownMenuLabel>
        <DropdownMenuItem className='flex  items-center ml-2 cursor-pointer' onClick={()=>router.push(`/${params.storeId}/billboards/${data.id}`)}>
             Update
             <Edit className="h-4 w-4 ml-3"/>
        </DropdownMenuItem>
        <DropdownMenuItem className='flex  items-center ml-2 cursor-pointer' onClick={()=> onCopy(data.id)}>
            Copy id 
            <Copy className="ml-3 h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem className='flex  items-center ml-2 cursor-pointer' onClick={()=>setOpen(true)}>
              Delete
              <Trash className="h-4 w-4 ml-5"/>
        </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
   </>
  )
}
