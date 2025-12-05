"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

const categories = [
    // نکته مهم: مقداری که جلوی category= مینویسی باید دقیقاً با چیزی که تو دیتابیس ذخیره کردی یکی باشه
    { 
        id: 1, 
        name: "کفش مردانه", 
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=500", 
        href: "/products?category=مردانه" // اگر تو دیتابیس "مردانه" ذخیره کردی
    },
    { 
        id: 2, 
        name: "کیف زنانه", 
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=500", 
        href: "/products?category=کیف" 
    },
    { 
        id: 3, 
        name: "کفش ورزشی", 
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500", 
        href: "/products?category=کفش ورزشی" 
    },
    { 
        id: 4, 
        name: "کوله پشتی", 
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500", 
        href: "/products?category=کوله" 
    },
    { 
        id: 5, 
        name: "اکسسوری", 
        image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=500", 
        href: "/products?category=اکسسوری" 
    },
    { 
        id: 6, 
        name: "بوت و نیم‌بوت", 
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=500", 
        href: "/products?category=بوت" 
    },
];

const CategorySection = () => {
    return (
        <section className="py-12 bg-gray-50">
            <Container>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">خرید بر اساس دسته‌بندی</h2>
                </div>

                {/* Grid Layout for Categories */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={cat.href}
                            className="group flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                        >
                            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-accent transition-colors">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-accent">
                {cat.name}
              </span>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default CategorySection;