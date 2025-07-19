import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken"
import { error } from "console";

// Example of a more robust check (could be in a separate config file or at app startup)
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined.');
}
const JWT_SECRET = process.env.JWT_SECRET; // Type inference will handle it if checked first
 

export function middleware(req:NextRequest){
    const authHeader=req.headers.get("Authorization")
    if(!authHeader||    !authHeader.startsWith("Bearer ")){
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }
    const token=authHeader.split(' ')[1];
    if (!token) {
  return NextResponse.json({ error: "Unauthorized - Missing token" }, { status: 401 });
}

    try{
        const decoded=jwt.verify(token,JWT_SECRET) as JwtPayload
        console.log(decoded.userId);
        
     
          return NextResponse.next();
    }
catch (err) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }

}

export const config = {
  matcher: ["/api/protected/:path*"], // change path as needed
};
