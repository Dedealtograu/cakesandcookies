import { useEffect, useState } from "react";
import Product from "../components/Product";
import type { ProductType } from "../types/Product";

const Home = () => {
  const [category, setCategory] = useState("Bolos");
  const [products, setProducts] = useState<ProductType[]>([]);

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

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/get-products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const filteredProducts = products.filter((product) => {
    return product.category === category;
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getProducts();
  }, []);

  return (
    <div className="mx-auto w-full px-3 text-white md:w-212.5 md:px-0">
      <div className="my-1 flex gap-2 md:my-3">
        <div
          className={getCategoryClass("Bolos")}
          onClick={() => handleChangeCategory("Bolos")}
        >
          Bolos
        </div>
        <div
          className={getCategoryClass("Biscoitos")}
          onClick={() => handleChangeCategory("Biscoitos")}
        >
          Biscoitos
        </div>
        <div
          className={getCategoryClass("Tortas")}
          onClick={() => handleChangeCategory("Tortas")}
        >
          Tortas
        </div>
      </div>
      <p className="mt-2 mb-2 font-bold text-[#F2DAAC] uppercase">{category}</p>
      <div className="flex flex-col gap-2 md:gap-3">
        {filteredProducts.map((product) => (
          <Product
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            category={product.category}
            key={product.id}
            setProducts={setProducts}
          />
        ))}
        {filteredProducts.length === 0 && (
          <p>Não há produtos dessa categoria.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
