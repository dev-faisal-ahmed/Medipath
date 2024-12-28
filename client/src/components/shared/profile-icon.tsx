type TProps = {
  size?: number;
  name: string;
};

export const ProfileIcon = ({ name }: TProps) => {
  return (
    <div className="flex size-9 items-center justify-center rounded-md bg-primary text-2xl font-bold text-white">
      {name?.[0]}
    </div>
  );
};
