"use client";
import DarkVeil from "../../../components/DarkVeil";
import { useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Signup with:", { email, password });

      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      toast.success("Signup successful!");
      setTimeout(() => router.push("/api/auth/signin"), 1000);
      // Handle success
    } catch (error: any) {
      console.error("Signup error:", error);
      const errorMessage =
        error.response?.data?.error || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Background */}
      <DarkVeil
        hueShift={44}
        scanlineIntensity={0.3}
        speed={1.5}
        warpAmount={2}
      />

      {/* Simple Form */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-black/40 backdrop-blur-sm p-6 rounded-lg w-full max-w-sm space-y-4"
        >
          <h1 className="text-white text-xl font-semibold text-center mb-6">
            Sign Up
          </h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 bg-white/10 text-white placeholder-white/60 
                       rounded border border-white/20 focus:outline-none focus:border-white/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Name"
            className="w-full px-3 py-2 bg-white/10 text-white placeholder-white/60 
                       rounded border border-white/20 focus:outline-none focus:border-white/50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 bg-white/10 text-white placeholder-white/60 
                       rounded border border-white/20 focus:outline-none focus:border-white/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-white text-black rounded font-medium 
                       hover:bg-gray-100 disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center text-white/60 text-sm">
            Have an account?{" "}
            <a
              href="http://localhost:3000/auth/signin"
              className="text-white underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
