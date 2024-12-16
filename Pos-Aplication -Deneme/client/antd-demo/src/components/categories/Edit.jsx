import { Button, Form, Input, message, Modal, Table } from "antd";
import React, { useState } from "react";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState({});

  const onFinish = (values) => {
    console.log(values)
    if (values.title.length > 0) {
      try {
        fetch(import.meta.env.VITE_SERVER_URL + "/api/categories/update-category", {
          method: "PUT",
          body: JSON.stringify({ ...values, categoryId: editingRow._id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        setCategories(categories.map((item)=>{
          if (item._id === editingRow._id) {
            return {...item,title:values.title}
          }else return item
        }))
        message.success("Kategori Başarılı Bir Şekilde Güncellendi")
      } catch (error) {
        console.log(error);
        message.error("Bir Şeyler Yanlış Gitti")
  
      }
    }else{
      message.warning("Bir Kategori Girmelisiniz")
    }
    
  };

  const deleteCategory = (_id) => {
    if (window.confirm("Silmek İstediğinize Emin Misiniz ? ")) {
      try {
        fetch(import.meta.env.VITE_SERVER_URL + "/api/categories/delete-category",{
          method:"DELETE",
          body: JSON.stringify({categoryId:_id}),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
        setCategories(
          categories.filter((item) => item._id !== _id)
        )
        message.success("Kategori Başarılı Bir Şekilde Silindi")
      } catch (error) {
        console.log(error)
      }
    }
  }

  const columns = [
    {
      title: "Kategori",
      dataIndex: "title",
      render: (text, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item className="mb-0" name={"title"}>
              <Input  />
            </Form.Item>
          );
        } else return <p>{text}</p>;
      },
    },
    {
      title: "Kategori Düzenle",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex">
            <Button onClick={() => setEditingRow(record)} type="link">
              Düzenle
            </Button>
            <Button type="text" htmlType="submit">
              Kaydet
            </Button>
            <Button danger type="text" onClick={()=>deleteCategory(record._id)}>
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      title={"Kategori İşlemleri"}
      open={isEditModalOpen}
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish} initialValues={"title"}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;
