'use client';

import { CommonFormFiled, CommonSelect } from '@/components/shared/form';
import { useFormContext } from 'react-hook-form';
import { TAddBillForm } from './add-bill.schema';
import { Input } from '@/components/ui/input';
import { AGENT_TITLE, GENDER } from '@/types';

export const PatientInfo = () => {
  const { control, setValue, watch } = useFormContext<TAddBillForm>();
  const ageTitle = watch('patientInfo.ageTitle');

  return (
    <>
      <CommonFormFiled control={control} name="patientInfo.name" label="Full Name">
        {({ field }) => <Input placeholder="Input name" {...field} />}
      </CommonFormFiled>

      <CommonFormFiled control={control} name="patientInfo.age" label="Age">
        {({ field }) => (
          <div className="h-input group flex rounded-md border py-0 pl-3 focus-within:ring-1 focus-within:ring-ring">
            <input className="w-full bg-transparent outline-none" type="number" placeholder="Input age" {...field} />
            <CommonSelect
              options={Object.entries(AGENT_TITLE).map(([label, value]) => ({ label, value }))}
              placeholder="Select age title"
              selected={ageTitle || ''}
              onSelectChange={(value) => setValue('patientInfo.ageTitle', value as AGENT_TITLE)}
              className={{ trigger: 'h-full rounded-none border-0 border-l focus:border-ring focus:ring-0' }}
            />
          </div>
        )}
      </CommonFormFiled>

      <CommonFormFiled control={control} name="patientInfo.phone" label="Phone">
        {({ field }) => <Input placeholder="Input phone number" {...field} />}
      </CommonFormFiled>

      <CommonFormFiled control={control} name="patientInfo.gender" label="Gender">
        {({ field }) => (
          <CommonSelect
            options={Object.entries(GENDER).map(([label, value]) => ({ label, value }))}
            placeholder="Select gender"
            selected={field.value || ''}
            onSelectChange={field.onChange}
          />
        )}
      </CommonFormFiled>

      <CommonFormFiled
        control={control}
        name="patientInfo.address"
        label="Address"
        className={{ formItem: 'sm:col-span-2' }}
      >
        {({ field }) => <Input placeholder="Input address" {...field} />}
      </CommonFormFiled>
    </>
  );
};
