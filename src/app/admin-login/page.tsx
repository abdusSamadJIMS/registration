"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        const res = await fetch("/api/admin-auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push("/admin"); // Redirect after successful login
        } else {
            setError("Incorrect password!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white p-6 shadow-md rounded-md w-96">
                <h2 className="text-xl font-bold text-center mb-4">Admin Login</h2>
                <input
                    type="password"
                    className="border p-2 w-full rounded"
                    placeholder="Enter Admin Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button className="btn mt-4 w-full" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
