"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string"; // این پکیج رو نصب کن: npm i query-string

interface FilterProps {
    valueKey: string; // کلید در url (مثلا sizeId)
    name: string; // عنوانی که کاربر میبینه (مثلا "سایز")
    data: { id: string; name: string }[]; // لیست گزینه‌ها
}

const Filter: React.FC<FilterProps> = ({ valueKey, name, data }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: id,
        };

        // اگر کاربر دوباره روی همون گزینه کلیک کرد، فیلتر حذف شه (Toggle)
        if (current[valueKey] === id) {
            query[valueKey] = null;
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query,
        }, { skipNull: true });

        router.push(url);
    };

    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold text-black">{name}</h3>
            <div className="border-t border-gray-200 my-4" />
            <div className="flex flex-wrap gap-2">
                {data.map((filter) => (
                    <div key={filter.id} className="flex items-center">
                        <button
                            onClick={() => onClick(filter.id)}
                            className={`rounded-md text-sm p-2 border border-gray-300 transition
              ${selectedValue === filter.id ? "bg-black text-white" : "bg-white text-gray-800 hover:bg-gray-100"}
              `}
                        >
                            {filter.name}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filter;