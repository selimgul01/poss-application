import { useEffect, useState } from "react";
import "./style.css";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import Add from "./Add";
import Edit from "./Edit";

const Categories = ({ categories, setCategories , setFiltered ,products , setProducts}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle,setCategoryTitle] = useState("Tümü")

  useEffect(()=>{
    if (categoryTitle === "Tümü") {
      setFiltered(products)
    }else{
      setFiltered(products.filter(item => item.category === categoryTitle))
    }
  },[products,setFiltered,categoryTitle])

  
  return (
    <ul className="flex gap-4 md:flex-col text-lg">
      {categories.map((category, i) => (
        <li key={i} className="category-item" onClick={()=> setCategoryTitle(category.title)}>
          <span>{category.title}</span>
        </li>
      ))}

      <li
        onClick={() => setIsAddModalOpen(true)}
        className="category-item !bg-purple-800 hover:opacity-90"
      >
        <span>
          <PlusOutlined className="md:text-3xl text-2xl" />
        </span>
      </li>

      <li
        onClick={() => setIsEditModalOpen(true)}
        className="category-item !bg-orange-800 hover:opacity-90"
      >
        <span>
          <EditOutlined className="md:text-3xl text-2xl" />
        </span>
      </li>

      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};

export default Categories;
