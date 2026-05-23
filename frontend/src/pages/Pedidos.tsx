import { useState } from "react";
import CardOrder from "../components/CardOrder";

const Pedidos = () => {
  const [category, setCategory] = useState("Pendente");

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const getCategoryClass = (categoryName: string) => {
    const selectedCategoryStyle =
      "md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border border-[#F2DAAC] bg-[#F2DAAC] text-sm font-bold text-[#161410] md:h-9 md:w-32";

    const unselectedCategoryStyle =
      "md:text-md flex h-7 w-24 cursor-pointer items-center justify-center rounded-md border border-[#F2DAAC] bg-[#161410] text-sm font-bold text-[#F2DAAC] hover:bg-[#F2DAAC] hover:text-[#161410] md:h-9 md:w-32";

    if (category === categoryName) {
      return selectedCategoryStyle;
    } else {
      return unselectedCategoryStyle;
    }
  };

  return (
    <div className="mx-auto w-full px-3 text-white md:w-212.5 md:px-0">
      <div className="mt-1 mb-3 flex gap-2 md:my-3">
        <div
          className={getCategoryClass("Pendente")}
          onClick={() => handleChangeCategory("Pendente")}
        >
          Pendente
        </div>
        <div
          className={getCategoryClass("Entregue")}
          onClick={() => handleChangeCategory("Entregue")}
        >
          Entregue
        </div>
        <div
          className={getCategoryClass("Cancelado")}
          onClick={() => handleChangeCategory("Cancelado")}
        >
          Cancelado
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <CardOrder
          id="1"
          name="João da Silva"
          date="12/12/2026"
          orderTime="12:00"
          price={20}
        />
      </div>
    </div>
  );
};

export default Pedidos;
