"use client";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/admin-logout", { method: "POST" });
        router.push("/admin-login"); // Redirect to login page after logout
    };

    return (
        <button onClick={handleLogout} className="btn bg-red-500 text-white">
            Logout
        </button>
    );
};

export default LogoutButton;
