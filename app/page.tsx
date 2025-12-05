import Hero from "@/components/layout/Hero";
import CategorySection from "@/components/home/CategorySection";
import ProductRow from "@/components/home/ProductRow"; // کامپوننت جدید
import { getProducts } from "@/services/api";

export default async function Home() {
  // 1. دریافت همه محصولات از پایتون
  const allProducts = await getProducts();

  // 2. تفکیک محصولات برای هر بخش (Filtering)
  // نکته: این رشته‌ها ("مردانه"، "زنانه") باید دقیقاً توی دیتابیس باشن (یا بخشی از اسم دسته باشن)
  const menProducts = allProducts.filter((p) => p.category.includes("مردانه"));
  const womenProducts = allProducts.filter((p) => p.category.includes("زنانه") || p.category.includes("کیف"));
  const sportProducts = allProducts.filter((p) => p.category.includes("ورزشی"));
  
  // برای "پرفروش" یا "جدید"، فعلاً ۴ تای آخر کل محصولات رو نشون میدیم
  const newProducts = [...allProducts].reverse().slice(0, 4);

  return (
    <div className="bg-white pb-20">
      <Hero />
      
      {/* بخش دسته‌بندی دایره‌ای */}
      <CategorySection />

      {/* ردیف ۱: جدیدترین‌ها */}
      <div className="bg-gray-50"> {/* یک پس‌زمینه متفاوت برای تنوع */}
          <ProductRow 
            title="تازه رسیده‌ها" 
            products={newProducts} 
            link="/products" 
          />
      </div>

      {/* ردیف ۲: مردانه */}
      <ProductRow 
        title="مخصوص آقایان" 
        products={menProducts} 
        link="/products?category=مردانه" 
      />

      {/* ردیف ۳: زنانه */}
      <ProductRow 
        title="مخصوص خانم‌ها" 
        products={womenProducts} 
        link="/products?category=زنانه" 
      />

      {/* ردیف ۴: ورزشی */}
      <ProductRow 
        title="کالکشن اسپرت و ورزشی" 
        products={sportProducts} 
        link="/products?category=ورزشی" 
      />

    </div>
  );
}