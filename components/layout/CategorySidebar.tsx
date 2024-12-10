'use client';

import { Category } from '@/types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CategoryItemProps {
  category: Category;
  level?: number;
}

const CategoryItem = ({ category, level = 0 }: CategoryItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div className="w-full">
      <div
        className={`flex items-center justify-between px-4 py-2 hover:bg-accent cursor-pointer`}
        style={{ paddingLeft: `${level * 1}rem` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <Link
          href={`/category/${category.slug}`}
          className="flex-1 text-sm font-medium"
        >
          {category.name}
        </Link>
        {hasChildren && (
          <button className="p-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {isOpen && hasChildren && (
        <div className="ml-2">
          {category.children?.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface CategorySidebarProps {
  categories: Category[];
}

export function CategorySidebar({ categories }: CategorySidebarProps) {
  return (
    <aside className="w-64 border-r h-full bg-card">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Categories</h2>
      </div>
      <div className="py-2">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </aside>
  );
}