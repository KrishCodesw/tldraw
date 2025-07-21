"use client";
import { useRouter } from "next/navigation";
import { useUserStore } from "../app/stores/userStore";
import { toast } from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    useUserStore.getState().setToken("");
    useUserStore.getState().setUser(User);

    toast.success("Logged out successfully!");
    router.push("/signin");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all"
    >
      Logout
    </button>
  );
}
