import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

const Products = ({
  categories,
  setCategories,
  filtered,
  products,
  setProducts,
  search,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <ul className="grid grid-cols-card gap-4">
        {filtered
          .filter((item) => item.title.toLowerCase().includes(search))
          .map((product, i) => (
            <ProductItem key={i} product={product} />
          ))}

        <li
          onClick={() => setIsAddModalOpen(true)}
          className="category-item !bg-purple-800 hover:opacity-90 h-[150px]"
        >
          <span>
            <PlusOutlined className="md:text-3xl text-2xl" />
          </span>
        </li>

        <li
          onClick={() => navigate("/product")}
          className="category-item !bg-orange-800 hover:opacity-90 h-[150px]"
        >
          <span>
            <EditOutlined className="md:text-3xl text-2xl" />
          </span>
        </li>
      </ul>
      <Add
        products={products}
        setProducts={setProducts}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </>
  );
};

export default Products;
