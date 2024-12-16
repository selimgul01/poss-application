import { Button, Card, Spin, Table } from "antd";
import Header from "../components/header/Header";
import React, { useEffect, useState } from "react";

const CustomerPage = () => {
  const [billItems, setBillItems] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/bills/get-all`);
        const data = await res.json();
        setBillItems(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBills();
  }, []);

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "İşlem Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text,record)=>{
        return(
          <span>{text.substring(0,10)}</span>
        )
      }
    },
  ];
  return (
    <>
      <Header />
      {billItems ? <div className="px-6 ">
        <h1 className="text-3xl text-center font-bold mb-6">Müşteriler</h1>
        <Table dataSource={billItems} columns={columns} bordered scroll={{x:1000,y:300}} />
        <div className="flex justify-end mt-4"></div>
      </div> : <Spin size="large" className="absolute top-1/2 left-1/2 h-screen"/> }
    </>
  ); 
};

export default CustomerPage;
