import {
  BellOutlined,
  LogoutOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@tanstack/react-router";
import { Divider, Dropdown, Input, notification } from "antd";
import logo from "../../assets/logo.png";
import SignInModal from "../auth/sign-in";
import { useEffect, useState } from "react";
import { logout } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";

export default function AppHeader() {
  const [openModal, handleOpenModal] = useDisclosure(false);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, [isLogin]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setIsLogin(false);
    notification.success({
      message: "Đăng xuất thành công",
      description: `Thành công`,
    });
  };
  return (
    <>
      <div className="flex items-center justify-between p-4 ">
        <div>
          <img src={logo} alt="logo" className="object-cover h-12" />
        </div>

        <div className="flex items-center gap-x-2">
          <Link to="/">TRANG CHỦ</Link>

          <Divider type="vertical" />

          <Link to="/">PHỤ KIỆN</Link>

          <Divider type="vertical" />

          <Link to="/" className="uppercase">
            Đồ thể thao nam
          </Link>

          <Divider type="vertical" />

          <Link to="/" className="uppercase">
            Đồ thể thao Nữ
          </Link>

          <Divider type="vertical" />

          <Link to="/" className="uppercase">
            Gel năng lượng
          </Link>

          <Divider type="vertical" />

          <Link to="/" className="uppercase">
            Phụ kiện thể thao
          </Link>

          <Divider type="vertical" />

          <Link to="/" className="uppercase">
            Quần Áo Đội Nhóm
          </Link>

          <Divider type="vertical" />

          <Link to="/" className="uppercase">
            Blog Thể Thao
          </Link>

          <Divider type="vertical" />

          <Link to="/" className="uppercase">
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

          <ShoppingCartOutlined />
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
