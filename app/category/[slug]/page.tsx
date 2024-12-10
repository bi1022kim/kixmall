import { CategorySidebar } from '@/components/layout/CategorySidebar';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getCategoryBySlug, getProductsByCategory, mockCategories } from '@/lib/data';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const generateParams = (categories: typeof mockCategories): { slug: string }[] => {
    return categories.flatMap(category => [
      { slug: category.slug },
      ...(category.children?.map(child => ({ slug: child.slug })) || []),
    ]);
  };

  return generateParams(mockCategories);
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);
  
  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.id);

  return (
    <MainLayout sidebar={<CategorySidebar categories={mockCategories} />}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-muted-foreground">
            Browse our selection of {category.name.toLowerCase()}
          </p>
        </div>
        <ProductGrid products={products} />
      </div>
    </MainLayout>
  );
}