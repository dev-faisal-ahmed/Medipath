import { IService } from '@/types/service.type';

type TProps = {
  services: Omit<IService, '_id'>[];
};

export const ServicesInfo = ({ services }: TProps) => {
  return (
    <>
      <h3 className="mb-3 mt-8 text-lg font-bold">Services</h3>
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-1 text-left">SL.</th>
            <th className="p-1 text-left">Test Name</th>
            <th className="text-nowrap p-1">Room No</th>
            <th className="p-1 text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {services.map(({ name, price, roomNo }, index) => (
            <tr key={name}>
              <td className="p-1">{index + 1}</td>
              <td className="p-1">{name}</td>
              <td className="p-1 text-center">{roomNo}</td>
              <td className="p-1 text-right">{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
