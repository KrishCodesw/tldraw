import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken"
import { jwtVerify } from "jose";

// Example of a more robust check (could be in a separate config file or at app startup)
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined.');
}
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET||"") // Type inference will handle it if checked first
 

export async function middleware(req:NextRequest){
    const authHeader=req.headers.get("authorization")
    if(!authHeader||    !authHeader.startsWith("Bearer ")){
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    const token=authHeader.split(' ')[1];
    console.log("Hi from middleware "+token);
    
    if (!token) {
  return NextResponse.json({ error: "Unauthorized - Missing token" }, { status: 401 });
}

    try{
      console.log("Hi from try block");
      console.log("Decoded without verify:", jwt.decode(token));

      const {payload}=await jwtVerify(token,JWT_SECRET)
        // const decoded=jwt.verify(token,JWT_SECRET) 
        console.log("Token verified successfully. Payload:", payload);
        
      
        console.log("JWT_SECRET:from middleware", process.env.JWT_SECRET);

     
          return NextResponse.next();
    }
catch (err) {
  console.log("JWT_SECRET: from error", process.env.JWT_SECRET);

    return NextResponse.json({ error: "Invalid Token" ,}, { status: 401 });
  }

}

export const config = {
  matcher: ["/api/protected/:path*"], // change path as needed
};
