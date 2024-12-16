import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import { message } from "antd";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addProductHandler = () => {
    dispatch(addProduct({...product,quantity:1}));
    message.success("Ürün Sepete Eklendi")
  };

 

  return (
    <li
      onClick={addProductHandler}
      className="border hover:shadow-lg cursor-pointer transition-all select-none"
    >
      <div >
        <img src={product.img} className="h-28 object-cover w-full border-b" />
      </div>
      <div className="flex flex-col p-3">
        <span className="font-bold">{product.title}</span>
        <span>{product.price} ₺</span>
      </div>
    </li>
  );
};

export default ProductItem;
