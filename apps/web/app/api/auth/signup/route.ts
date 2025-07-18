import { NextResponse,NextRequest } from "next/server";
import {prisma} from "../../../lib/prisma"
import { hashedPassword } from "../../../lib/hash";
import { error } from "console";


export async function POST(req:Request){
    const {email,password,name}=await req.json();

    if(!name||!email||!password){
        return NextResponse.json({error:"All fields are required"},{status:400})
    }

    const existingUser=await prisma.user.findUnique({where:{email}});

    if(existingUser){
        return NextResponse.json({error:"User already exists"},{status:400})

    }

    const hashed=await hashedPassword(password);

    const user=await prisma.user.create({
        data:{name,email,password:hashed}
    })

    return NextResponse.json({message:"User created cool",userId:user.id},{status:200})









}