"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import Filter from "./Filter";

// ورودی‌ها همون دیتای فیلترهاست (رنگ و سایز)
interface MobileFiltersProps {
    sizes: { id: string; name: string }[];
    colors: { id: string; name: string }[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <>
            <button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden bg-black text-white px-4 py-2 rounded-full">
                فیلترها
                <Plus size={20} />
            </button>

            {open && (
                <div className="fixed inset-0 z-40 flex">
                    {/* پس‌زمینه سیاه */}
                    <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />

                    {/* پنل سمت راست */}
                    <div className="relative mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl animate-in slide-in-from-right">

                        {/* دکمه بستن */}
                        <div className="flex items-center justify-end px-4">
                            <button onClick={onClose}><X size={24} /></button>
                        </div>

                        {/* محتوای فیلترها */}
                        <div className="p-4">
                            <Filter valueKey="sizeId" name="سایزها" data={sizes} />
                            <Filter valueKey="colorId" name="رنگ‌ها" data={colors} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileFilters;
