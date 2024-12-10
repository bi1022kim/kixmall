import { Category, Product } from '@/types';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    parentId: null,
    children: [
      {
        id: '2',
        name: 'Laptops',
        slug: 'laptops',
        parentId: '1',
      },
      {
        id: '3',
        name: 'Smartphones',
        slug: 'smartphones',
        parentId: '1',
      },
    ],
  },
  {
    id: '4',
    name: 'Office Supplies',
    slug: 'office-supplies',
    parentId: null,
    children: [
      {
        id: '5',
        name: 'Paper Products',
        slug: 'paper-products',
        parentId: '4',
      },
    ],
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Business Laptop Pro',
    description: 'High-performance laptop for business professionals. Features the latest Intel i7 processor, 16GB RAM, and a spacious 512GB SSD for all your business needs. The 14-inch display provides crystal clear visuals while maintaining portability.',
    price: 1299.99,
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853'],
    categoryId: '2',
    stock: 50,
    specifications: {
      processor: 'Intel i7',
      ram: '16GB',
      storage: '512GB SSD',
      display: '14-inch 4K',
      battery: '12 hours',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Enterprise Smartphone X1',
    description: 'Secure and powerful smartphone designed for business use. Features advanced security protocols, long battery life, and seamless integration with enterprise systems.',
    price: 899.99,
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9'],
    categoryId: '3',
    stock: 75,
    specifications: {
      processor: 'Snapdragon 8 Gen 2',
      ram: '12GB',
      storage: '256GB',
      screen: '6.7-inch AMOLED',
      battery: '5000mAh',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Premium Copy Paper',
    description: 'High-quality, bright white copy paper perfect for important business documents and presentations. 5000 sheets per case.',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1589330694653-ded6df03f754'],
    categoryId: '5',
    stock: 200,
    specifications: {
      weight: '20 lb',
      brightness: '98',
      size: '8.5" x 11"',
      sheets: '5000',
      type: 'Multi-purpose',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(product => product.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  const findInCategories = (categories: Category[]): Category | undefined => {
    for (const category of categories) {
      if (category.id === id) return category;
      if (category.children) {
        const found = findInCategories(category.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  
  return findInCategories(mockCategories);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const findInCategories = (categories: Category[]): Category | undefined => {
    for (const category of categories) {
      if (category.slug === slug) return category;
      if (category.children) {
        const found = findInCategories(category.children);
        if (found) return found;
      }
    }
    return undefined;
  };
  
  return findInCategories(mockCategories);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return mockProducts.filter(product => {
    const category = getCategoryById(categoryId);
    if (!category) return false;
    
    // Include products from child categories
    const isInChildCategory = category.children?.some(
      child => child.id === product.categoryId
    );
    
    return product.categoryId === categoryId || isInChildCategory;
  });
}