"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const Hero = () => {
    return (
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                    alt="Fashion Banner"
                    fill
                    className="object-cover object-center brightness-[0.6]" // تصویر رو کمی تیره کردیم تا متن دیده شه
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto space-y-6">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                    استایل خودت رو <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">
            پیدا کن
          </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
                    جدیدترین کلکسیون کیف و کفش با طراحی مدرن و کیفیت بی‌نظیر.
                    همین حالا خاص بودن را تجربه کنید.
                </p>

                <div className="flex items-center justify-center gap-4 pt-4">
                    <Link
                        href="/products"
                        className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition flex items-center gap-2"
                    >
                        خرید کنید
                        <ArrowLeft size={20} />
                    </Link>
                    <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium rounded-full hover:bg-white/20 transition">
                        مشاهده کالکشن
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;