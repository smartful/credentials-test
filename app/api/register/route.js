import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    console.log("name : ", name);
    console.log("email : ", email);
    console.log("password : ", password);

    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occured while registering the user." },
      { status: 500 }
    );
  }
}
