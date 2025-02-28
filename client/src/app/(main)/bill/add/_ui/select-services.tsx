'use client';

import type { TServiceList } from '@/api-lib/query';

import { cn } from '@/lib/utils';
import { QK } from '@/api-lib';
import { TObject } from '@/types';
import { useDebounce } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { MouseEvent, ReactNode, useMemo, useState } from 'react';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CommonFormFiled } from '@/components/shared/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SearchInput } from '@/components/ui/input';
import { TAddBillForm } from './add-bill-form.schema';
import { getServiceList } from '@/api-lib/query';
import { Loading } from '@/components/ui/loader';
import { Badge } from '@/components/ui/badge';

export const SelectServices = () => {
  const [search, setSearch] = useState('');
  const { control, watch } = useFormContext<TAddBillForm>();
  const searchTerm = useDebounce(search);
  const selectedServices = watch('services');

  const { data: serviceData, isLoading } = useQuery({
    queryKey: [QK.SERVICE, 'LIST'],
    queryFn: () => getServiceList(),
  });

  const serviceList = useMemo(() => {
    const selectedMap = selectedServices.reduce((acc: TObject<boolean>, service) => {
      acc[service.id] = true;
      return acc;
    }, {});

    const searchLowerCase = searchTerm.toLowerCase();
    const filteredServices = serviceData?.data.filter((service) => {
      if (!selectedMap[service.id] && service.name.toLowerCase().includes(searchLowerCase)) return true;
      return false;
    });

    return filteredServices || [];
  }, [selectedServices, serviceData, searchTerm]);

  return (
    <CommonFormFiled control={control} name="services" label="Services" className={{ formItem: 'sm:col-span-2' }}>
      {({ field }) => {
        return (
          <Popover>
            <PopoverTrigger className="group w-full">
              <SelectedServiceList services={selectedServices} field={field} />
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] rounded-none p-0">
              <SearchInput
                className={{ input: 'rounded-none border-0 border-b focus-visible:border-ring focus-visible:ring-0' }}
                value={search}
                onChange={(search) => setSearch(search)}
              />
              <ServiceList
                services={serviceList}
                isLoading={isLoading}
                selectedServices={selectedServices}
                field={field}
              />
            </PopoverContent>
          </Popover>
        );
      }}
    </CommonFormFiled>
  );
};

interface ISelectedServiceListProps {
  services: TServiceList[];
  field: ControllerRenderProps<TAddBillForm>;
}

const SelectedServiceList = ({ field, services }: ISelectedServiceListProps) => {
  if (services.length === 0)
    return (
      <TriggerContainer className="justify-between">
        Select Services <ChevronDownIcon size={18} />
      </TriggerContainer>
    );

  const onRemoveService = (e: MouseEvent<HTMLDivElement>, serviceId: string) => {
    e.preventDefault();
    const remServices = services.filter((service) => service.id !== serviceId);
    field.onChange(remServices);
  };

  const onRemoveAll = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    field.onChange([]);
  };

  return (
    <TriggerContainer className="px-3 py-3">
      <div className="grid max-h-52 grid-rows-1">
        <ScrollArea className="h-full">
          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <Badge key={service.id} className="flex items-center gap-3">
                {service.name}
                <div
                  onClick={(e) => onRemoveService(e, service.id)}
                  className="cursor-pointer rounded-md p-1 hover:bg-primary"
                >
                  <XIcon size={16} />
                </div>
              </Badge>
            ))}

            {/* only show when it has more than 2 selected services */}
            {services.length > 2 && (
              <Badge onClick={onRemoveAll} variant="destructive" className="flex h-[30px] items-center">
                Remove All
              </Badge>
            )}
          </div>
        </ScrollArea>
      </div>
    </TriggerContainer>
  );
};

interface IServiceListProps {
  isLoading: boolean;
  services: TServiceList[];
  selectedServices: TServiceList[];
  field: ControllerRenderProps<TAddBillForm>;
}

const ServiceList = ({ isLoading, services, selectedServices, field }: IServiceListProps) => {
  if (isLoading) return <Loading />;
  if (services.length === 0) return <div className="p-8 text-center font-semibold">No Service Found</div>;

  return (
    <section className="grid max-h-72 grid-rows-1">
      <ScrollArea className="h-full">
        <div className="mt-2 flex flex-col">
          {services.map((service) => (
            <button
              onClick={() => field.onChange([...selectedServices, service])}
              key={service.id}
              className="group grid grid-cols-2 gap-6 px-4 py-1 text-start transition hover:bg-primary hover:text-white"
            >
              <h1 className="text-base font-semibold">{service.name}</h1>
              <div className="flex w-full items-center justify-between gap-12">
                <p className="text-base font-medium text-muted-foreground transition-colors group-hover:text-white">
                  Room : {service.roomNo}
                </p>
                <p className="text-base font-semibold">{service.price} ৳</p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </section>
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
        'flex min-h-input items-center rounded-md border px-3 py-1 group-data-[state=open]:border-ring',
        className,
      )}
    >
      {children}
    </div>
  );
};
