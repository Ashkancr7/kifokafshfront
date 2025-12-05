"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";

interface CartItemProps {
    data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
    const cart = useCart();

    const onRemove = () => {
        cart.removeItem(data.id);
    };

    return (
        <div className="flex py-6 border-b border-gray-100">
            {/* تصویر محصول */}
            <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-32 sm:w-32 border border-gray-200">
                <Image
                    fill
                    src={data.image_url}
                    alt={data.title}
                    className="object-cover object-center"
                />
            </div>

            {/* اطلاعات */}
            <div className="relative mr-4 flex flex-1 flex-col justify-between sm:mr-6">
                <div className="absolute top-0 left-0 z-10">
                    <button onClick={onRemove} className="bg-white rounded-full p-1 shadow-sm hover:bg-red-50 hover:text-red-500 transition border border-gray-200">
                        <X size={15} />
                    </button>
                </div>

                <div className="relative pr-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div className="flex justify-between">
                        <p className="text-lg font-semibold text-black">{data.title}</p>
                    </div>

                    <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{data.category}</p>
                        {/* اینجا اگر سایز و رنگ رو ذخیره کرده بودیم نمایش می‌دادیم */}
                        <p className="text-gray-500 mr-4 border-r border-gray-200 pr-4">تک سایز</p>
                    </div>

                    <div className="mt-4 font-medium text-gray-900">
                        {formatPrice(data.price)} تومان
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;