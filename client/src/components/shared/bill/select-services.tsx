'use client';

import { QK } from '@/api-lib';
import { getServices } from '@/api-lib/query';
import { TServiceSubSchema } from '@/app/(main)/bill/add/_components/add-bill';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { generateNextPageParams } from '@/helper';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

interface IProps {
  value: TServiceSubSchema[];
  onValueChange(value: TServiceSubSchema): void;
}

const LIMIT = 20;

export const SelectServices = ({ value, onValueChange }: IProps) => {
  const [search, setSearch] = useState('');

  const { data: serviceData } = useInfiniteQuery({
    queryKey: [QK.SERVICE, { searchTeam: search, limit: LIMIT }],
    queryFn: ({ pageParam }) => getServices({ searchTeam: search, limit: LIMIT.toString(), page: String(pageParam) }),
    placeholderData: keepPreviousData,
    getNextPageParam: generateNextPageParams(),
    initialPageParam: 1,
  });

  return (
    <>
      <Popover>
        <PopoverTrigger></PopoverTrigger>
        <PopoverContent>
          <div className="rounded-md border p-2 focus-within:border-ring">
            <div className="flex items-center gap-2">
              <SearchIcon size={18} />
              <input
                className="w-full bg-transparent outline-none"
                placeholder="Search service here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
