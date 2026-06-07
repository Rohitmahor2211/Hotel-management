import React from "react";
import { Menu } from "lucide-react";

const Topbar = ({ onMenuClick }) => {
    return (
        <header className="bg-white border-b border-[#eee7dc] px-4 sm:px-6 py-4 flex items-center justify-between">

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    aria-label="Open admin menu"
                    onClick={onMenuClick}
                    className="w-11 h-11 rounded-xl bg-[#f7efe5] text-[#6d4c35] flex items-center justify-center hover:bg-[#eadbc8] transition lg:hidden"
                >
                    <Menu size={22} />
                </button>

                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#4b3425]">
                        Dashboard
                    </h2>

                    <p className="text-sm text-[#8d7765] mt-1 hidden sm:block">
                        Welcome back Admin
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-full bg-[#dbeafe] flex items-center justify-center text-[#2563eb] font-bold shadow">
                    A
                </div>
            </div>
        </header>
    );
};

export default Topbar;
