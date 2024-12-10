import { getProductById, getCategoryById, mockProducts } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  const category = getCategoryById(product.categoryId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            {category && (
              <p className="text-sm text-muted-foreground mb-2">
                {category.name}
              </p>
            )}
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Specifications</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between sm:block">
                  <dt className="text-sm font-medium text-muted-foreground capitalize">{key}</dt>
                  <dd className="text-sm text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex items-center gap-4">
            <Button size="lg" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <p className="text-sm">
              {product.stock > 0 ? (
                <span className="text-green-600">{product.stock} in stock</span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}