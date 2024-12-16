import { Button, Card, message, Modal, Table } from "antd";
import Header from "../components/header/Header";
import React, { useState } from "react";
import CreateBill from "../components/cart/CreateBill";
import { useDispatch, useSelector } from "react-redux";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { decrement, deleteCart, increment } from "../redux/cartSlice";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const dispatch = useDispatch();
  const { cartItems, total ,tax } = useSelector((state) => state.cart);

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => {
        return <img src={text} className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (text,record) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                if (record.quantity === 1) {
                  if (window.confirm("Ürün Silinsin Mi ?")) {
                    dispatch(decrement(record));
                    message.success("Ürün Sepetten Silindi!");
                  }
                }
                if (record.quantity > 1) {
                  dispatch(decrement(record));
                }
              }}
              type="primary"
              size="small"
              className="rounded-full"
              icon={<MinusCircleOutlined />}
            ></Button>
            <span className="text-xl text-center w-[20px]">
              {record.quantity}
            </span>
            <Button
              onClick={() => dispatch(increment(record))}
              type="primary"
              size="small"
              className="rounded-full"
              icon={<PlusCircleOutlined />}
            ></Button>
          </div>
        );
      },
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text,record) => {
        return <span>{(record.price*record.quantity).toFixed(2)}₺</span>;
      },
    },
    {
      title: "İşlem",
      dataIndex: "action", 
      key: "action",
      render:(text,record)=>{
        return (
          <Button onClick={()=>{
            if (window.confirm("Ürünü Silmek İstediğinize Emin Misiniz?")) {
              dispatch(deleteCart(record))
              message.success("Ürün Başarılı bir Şekilde Silindi!")
            }
          }} danger type="link" className="text-base"> Sil </Button>
        )
      }
    }
  ];

  return (
    <>
      <Header />
      {cartItems.length > 0 ? <div className="px-6 ">
        <Table dataSource={cartItems} columns={columns} bordered scroll={{x:1200,y:300}} />
        <div className="flex justify-end mt-4">
          <Card size="small" className="w-72 ">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span> {total.toFixed(2)}₺</span>
            </div>

            <div className="flex justify-between text-red-500 my-2">
              <span>KDV Toplam </span>
              <span className="text-red-700">
                  +{((tax * total) / 100).toFixed(2)}₺
                </span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Toplam</span>
              <span>{(total + (tax * total) / 100).toFixed(2)}₺</span>
            </div>
            <Button className="mt-4 w-full" type="primary" onClick={showModal}>
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>: <div className="text-3xl text-center mt-20"> <h1>SEPETİNİZDE ÜRÜN BULUNMUYOR </h1> </div>}

      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
