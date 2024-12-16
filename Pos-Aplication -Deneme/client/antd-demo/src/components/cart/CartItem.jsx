import { Button, message } from "antd";
import {
  ClearOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { decrement, deleteCart, increment } from "../../redux/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProductHandler = () => {
    if (window.confirm("Ürün Silinsin Mi ?")) {
      dispatch(deleteCart(item));
      message.success("Ürün Sepetten Silindi!")

    }
  };

  return (
    <li className="flex justify-between">
      <div className="flex items-center cursor-pointer">
        <img
          onClick={deleteProductHandler}
          src={item.img}
          className="w-16 h-16 object-cover "
        />
        <div className="flex flex-col ml-2">
          <b>{item.title}</b>
          <span>
            {item.price}₺ x {item.quantity}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            if (item.quantity === 1) {
              if (window.confirm("Ürün Silinsin Mi ?")) {
                dispatch(decrement(item))
                message.success("Ürün Sepetten Silindi!")
              }
            }
            if (item.quantity > 1 ) {
              dispatch(decrement(item))
            }
          }}
          type="primary"
          size="small"
          className="rounded-full"
          icon={<MinusCircleOutlined />}
        ></Button>
        <span className="text-xl text-center w-[20px]">{item.quantity}</span>
        <Button
          onClick={() => dispatch(increment(item))}
          type="primary"
          size="small"
          className="rounded-full"
          icon={<PlusCircleOutlined />}
        ></Button>
      </div>
    </li>
  );
};

export default CartItem;
