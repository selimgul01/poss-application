import React, { useEffect, useState } from 'react'
import Header from "../components/header/Header"
import Edit from '../components/products/Edit'
const ProductPage = () => {


  const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
          try {
            const res = await fetch(import.meta.env.VITE_SERVER_URL + "/api/products/get-all");
            const data = await res.json();
            setProducts(data);
          } catch (error) {
            console.log(error);
          }
        };
        getProducts();
      }, []);

  return (
    <>
      <Header />
      <h1 className='text-4xl text-center font-bold '> Ürünler</h1>
      <Edit products={products} setProducts={setProducts} />
    </>
  )
}

export default ProductPage
