"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProductColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modals";



interface CellActionProps{
data: ProductColumn;
}


export const CellAction:React.FC<CellActionProps>=({
    data
})=> {

    const router = useRouter();
    const params = useParams();

    const [open, setOpen] = useState(false);
    const[loading, setLoading]= useState(false);

    const onConfirm = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/products/${data.id}`);
          toast.success('Product deleted.');
          router.refresh();
        } catch (error) {
          toast.error('Something went wrong');
        } finally {
          setLoading(false);
          setOpen(false);
        }
      };

    
    const onCopy = (id: string) =>{
        navigator.clipboard.writeText(id);
        toast.success("Product ID copied to the clipboard.")
           }

           
  return (
    <>
    <AlertModal 
    isOpen={open}
    onClose={()=> setOpen(false)}
    onConfirm={onConfirm}
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
        <DropdownMenuItem onClick={()=> onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy id
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/products/${data.id}`)}>
            <Edit className="h-4 w-4 mr-2"/>
            Update
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
