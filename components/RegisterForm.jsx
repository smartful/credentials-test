"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are mandatory");
      return;
    }

    try {
      const responseUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await responseUserExists.json();

      if (user) {
        setError("User Already exists");
        return;
      }

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        setName("");
        setEmail("");
        setPassword("");
        router.push("/");
      } else {
        console.warn("User Registration failed");
      }
    } catch (error) {
      console.error("Error during registration : ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-600">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link href={"/"} className="text-sm mt-3 text-right">
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
