import { NextResponse } from "next/server";
import {prisma} from "../../../lib/prisma"
import { comparePassword } from "../../../lib/hash";
import jwt from 'jsonwebtoken'

const JWT_SECRET=process.env.JWT_SECRET!;

export async function POST(req:Request){
        const {email,password}= await req.json(); 

    if(!email||!password){
        return NextResponse.json({error:"Missing fields"},{status:400})
    }
    const user=await prisma.user.findUnique({where:email})
    if(!user){
        return NextResponse.json({error:"Invalid Creds"},{status:401})
    }
    const isValid=await comparePassword(password,user.password)
    if(!isValid){
        return NextResponse.json({error:"Incorrect Password"},{status:401})
    }
    const token=jwt.sign({userId:user.id},JWT_SECRET,{expiresIn:'7d'})
    return NextResponse.json({message:"Signin Successfull" ,token})
}