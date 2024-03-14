interface CardProps {
  id: number;
  name: string;
  email: string;
}
const Card: React.FC<{ cardProps: CardProps }> = ({ cardProps }) => {
  return (
    <div className="group px-4 py-2 w-full flex items-center gap-x-4 bg-neutral-800 hover:bg-emerald-700 transition-all ease-in-out rounded-lg">
      <h1 className="text-neutral-200 w-[25px]">{cardProps.id}</h1>
      <div className="flex justify-between w-full">
        <h2 className="text-neutral-200">{cardProps.name}</h2>
        <p className="text-neutral-400">{cardProps.email}</p>
      </div>
    </div>
  );
};

export default Card;
