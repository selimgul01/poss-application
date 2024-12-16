import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cartSlice";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const { cartItems, total, tax } = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      const res = await fetch(import.meta.env.VITE_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subtotal: total,
          tax: ((tax * total) / 100).toFixed(2),
          totalAmount: (total + (tax * total) / 100).toFixed(2),
          cartItems: cartItems,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }, 
      });
      if (res.status === 200) {
        message.success("Fatura Başarılı Bir Şekilde Oluşturuldu")
      }

    } catch (error) {
      message.error("Bir Şeyler Yanlış Gitti!")
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title="Fatura Oluştur"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name={"customerName"}
            label={"Müşteri Adı"}
            rules={[{ required: true }]}
          >
            <Input required={true} placeholder="Bir müşteri adı giriniz" />
          </Form.Item>

          <Form.Item
            name={"customerPhoneNumber"}
            label={"Telefon No"}
            rules={[{ required: true }]}
          >
            <Input placeholder="Bir telefon numarası giriniz" maxLength={11} />
          </Form.Item>

          <Form.Item
            name={"paymentMode"}
            label={"Ödeme Yöntemi"}
            rules={[{ required: true }]}
          >
            <Select placeholder="Bir ödeme yöntemi seçiniz">
              <Select.Option value="Nakit">Nakit</Select.Option>
              <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
            </Select>
          </Form.Item>

          <Card size="small" className="">
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
            <Button onClick={()=>dispatch(clearCart())} className="mt-4 w-full" type="primary" htmlType="submit">
              Sipariş Oluştur
            </Button>
          </Card>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBill;
