import { TBillDetails } from '@/api-lib/query';
import { formatDate } from '@/helper';

export const PatientInfo = ({ billId, createdAt, patientInfo, doctor }: TPatientInfoProps) => {
  return (
    <div className="mt-8 grid grid-cols-[auto_1fr] gap-x-1 gap-y-2">
      {/* bill Id */}
      <span>ID No</span>
      <span className="flex items-center justify-between gap-6">
        <span>
          : <span className="font-semibold">{billId}</span>
        </span>
        <span>
          Date : <span className="font-semibold">{formatDate(createdAt)}</span>
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
          <span className="line-clamp-1">
            : {doctor.name} {doctor.designation && `(${doctor.designation})`}
          </span>
        </>
      )}
    </div>
  );
};

// types
type TPatientInfoProps = Pick<TBillDetails, 'billId' | 'createdAt' | 'patientInfo' | 'doctor'>;
