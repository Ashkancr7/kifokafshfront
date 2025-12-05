import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import ToastProvider from "@/providers/ToastProvider"; // ایمپورت کن

// تعریف فونت لوکال
const myFont = localFont({
    src: "./fonts/Vazir.woff2", // مسیر دقیق فونتت رو بده
    variable: "--font-persian", // این متغیر رو تو تیل‌ویند می‌تونیم استفاده کنیم
});

export const metadata: Metadata = {
    title: "فروشگاه کیف و کفش",
    description: "بهترین کیف و کفش‌های ایران",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" dir="rtl">
        {/* dir="rtl" خیلی مهمه برای سایت فارسی */}
        <body className={myFont.className}>
        <ToastProvider /> {/* اضافه شد */}
        <Header /> {/* اینجا اضافه شد */}
        {children}
        </body>
        </html>
    );
}