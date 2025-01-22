import { IPatient } from '@/types';
import { format } from 'date-fns';

interface IProps {
  billId: string;
  date: Date | string;
  patientInfo: IPatient;
  doctor: { _id: string; name: string };
}

export const PatientInfo = ({ billId, date, patientInfo, doctor }: IProps) => {
  return (
    <div className="mt-8 grid grid-cols-[auto_1fr] gap-x-1 gap-y-2">
      {/* bill Id */}
      <span>ID No</span>
      <span className="flex items-center justify-between gap-6">
        <span>
          : <span className="font-semibold">{billId}</span>
        </span>
        <span>
          Date : <span className="font-semibold">{format(date, 'dd MMM, yyyy')}</span>
        </span>
      </span>
      {/* patient Info */}
      <span>Name</span>
      <span className="flex items-center justify-between gap-6">
        <span>
          : <span className="font-semibold">{patientInfo.name}</span>
        </span>
        {patientInfo.phone && (
          <span>
            Phone : <span className="font-semibold">{patientInfo.phone}</span>{' '}
          </span>
        )}
      </span>
      {patientInfo.address && (
        <>
          <span>Address</span>
          <span> : {patientInfo.address}</span>
        </>
      )}

      <span>Age</span>
      <span className="flex items-center justify-between gap-6">
        <span>
          : {patientInfo.age} {patientInfo.ageTitle}
          {(patientInfo.age || 0) > 1 && 's'}
        </span>
        <span>Gender: {patientInfo.gender} </span>
      </span>
      {/* visited by */}
      {doctor && (
        <>
          <span>Visited By</span>
          <span className="line-clamp-1">: {doctor.name} </span>
        </>
      )}
    </div>
  );
};
