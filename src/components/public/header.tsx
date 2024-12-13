import {
  BellOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useDisclosure } from '@mantine/hooks';
import { Link } from '@tanstack/react-router';
import { Divider, Dropdown, Input } from 'antd';
import logo from '../../assets/logo.png';
import SignInModal from '../auth/sign-in';

export default function AppHeader() {
  const [openModal, handleOpenModal] = useDisclosure(false);

  return (
    <>
      <div className='flex items-center justify-between p-4 '>
        <div>
          <img src={logo} alt='logo' className='object-cover h-12' />
        </div>

        <div className='flex items-center gap-x-2'>
          <Link to='/'>TRANG CHỦ</Link>

          <Divider type='vertical' />

          <Link to='/'>PHỤ KIỆN</Link>

          <Divider type='vertical' />

          <Link to='/' className='uppercase'>
            Đồ thể thao nam
          </Link>

          <Divider type='vertical' />

          <Link to='/' className='uppercase'>
            Đồ thể thao Nữ
          </Link>

          <Divider type='vertical' />

          <Link to='/' className='uppercase'>
            Gel năng lượng
          </Link>

          <Divider type='vertical' />

          <Link to='/' className='uppercase'>
            Phụ kiện thể thao
          </Link>

          <Divider type='vertical' />

          <Link to='/' className='uppercase'>
            Quần Áo Đội Nhóm
          </Link>

          <Divider type='vertical' />

          <Link to='/' className='uppercase'>
            Blog Thể Thao
          </Link>

          <Divider type='vertical' />

          <Link to='/' className='uppercase'>
            Liên Hệ
          </Link>
        </div>

        <div className='flex items-center gap-x-4'>
          <Input placeholder='Tìm kiếm...' prefix={<SearchOutlined />} />

          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                {
                  label: 'Đăng nhập',
                  icon: <UserOutlined />,
                  type: 'item',
                  key: 'login',
                  onClick: handleOpenModal.open,
                },
              ],
            }}
          >
            <UserOutlined />
          </Dropdown>

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
