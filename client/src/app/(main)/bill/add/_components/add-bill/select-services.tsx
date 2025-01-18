'use client';

import { cn } from '@/lib/utils';
import { QK } from '@/api-lib';
import { useQuery } from '@tanstack/react-query';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { ReactNode, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CommonFormFiled } from '@/components/shared/form';
import { SearchInput } from '@/components/ui/input';
import { TAddBillForm } from './add-bill.schema';
import { useDebounce } from '@/hooks';
import { getServiceList } from '@/api-lib/query';
import { TObject } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const SelectServices = () => {
  const [search, setSearch] = useState('');
  const { control, watch } = useFormContext<TAddBillForm>();
  const searchTerm = useDebounce(search);
  const selectedServices = watch('services');

  const { data: serviceData } = useQuery({
    queryKey: [QK.SERVICE],
    queryFn: () => getServiceList(),
  });

  const serviceList = useMemo(() => {
    const selectedMap = selectedServices.reduce((acc: TObject<boolean>, service) => {
      acc[service._id] = true;
      return acc;
    }, {});

    const searchLowerCase = searchTerm.toLowerCase();

    return (
      serviceData?.data.filter(
        (service) => !selectedMap[service._id] && service.name.toLowerCase().includes(searchLowerCase),
      ) || []
    );
  }, [selectedServices, serviceData, searchTerm]);

  return (
    <CommonFormFiled control={control} name="services" label="Services">
      {({ field }) => {
        return (
          <Popover>
            <PopoverTrigger className="group w-full">
              {selectedServices.length > 0 ? (
                <TriggerContainer className="px-3 py-3">
                  <div className="grid max-h-52 grid-rows-1">
                    <ScrollArea className="h-full">
                      <div className="flex flex-wrap gap-2">
                        {selectedServices.map((service) => (
                          <Badge key={service._id} className="flex items-center gap-3">
                            {service.name}
                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                const remServices = selectedServices.filter(
                                  (eachService) => eachService._id !== service._id,
                                );
                                field.onChange(remServices);
                              }}
                              className="cursor-pointer rounded-md p-1 hover:bg-primary"
                            >
                              <XIcon size={16} />
                            </div>
                          </Badge>
                        ))}
                        {/* only show when it has more than 2 selected services */}
                        {selectedServices.length > 2 && (
                          <Badge
                            onClick={(e) => {
                              e.preventDefault();
                              field.onChange([]);
                            }}
                            variant="destructive"
                          >
                            Remove All
                          </Badge>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </TriggerContainer>
              ) : (
                <TriggerContainer className="justify-between">
                  Select Services <ChevronDownIcon size={18} />
                </TriggerContainer>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] rounded-none p-0">
              <SearchInput
                className={{ input: 'rounded-none border-0 border-b focus-visible:border-ring focus-visible:ring-0' }}
                value={search}
                onChange={(search) => setSearch(search)}
              />

              <section className="grid max-h-64 grid-rows-1">
                <ScrollArea className="h-full">
                  <div className="flex flex-col">
                    {serviceList.length > 0 ? (
                      <>
                        {serviceList.map((service) => (
                          <button
                            onClick={() => field.onChange([...selectedServices, service])}
                            key={service._id}
                            className="flex items-center justify-between px-4 py-1 text-start transition hover:bg-primary hover:text-white"
                          >
                            <div>
                              <h1 className="mb-1 font-bold">{service.name}</h1>
                              <p>Room : {service.roomNo}</p>
                            </div>
                            <p className="text-lg font-semibold">{service.price} ৳</p>
                          </button>
                        ))}
                      </>
                    ) : (
                      <div className="p-8 text-center font-semibold">No Service Found</div>
                    )}
                  </div>
                </ScrollArea>
              </section>
            </PopoverContent>
          </Popover>
        );
      }}
    </CommonFormFiled>
  );
};

interface ITriggerContainerProps {
  children: ReactNode;
  className?: string;
}

const TriggerContainer = ({ children, className }: ITriggerContainerProps) => {
  return (
    <div
      className={cn(
        'min-h-input flex items-center rounded-md border px-3 py-1 group-data-[state=open]:border-ring',
        className,
      )}
    >
      {children}
    </div>
  );
};
