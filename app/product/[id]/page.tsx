import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import { getProduct } from "@/services/api";
import { ChevronRight, Home } from "lucide-react"; // آیکون‌ها برای بردکرامب

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const { id } = params;
  const product = await getProduct(id);

  if (!product) notFound();

  // تکرار عکس برای دمو
  const images = [product.image_url, product.image_url, product.image_url, product.image_url];

  return (
    <div className="bg-white min-h-screen pb-20 lg:pb-0"> {/* پدینگ پایین برای موبایل بار */}
      <Container className="px-4 sm:px-6 lg:px-8 py-10">
        
        {/* نان‌ریزه (Breadcrumb) مدرن */}
        <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
          <a href="/" className="hover:text-black transition-colors flex items-center gap-1">
             <Home size={16} /> خانه
          </a>
          <ChevronRight size={14} className="mx-2 text-gray-400" />
          <span className="hover:text-black cursor-pointer">محصولات</span>
          <ChevronRight size={14} className="mx-2 text-gray-400" />
          <span className="text-black font-semibold truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 xl:gap-x-16">
          {/* گالری تصاویر */}
          <ProductGallery images={images} />

          {/* اطلاعات محصول */}
          <ProductInfo product={product} />
        </div>
      </Container>
    </div>
  );
}