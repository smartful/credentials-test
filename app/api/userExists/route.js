import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(request) {
  try {
    await connectMongoDB();
    const { email } = await request.json();
    const user = await User.findOne({ email }).select("_id");
    console.log("user : ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error on userExists API endpoint : ", error);
  }
}
