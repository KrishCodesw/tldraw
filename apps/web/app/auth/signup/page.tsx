"use client";
import DarkVeil from "../../../components/DarkVeil";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Signup with:", { email, password });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Handle success
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
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
            <a href="/login" className="text-white underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
