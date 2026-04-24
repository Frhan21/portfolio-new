'use client';

import { DataTable } from '@/components/ui/data-table';
import { Category } from '@/model/category';
import { useEffect, useState } from 'react';
import { columns } from './columns';

const CategoryTable = () => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch('/api/v1/category');
        const data = await res.json();
        console.log(data);
        setCategory(data.categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategory();
  }, []);
  return (
    <div>
      <DataTable columns={columns} data={category} />
    </div>
  );
};

export default CategoryTable;
