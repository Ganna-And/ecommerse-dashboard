import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server";




export async function POST(req:Request, { params }:{
    params:{ storeId: string }
}) {
    
    try {

        const {userId} = auth();
        const body = await req.json();

        const {name, billboardId} = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status: 403});
        }

        if(!name){
            return new NextResponse("Name is required", { status: 400})
        }
        if(!billboardId){
            return new NextResponse("Billboard Id is required", { status: 400})
        }

        if(!params.storeId){
            return new NextResponse("Store id is require", {status: 400})
        }
        
        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id: params.storeId,
                userId
            },
        });

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status: 405});
        }

        const category = await prismadb.category.create({
            data:{
                name,
                billboardId,
                storeId: params.storeId
            }

        });

        return NextResponse.json(category);

    } catch (error) {
        
        console.log('[CATEGORY_POST]', error);
        return new NextResponse("internal error", {status:500});
    }
}

export async function GET(req:Response, { params }:{
    params: { categoryId: string }
}) {
    try {
if(!params.categoryId){
    return new NextResponse("Category id is required", { status: 400})
}

const category = await prismadb.category.findUnique({
    where:{
        id: params.categoryId
    }
});

return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORIES_GET]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};

