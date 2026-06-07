import React from "react";

const DashboardCard = ({ title, value }) => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#eee7dc] hover:shadow-md transition">
            <p className="text-[#8d7765] text-sm mb-2">
                {title}
            </p>

            <h3 className="text-3xl font-bold text-[#4b3425]">
                {value}
            </h3>
        </div>
    );
};

export default DashboardCard;