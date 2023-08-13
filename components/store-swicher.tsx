"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Store } from '@prisma/client'
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { CommandSeparator } from "cmdk";



type PopoverTrigerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps  extends PopoverTrigerProps{
    items: Store[];
}

export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps){

    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);

const formatedItems = items.map((item)=>({
    label: item.name,
    value: item.id
}));

const currentStore = formatedItems.find((item)=> item.value === params.storeId);

const onSelectStore = (store: {label: string, value: string})=>{
setOpen(false);
router.push(`/${store.value}`)
}
    return(
        <Popover>
            <PopoverTrigger>
                <Button 
                variant='outline'
                size='sm'
                role='combobox'
                aria-expanded={open}
                className={cn("w=[200px] justify-between", className)}>
                    <StoreIcon className="mr-2 h-4 p-6" />
                   {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w=[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput
                        placeholder="Search store..." />
                        <CommandEmpty>No Stores Found</CommandEmpty>
                        <CommandGroup heading='stores'>
                            {formatedItems.map((store)=>(
                                <CommandItem 
                                key={store.value}
                                onSelect={()=>onSelectStore(store)}
                                className="text-sm">
                                    <StoreIcon className="mr-2 h-4 w-4" />
                                    {store.label}
                                    <Check 
                                    className={cn("first-letter:ml-auto h-4 w-4",
                                    currentStore?.value === store.value ? 'opacity-100'
                                     : 'opacity-0')}/>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                            onSelect={()=> {
                                setOpen(false);
                                storeModal.onOpen();
                            }}>
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )

}