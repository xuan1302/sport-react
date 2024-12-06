import {
  BellOutlined,
  ContainerOutlined,
  HomeOutlined,
  KeyOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useState } from 'react';

export const Route = createFileRoute('/admin/_admin-layout')({
  component: RouteComponent,
});

function RouteComponent() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout className='min-h-screen'>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme='light'
        className='shadow'
      >
        <div className='h-[64px] flex items-center justify-center'>Logo</div>
        <Menu
          theme='light'
          defaultSelectedKeys={['1']}
          mode='inline'
          items={[
            {
              label: 'Trang chủ',
              key: 'homepage',
              icon: <HomeOutlined />,
              onClick: () =>
                navigate({
                  to: '/admin',
                }),
            },
            {
              label: 'Quản lý tài khoản',
              key: 'account',
              icon: <UserOutlined />,
              children: [
                {
                  label: 'Tài khoản',
                  key: 'account-management',
                  onClick: () =>
                    navigate({
                      to: '/admin/accounts',
                    }),
                },
                {
                  label: 'Vai trò',
                  key: 'account-role',
                  onClick: () =>
                    navigate({
                      to: '/admin/roles',
                    }),
                },
              ],
            },
            {
              label: 'Khách hàng',
              key: 'customer',
              icon: <ContainerOutlined />,
              onClick: () =>
                navigate({
                  to: '/admin/customer',
                }),
            },
            {
              label: 'Cấu hình hệ thống',
              key: 'settings',
              icon: <SettingOutlined />,
              onClick: () =>
                navigate({
                  to: '/admin/settings',
                }),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header className='p-0 bg-white overflow-hidden shadow'>
          <div className='h-full flex items-center justify-between px-4'>
            <div></div>

            <div className='flex items-center gap-x-4'>
              <Dropdown
                menu={{
                  items: [],
                }}
              >
                <Button type='text'>
                  <BellOutlined />
                </Button>
              </Dropdown>

              <div className='flex items-center gap-x-2'>
                <p className='font-semibold'>Hello world</p>

                <Dropdown
                  menu={{
                    items: [
                      {
                        label: 'Đổi mật khẩu',
                        type: 'item',
                        key: 'change-password',
                        icon: <KeyOutlined />,
                        onClick: () =>
                          navigate({ to: '/admin/change-password' }),
                      },
                      {
                        label: 'Đăng xuất',
                        type: 'item',
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        onClick: () => navigate({ to: '/' }),
                      },
                    ],
                  }}
                >
                  <Avatar
                    shape='square'
                    icon={<UserOutlined />}
                    className='cursor-pointer'
                  ></Avatar>
                </Dropdown>
              </div>
            </div>
          </div>
        </Header>

        <Content>
          <div className='p-4'>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
