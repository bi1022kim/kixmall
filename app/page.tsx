import { CategorySidebar } from '@/components/layout/CategorySidebar';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { mockCategories, mockProducts } from '@/lib/data';

export default function Home() {
  return (
    <MainLayout sidebar={<CategorySidebar categories={mockCategories} />}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
        <ProductGrid products={mockProducts} />
      </div>
    </MainLayout>
  );
}