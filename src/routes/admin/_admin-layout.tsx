import {
  BellOutlined,
  ContainerOutlined,
  FolderOutlined,
  GiftOutlined,
  HomeOutlined,
  KeyOutlined,
  LogoutOutlined,
  PhoneOutlined,
  ProductOutlined,
  SettingOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { Avatar, Dropdown, Image, Layout, Menu, notification } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import StorageKeys from "../../constants/storage-key";
import { logout, setDataUser } from "../../store/authSlice";
import { AppDispatch, RootState } from "../../store/store";

export const Route = createFileRoute("/admin/_admin-layout")({
  beforeLoad: ({ context }) => {
    if (!context?.isAdmin) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const userData = sessionStorage.getItem("userInfo");
    if (userData) {
      dispatch(setDataUser(JSON.parse(userData)));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem(StorageKeys.TOKEN);
    sessionStorage.removeItem(StorageKeys.USERINFO);
    dispatch(logout());
    notification.success({
      message: "Đăng xuất thành công",
      description: `Thành công`,
    });
    navigate({ to: "/auth/sign-in" });
  };
  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        className="shadow"
      >
        <div className="h-[64px] flex items-center justify-center">
          <Image src={logo} alt="logo" preview={false} />
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={[
            {
              label: "Trang chủ",
              key: "homepage",
              icon: <HomeOutlined />,
              onClick: () =>
                navigate({
                  to: "/admin",
                }),
            },
            {
              label: "Quản lý tài khoản",
              key: "account",
              icon: <UserOutlined />,
              children: [
                {
                  label: "Tài khoản",
                  key: "account-management",
                  onClick: () =>
                    navigate({
                      to: "/admin/accounts",
                    }),
                },
                {
                  label: "Vai trò",
                  key: "account-role",
                  onClick: () =>
                    navigate({
                      to: "/admin/roles",
                    }),
                },
              ],
            },
            {
              label: "Khách hàng",
              key: "customer",
              icon: <ContainerOutlined />,
              onClick: () =>
                navigate({
                  to: "/admin/customer",
                }),
            },
            {
              label: "Danh mục",
              key: "category",
              icon: <FolderOutlined />,
              onClick: () => {
                navigate({
                  to: "/admin/category",
                });
              },
            },
            {
              label: "Voucher",
              key: "voucher",
              icon: <GiftOutlined />,
              onClick: () => {
                navigate({
                  to: "/admin/voucher",
                });
              },
            },
            {
              label: "Sản phẩm",
              key: "products",
              icon: <ProductOutlined />,
              children: [
                {
                  label: "Danh sách",
                  key: "product-list",
                  onClick: () =>
                    navigate({
                      to: "/admin/products",
                    }),
                },
                {
                  label: "Thêm mới",
                  key: "product-add",
                  onClick: () =>
                    navigate({
                      to: "/admin/product-add",
                    }),
                },
              ],
            },
            {
              label: "Order",
              key: "order",
              icon: <ShoppingOutlined />,
              onClick: () => {
                navigate({
                  to: "/admin/order",
                });
              },
            },
            {
              label: "Liên hệ",
              key: "contact",
              icon: <PhoneOutlined />,
              onClick: () => {
                navigate({
                  to: "/admin/contact",
                });
              },
            },
            {
              label: "Cấu hình hệ thống",
              key: "settings",
              icon: <SettingOutlined />,
              onClick: () =>
                navigate({
                  to: "/admin/settings",
                }),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header className="p-0 overflow-hidden bg-white shadow">
          <div className="flex items-center justify-between h-full px-4">
            <div></div>

            <div className="flex items-center gap-x-4">
              <Dropdown
                menu={{
                  items: [],
                }}
              >
                <BellOutlined className="cursor-pointer" />
              </Dropdown>

              <div className="flex items-center gap-x-2">
                <p className="font-semibold">
                  Xin chào: {userInfo?.user?.username}
                </p>

                <Dropdown
                  menu={{
                    items: [
                      // {
                      //   label: "Đổi mật khẩu",
                      //   type: "item",
                      //   key: "change-password",
                      //   icon: <KeyOutlined />,
                      //   onClick: () =>
                      //     navigate({ to: "/admin/change-password" }),
                      // },
                      {
                        label: "Đăng xuất",
                        type: "item",
                        key: "logout",
                        icon: <LogoutOutlined />,
                        onClick: handleLogout,
                      },
                    ],
                  }}
                >
                  <Avatar
                    shape="square"
                    icon={<UserOutlined />}
                    className="cursor-pointer"
                  ></Avatar>
                </Dropdown>
              </div>
            </div>
          </div>
        </Header>

        <Content>
          <div className="p-4">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
