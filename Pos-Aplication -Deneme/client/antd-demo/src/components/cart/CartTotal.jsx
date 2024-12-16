import { Button, message } from "antd";
import {
  ClearOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { cartItems, total, tax } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [messageApi, contextHolder] = message.useMessage();



  return (
    <>
      {cartItems.length > 0 ? (
        <div className="h-full flex flex-col">
          <h2 className="bg-blue-600 text-center text-white py-4 font-bold tracking-wide">
            Sepetteki Ürünler
          </h2>
          <ul className=" px-2 flex flex-col gap-y-3 pt-2">
            {cartItems.map((item, i) => (
              <CartItem key={i} item={item} />
            ))}
          </ul>
          <div className="mt-auto">
            <div className="">
              <div className="flex justify-between p-2 border-t">
                <b>Ara Toplam</b>
                <span> {total.toFixed(2)}₺</span>
              </div>
              <div className="flex justify-between p-2 ">
                <b>KDV %{tax}</b>
                <span className="text-red-700">
                  +{((tax * total) / 100).toFixed(2)}₺
                </span>
              </div>
              <div className="flex justify-between p-2 border">
                <b className="text-lg text-green-500">Genel Toplam</b>
                <span className="text-xl">
                  {" "}
                  {(total + (tax * total) / 100).toFixed(2)}₺
                </span>
              </div>
              <div className="py-4 px-2">
                <Button onClick={()=>navigate("/cart")} type="primary" size="large" className="w-full">
                  Sipariş Oluştur
                </Button>
                <Button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Sepeti Boşaltmak İstediğinize Emin Misiniz ?"
                      )
                    ) {
                      dispatch(clearCart());
                      {
                        contextHolder;
                      }
                      message.success("Sepetiniz Temizlendi!");
                    }
                  }}
                  danger
                  type="primary"
                  size="large"
                  className="w-full mt-3"
                  icon={<ClearOutlined />}
                >
                  Temizle
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col ">
          <h1 className="bg-blue-600 text-center text-white py-4 font-bold tracking-wide">
            <p>SEPET</p>
            <br />
            Henüz Ürün Eklemediniz
          </h1>
        </div>
      )}
    </>
  );
};

export default CartTotal;
