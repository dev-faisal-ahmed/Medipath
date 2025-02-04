'use client';

import { type TReferrerList, getReferrerList } from '@/api-lib/query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { QK } from '@/api-lib';
import { REFERRER_TYPE } from '@/types';
import { CommonFormFiled } from '@/components/shared/form';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@/components/ui/loader';
import { Message } from '@/components/shared';

export const SelectReferrers = () => {
  const { control } = useFormContext<TReferrerSubForm>();

  const { data: referrers, isLoading } = useQuery({
    queryKey: [QK.REFERRER, 'LIST'],
    queryFn: getReferrerList,
    select: (response) => {
      const agents: TReferrerList[] = [];
      const doctors: TReferrerList[] = [];
      response.data.forEach((referrer) => {
        if (referrer.type === REFERRER_TYPE.AGENT) agents.push(referrer);
        if (referrer.type === REFERRER_TYPE.DOCTOR) doctors.push(referrer);
      });

      return { agents, doctors };
    },
  });

  return (
    <>
      <CommonFormFiled control={control} name="visitorId" label="Visited By">
        {({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>
            <SelectContent>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {referrers?.doctors?.length ? (
                    <>
                      {referrers?.doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name}
                          {doctor.designation && (
                            <span className="ml-2 text-xs text-muted-foreground">({doctor.designation})</span>
                          )}
                        </SelectItem>
                      ))}
                    </>
                  ) : (
                    <Message message="No doctor found" className="mt-0 p-2 font-medium" />
                  )}
                </>
              )}
            </SelectContent>
          </Select>
        )}
      </CommonFormFiled>

      <CommonFormFiled control={control} name="referrerId" label="Agent">
        {({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Agent" />
            </SelectTrigger>
            <SelectContent>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {referrers?.agents.length ? (
                    <>
                      {referrers?.agents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.name}
                          {agent.designation && (
                            <span className="ml-2 text-xs text-muted-foreground">({agent.designation})</span>
                          )}
                        </SelectItem>
                      ))}
                    </>
                  ) : (
                    <Message message="No agent found" className="mt-0 p-2 font-medium" />
                  )}
                </>
              )}
            </SelectContent>
          </Select>
        )}
      </CommonFormFiled>
    </>
  );
};

type TReferrerSubForm = { visitorId: string; referrerId: string };
