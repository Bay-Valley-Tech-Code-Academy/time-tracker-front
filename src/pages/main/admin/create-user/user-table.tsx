import React from "react";

const UserTable: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFFD9] p-6">
            <div className="w-full max-w-3xl p-6 rounded-xl shadow-lg bg-[#FCAE49]">
                <table className="w-full border border-[#A1A1A1] rounded-lg overflow-hidden">
                <thead className="bg-[#FFECB3]">
                    <tr>
                    <th className="py-3 px-4 text-left font-semibold text-gray-900 border-b border-[#A1A1A1]">
                        Name
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-900 border-b border-[#A1A1A1]">
                        Email Address
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-900 border-b border-[#A1A1A1]">
                        Actions
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    <tr className="hover:bg-[#FFF8E1]">
                    <td className="py-3 px-4 border-b border-[#A1A1A1] text-gray-900">
                        Sandy Wong
                    </td>
                    <td className="py-3 px-4 border-b border-[#A1A1A1] text-gray-900">
                        sandywongbvt2024@gmail.com
                    </td>
                    <td className="py-3 px-4 border-b border-[#A1A1A1] flex gap-2">
                        <button className="px-3 py-1 rounded-md bg-[#FF5531] text-white font-semibold shadow-md hover:bg-[#e14a28]">
                        Actions
                        </button>
                        <button className="px-3 py-1 rounded-md bg-red-600 text-white font-semibold shadow-md hover:bg-red-700">
                        Delete
                        </button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    )
};

export default UserTable;