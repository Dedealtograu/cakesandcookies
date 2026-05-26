import { ShoppingBag } from "lucide-react";
import type { ProductType } from "../types/Product";
import { formatter } from "../utils/formatter";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const Product = ({
  id,
  name,
  description,
  price,
  image,
  setProducts,
}: ProductType) => {
  const { user } = useContext(UserContext);

  const handleDeleteProduct = async (id: string) => {
    if (!id) {
      console.log("ID não enviado");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/delete-product/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        console.log("Erro ao deletar produto");
        return;
      }

      getProducts();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-products");
      const data = await response.json();
      if (setProducts) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <img
          src={`./${image}`}
          alt={name}
          className="h-25 w-25 md:h-50 md:w-50"
        />
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold uppercase md:text-lg">{name}</p>
            {user?.admin && (
              <div
                className="flex cursor-pointer items-center rounded-md border px-1 text-xs text-red-500 uppercase"
                onClick={() => handleDeleteProduct(id)}
              >
                Deletar
              </div>
            )}
          </div>
          <p className="flex-1 text-xs text-[#848484] md:text-lg">
            {description}
          </p>
          <div className="flex items-center justify-end gap-2">
            <p className="text-sm text-[#F2DAAC] md:text-lg">
              {formatter(Number(price))}
            </p>
            <ShoppingBag size={20} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
