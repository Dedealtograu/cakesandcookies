import { CalendarFold, User, Watch } from "lucide-react";

type CardOrderProps = {
  id: string;
  name: string;
  date: string;
  orderTime: string;
  deliveryTime?: string;
  price: number;
};

const CardOrder = ({
  id,
  name,
  date,
  orderTime,
  deliveryTime,
  price,
}: CardOrderProps) => {
  return (
    <div className="rounded-md bg-[#F2DAAC] p-2 text-[#32343E]">
      <div className="flex justify-between">
        <p className="font-bold">#{id}</p>
        <select name="" id="" className="font-bold">
          <option value="pendente" defaultChecked disabled>
            Pendente
          </option>
          <option value="entregue">Entregue</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <User size={18} />
          <p className="text-xs">{name}</p>
        </div>
        <div className="flex items-center gap-2">
          <CalendarFold size={18} />
          <p className="text-xs">{date}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Watch size={18} />
            <p className="text-xs">{orderTime}</p>
          </div>
          <div className="flex items-center gap-2">
            <Watch size={18} />
            <p className="text-xs">{deliveryTime ? deliveryTime : "-"}</p>
          </div>
        </div>
        <div className="mt-1 h-px w-full bg-[#23343E]"></div>
        <p className="text-right text-lg font-bold">R${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CardOrder;
