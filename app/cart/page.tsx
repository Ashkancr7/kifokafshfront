"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import useCart from "@/hooks/use-cart";
import Summary from "@/components/cart/Summary";
import CartItem from "@/components/cart/CartItem";

export default function CartPage() {
    const [isMounted, setIsMounted] = useState(false);
    const cart = useCart();

    // جلوگیری از ارور Hydration
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="bg-white">
            <Container className="py-16">
                <h1 className="text-3xl font-bold text-black mb-8">سبد خرید</h1>

                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">

                    {/* لیست آیتم‌ها - 7 ستون از 12 تا */}
                    <div className="lg:col-span-7">
                        {cart.items.length === 0 && (
                            <p className="text-neutral-500 flex items-center justify-center h-40 bg-gray-50 rounded-lg">
                                سبد خرید شما خالی است :(
                            </p>
                        )}
                        <ul>
                            {cart.items.map((item) => (
                                <CartItem key={item.id} data={item} />
                            ))}
                        </ul>
                    </div>

                    {/* خلاصه حساب - 5 ستون از 12 تا */}
                    <Summary />

                </div>
            </Container>
        </div>
    );
}
