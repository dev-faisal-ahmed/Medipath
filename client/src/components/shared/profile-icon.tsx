export const ProfileIcon = ({ name }: TProfileIconProps) => {
  return (
    <div className="flex size-9 items-center justify-center rounded-md bg-primary text-2xl font-bold text-white">
      {name?.[0]}
    </div>
  );
};

type TProfileIconProps = {
  size?: number;
  name: string;
};
