// app/products/page.tsx

import Container from "@/components/ui/Container";
import ProductCard from "@/components/products/ProductCard";
import Filter from "@/components/products/Filter";
import MobileFilters from "@/components/products/MobileFilters";
import { getProducts } from "@/services/api"; // <--- اتصال به سرویس API

// --- نکته: فعلاً فیلترهای سایز و رنگ رو دستی نگه می‌داریم ---
// چون هنوز اندپوینتی نداریم که لیست رنگ‌ها/سایزهای موجود رو از دیتابیس بگیره
const sizes = [
    { id: "1", name: "38" },
    { id: "2", name: "39" },
    { id: "3", name: "40" },
    { id: "4", name: "41" },
];
const colors = [
    { id: "1", name: "مشکی" },
    { id: "2", name: "سفید" },
    { id: "3", name: "قهوه ای" },
];

// تعریف اینترفیس برای ورودی‌های URL
interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    sizeId?: string;
    colorId?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // 1. دریافت پارامترهای URL (به صورت Async)
  const params = await searchParams;

  // 2. درخواست به بکند پایتون با فیلترها
  // فعلاً فقط category و search رو در بکند پیاده‌سازی کردیم
  const products = await getProducts({
    category: params.category,
    search: params.search,
  });

  return (
    <div className="bg-white">
      <Container className="py-10">
        <h1 className="text-3xl font-bold mb-8">
            {params.category ? `محصولات دسته: ${params.category}` : "تمامی محصولات"}
        </h1>

        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          
          {/* فیلتر موبایل */}
          <MobileFilters sizes={sizes} colors={colors} />

          {/* فیلتر دسکتاپ (سایدبار) */}
          <div className="hidden lg:block lg:col-span-1">
            <Filter valueKey="sizeId" name="سایزها" data={sizes} />
            <Filter valueKey="colorId" name="رنگ‌ها" data={colors} />
          </div>

          {/* لیست محصولات (که از API اومده) */}
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            
            {products.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl">
                 <p className="text-gray-500 text-lg">محصولی با این مشخصات یافت نشد.</p>
                 <p className="text-sm text-gray-400 mt-2">فیلترها را تغییر دهید یا دسته دیگری انتخاب کنید.</p>
               </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                    <ProductCard key={item.id} data={item} />
                ))}
                </div>
            )}

          </div>
          
        </div>
      </Container>
    </div>
  );
}