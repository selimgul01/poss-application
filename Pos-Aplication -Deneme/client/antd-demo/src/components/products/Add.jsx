import { Button, Form, Input, Modal, Select, message } from "antd";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  products,
  setProducts,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(import.meta.env.VITE_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün Başarılı Bir Şekilde Eklendi");
      setProducts([...products, {...values , price:Number(values.price)}]);
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title=" Yeni Ürün Ekle"
        open={isAddModalOpen}
        footer={false}
        onCancel={() => setIsAddModalOpen(false)}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name={"title"}
            label={"Ürün Ekle"}
            rules={[{ required: true, message: "Bir Ürün Girmelisiniz" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"img"}
            label={"Ürün Görseli"}
            rules={[{ required: true, message: "Bir Görsel Girmelisiniz" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"price"}
            label={"Ürün Fiyatı"}
            rules={[{ required: true, message: "Bir Fiyat Girmelisiniz" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"category"}
            label={"Kategori Seç"}
            rules={[{ required: true, message: "Bir Kategori Seçmelisiniz" }]}
          >
            <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Add;
