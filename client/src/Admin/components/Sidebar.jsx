import React from "react";
import { LogOut, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";

const Sidebar = ({ isMobile = false, isOpen = false, onClose = () => { } }) => {
    const navigate = useNavigate();
    const { logout } = useContext(AdminAuthContext);

    const links = [
        { to: "/admin/dashboard", label: "Dashboard" },
        { to: "/admin/rooms", label: "Rooms" },
        { to: "/admin/bookings", label: "Bookings" },
    ];

    const handleLogout = async () => {
        await logout();
        onClose();
        navigate("/", { replace: true });
    };

    const sidebarClass = isMobile
        ? `fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#eee7dc] shadow-xl p-6 flex flex-col transform transition-transform duration-300 lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`
        : "w-72 bg-white border-r border-[#eee7dc] shadow-sm p-6 hidden lg:flex lg:flex-col sticky top-0 h-screen overflow-y-auto";

    return (
        <aside className={sidebarClass}>
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-2xl font-bold text-[#4b3425]">
                    Hotel Admin
                </h1>

                {isMobile && (
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={onClose}
                        className="w-10 h-10 rounded-xl bg-[#f7efe5] text-[#6d4c35] flex items-center justify-center hover:bg-[#eadbc8] transition"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            <nav className="space-y-3 flex-1">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={onClose}
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-2xl font-medium transition ${isActive
                                ? "bg-[#f7efe5] text-[#6d4c35]"
                                : "text-[#6d4c35] hover:bg-[#f7efe5]"
                            }`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <button
                type="button"
                onClick={handleLogout}
                className="mt-6 w-full px-4 py-3 rounded-2xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition flex items-center justify-center gap-2"
            >
                <LogOut size={18} />
                Logout
            </button>
        </aside>
    );
};

export default Sidebar;
