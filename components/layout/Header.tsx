"use client"; // چون تعامل (باز و بسته شدن منو) داریم، باید کلاینت کامپوننت باشه

import Link from "next/link";
import { useState,useEffect } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import useCart from "@/hooks/use-cart";

const routes = [
    { href: "/", label: "صفحه اصلی" },
    { href: "/products", label: "فروشگاه" },
    { href: "/category/bags", label: "کیف زنانه" },
    { href: "/category/shoes", label: "کفش اسپرت" },
];

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const cart = useCart();

    // جلوگیری از ارور Hydration
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // یا یک لودینگ ساده، یا برگرداندن هدر بدون عدد سبد
        // بهتره اینجا ریترن نال نکنی که هدر نپره، فقط عدد رو نشون ندی، ولی برای سادگی فعلاً اینجوریه
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* بخش ۱: لوگو */}
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-black uppercase tracking-tighter text-primary">
                        STYLE<span className="text-accent">HUB</span>
                    </Link>
                </div>

                {/* بخش ۲: منوی دسکتاپ (در موبایل مخفی) */}
                <nav className="hidden md:flex items-center gap-8">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                        >
                            {route.label}
                        </Link>
                    ))}
                </nav>

                {/* بخش ۳: آیکون‌ها */}
                <div className="flex items-center gap-4">
                    <button className="hidden md:block p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full transition">
                        <Search size={20} />
                    </button>

                    <Link href="/cart" className="relative p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full transition">
                        <ShoppingBag size={20} />
                        <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                    {cart.items.length} {/* <--- عدد واقعی */}
                </span>
                    </Link>

                    {/* دکمه همبرگری موبایل */}
                    <button
                        className="md:hidden p-2 text-gray-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* بخش ۴: منوی کشویی موبایل */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 shadow-lg animate-in slide-in-from-top-5">
                    <div className="flex flex-col space-y-4">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                onClick={() => setIsMobileMenuOpen(false)} // وقتی کلیک کرد منو بسته شه
                                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                            >
                                {route.label}
                            </Link>
                        ))}
                        <hr />
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600 pt-2">
                            <User size={18} />
                            <span>ورود به حساب کاربری</span>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;