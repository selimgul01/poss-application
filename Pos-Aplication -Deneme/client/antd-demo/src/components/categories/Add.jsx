import { Button, Form, Input, Modal,message } from "antd";


const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(import.meta.env.VITE_SERVER_URL + "/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori Başarılı Bir Şekilde Eklendi");
      setCategories([...categories, values]);
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title=" YeniKategori Ekle"
        open={isAddModalOpen}
        footer={false}
        onCancel={() => setIsAddModalOpen(false)}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name={"title"}
            label={"Kategori Ekle"}
            rules={[{ required: true, message: "Bir Kategori Girmelisiniz" }]}
          >
            <Input />
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
