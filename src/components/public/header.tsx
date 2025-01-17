import {
  BellOutlined,
  DeleteOutlined,
  LogoutOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Button,
  Divider,
  Dropdown,
  Image,
  Input,
  Menu,
  notification,
  Tooltip,
} from "antd";
import logo from "../../assets/logo.png";
import SignInModal from "../auth/sign-in";
import { useEffect, useState } from "react";
import { logout, setDataUser } from "../../store/authSlice";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import StorageKeys from "../../constants/storage-key";
import { removeFromCart, updateQuantity } from "../../store/cardSlice";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    size: string;
    price: number;
    quantity: number;
    image: string;
  };
}
export default function AppHeader() {
  const [openModal, handleOpenModal] = useDisclosure(false);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const handleRemove = (data) => {
    dispatch(removeFromCart(data));
  };

  const handleQuantityChange = (id, quantity, materialId, sizeId) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity, materialId, sizeId }));
    }
  };
  useEffect(() => {
    const userData = sessionStorage.getItem("userInfo");
    if (userData) {
      dispatch(setDataUser(JSON.parse(userData)));
    }
  }, []);
  useEffect(() => {
    setIsLogin(!!userInfo);
  }, [userInfo]);

  const handleLogout = () => {
    sessionStorage.removeItem(StorageKeys.TOKEN);
    sessionStorage.removeItem(StorageKeys.USERINFO);
    dispatch(logout());
    setIsLogin(false);
    notification.success({
      message: "Đăng xuất thành công",
      description: `Thành công`,
    });
  };

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const totalPrice = cartItems.reduce((total, item) => {
    const quantity = quantities[item.id] || item.quantity; // Lấy số lượng từ state, nếu không có thì lấy từ giá trị mặc định
    return total + item.price * quantity;
  }, 0);
  const menu = (
    <Menu className="p-4" style={{ width: "30rem" }}>
      <h3 className="text-lg bg-zinc-200 font-semibold mb-2 pl-4 rounded">
        Giỏ Hàng Của Bạn
      </h3>

      {cartItems?.length > 0 ? (
        <>
          {cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex items-center mb-4">
              <div className="flex items-center mb-4">
                {/* Thẻ 1: Ảnh */}
                <div className="w-3/12 mr-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={110}
                    height={110}
                    className="object-cover rounded"
                  />
                </div>
                <div className="w-9/12 flex flex-col">
                  <span className="font-semibold text-lg block">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500 block ">
                    {item.material} : {item.size}
                  </span>
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span className="font-bold text-gray-500">
                      <span className="font-bold text-lg "> {item.price}</span>
                      <span className="text-sm font-semibold">
                        <sup className="text-xs">VND</sup>
                      </span>
                    </span>
                    <span className="text-xs text-gray-500"> X </span>

                    <Input
                      type="number"
                      className="w-10 p-1 border rounded text-center mx-3"
                      value={quantities[item.id] || item.quantity} // Đảm bảo nếu không có giá trị thì lấy giá trị mặc định từ item
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          +e.target.value,
                          item.materialId,
                          item.sizeId
                        )
                      }
                    />

                    <span className="text-gray-500 font-bold text-lg ml-4">
                      {(
                        item.price * (quantities[item.id] || item.quantity)
                      ).toLocaleString()}{" "}
                      <span className="text-sm font-semibold">
                        <sup className="text-xs">VND</sup>
                      </span>
                    </span>
                    <DeleteOutlined
                      onClick={() => handleRemove(item)}
                      className="text-red-500 cursor-pointer block"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Tổng cộng */}
          <Menu.Divider />
          <Menu.Item key="total">
            <div className="flex justify-between">
              <span className="font-semibold">Tổng cộng:</span>
              <span className="font-semibold">
                {totalPrice.toLocaleString()} VND
              </span>
            </div>
          </Menu.Item>

          {/* Thoát */}
          <Menu.Divider />
          <Menu.Item key="checkout">
            <Button
              onClick={() =>
                navigate({
                  to: "/user/checkout",
                })
              }
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
            >
              Thanh toán
            </Button>
          </Menu.Item>
        </>
      ) : (
        <div style={{ padding: "15px" }}>
          Chưa có sản phẩm nào trong giỏ hàng!
        </div>
      )}
    </Menu>
  );
  return (
    <>
      <div className="flex items-center justify-between p-4 ">
        <div>
          <img src={logo} alt="logo" className="object-cover h-12" />
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-800 hover:text-blue-500 text-sm">
            TRANG CHỦ
          </Link>

          <div className="border-l-2 border-gray-300 h-6"></div>

          <Link to="/" className="text-gray-800 hover:text-blue-500 text-sm">
            PHỤ KIỆN
          </Link>

          <div className="border-l-2 border-gray-300 h-6"></div>

          <Link
            to="/"
            className="text-gray-800 hover:text-blue-500 uppercase text-sm"
          >
            Đồ thể thao nam
          </Link>

          <div className="border-l-2 border-gray-300 h-6"></div>

          <Link
            to="/"
            className="text-gray-800 hover:text-blue-500 uppercase text-sm"
          >
            Đồ thể thao Nữ
          </Link>

          <div className="border-l-2 border-gray-300 h-6"></div>

          <Link
            to="/"
            className="text-gray-800 hover:text-blue-500 uppercase text-sm"
          >
            Gel năng lượng
          </Link>

          <div className="border-l-2 border-gray-300 h-6"></div>

          <Link
            to="/"
            className="text-gray-800 hover:text-blue-500 uppercase text-sm"
          >
            Phụ kiện thể thao
          </Link>

          <div className="border-l-2 border-gray-300 h-6"></div>

          <Link
            to="/"
            className="text-gray-800 hover:text-blue-500 uppercase text-sm"
          >
            Quần Áo Đội Nhóm
          </Link>

          <div className="border-l-2 border-gray-300 h-6"></div>

          <Link
            to="/"
            className="text-gray-800 hover:text-blue-500 uppercase text-sm"
          >
            Blog Thể Thao
          </Link>

          <div className="border-l-2 border-gray-300 h-6"></div>

          <Link
            to="/user/Contact"
            className="text-gray-800 hover:text-blue-500 uppercase text-sm"
          >
            Liên Hệ
          </Link>
        </div>

        <div className="flex items-center gap-x-4">
          <Input placeholder="Tìm kiếm..." prefix={<SearchOutlined />} />

          {isLogin ? (
            <>
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: [
                    {
                      label: "Đăng xuất",
                      icon: <LogoutOutlined />,
                      type: "item",
                      key: "logout",
                      onClick: handleLogout,
                    },
                  ],
                }}
              >
                <UserOutlined />
              </Dropdown>
            </>
          ) : (
            <>
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: [
                    {
                      label: "Đăng nhập",
                      icon: <UserOutlined />,
                      type: "item",
                      key: "login",
                      onClick: handleOpenModal.open,
                    },
                  ],
                }}
              >
                <UserOutlined />
              </Dropdown>
            </>
          )}

          <BellOutlined />

          <Dropdown
            overlay={menu}
            trigger={["click"]}
            overlayStyle={{ width: "30rem" }}
          >
            <span className="box-bag">
              <ShoppingCartOutlined className="cursor-pointer" />
              <span className="count-cart">{cartItems?.length || 0}</span>
            </span>
          </Dropdown>
        </div>
      </div>

      <SignInModal
        open={openModal}
        onCancel={() => handleOpenModal.close()}
        onClose={() => handleOpenModal.close()}
      />
    </>
  );
}
