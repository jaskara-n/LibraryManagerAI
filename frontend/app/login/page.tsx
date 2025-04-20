"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      login(data);
      router.push("/"); // Redirect to home page after successful login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-10 flex h-screen justify-center items-center ">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 bg-gray-800 p-6 rounded-xl h-1/2 w-1/2 border-2 mt-8"
      >
        <h1 className="text-white font-bold ">Login</h1>
        <input
          className="p-2 rounded bg-black text-white"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-2 rounded bg-black text-white"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-red-700 text-white p-2 rounded mt-6">
          Login
        </button>
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
}
