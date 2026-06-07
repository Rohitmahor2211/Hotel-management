import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex bg-[#f9f7f2]">
            <Sidebar />

            {isSidebarOpen && (
                <button
                    type="button"
                    aria-label="Close menu"
                    className="fixed inset-0 z-40 bg-black/35 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar
                isMobile
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0">
                <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 w-full max-w-full min-w-0 p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
