import { BankOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router'
import { Button, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import { Option } from 'antd/es/mentions'
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_public/user/Checkout')({
  component: RouteComponent,
})
interface Product {
  id: number
  productName: string
  url: string
  prices: Price[]
}

interface Price {
  materialName: string
  price: number
}

interface Location {
  code: string;
  name: string;
}
const productsInCart = [
  {
    id: 1,
    name: "Áo Bóng Đá Đội Tuyển Bồ Đào Nha 2024-2025 (Size S)",
    quantity: 1,
    price: 80000,
    image: "/path/to/image1.jpg",
  },
  {
    id: 2,
    name: "Áo Bóng Đá Đội Tuyển Australia 2024-2025 (Size S)",
    quantity: 1,
    price: 80000,
    image: "/path/to/image2.jpg",
  },
  {
    id: 3,
    name: "Áo Bóng Đá Đội Tuyển Olympic 2024-2025 (Size S)",
    quantity: 4,
    price: 320000,
    image: "/path/to/image3.jpg",
  },
];
function RouteComponent() {
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] =useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  
  const totalPrice = productsInCart.reduce(
    (total, product) => total + product.price,
    0
  );
  const [products, setProducts] = useState([
    { id: 1, name: "Áo Bóng Đá Đội Tuyển Bồ Đào Nha 2024", price: 80000, quantity: 1 },
    { id: 2, name: "Áo Bóng Đá Australia Trắng Xanh 2024", price: 80000, quantity: 1 },
    { id: 3, name: "Áo Bóng Đá Trắng Olympic 2024", price: 80000, quantity: 4 },
  ]);



  useEffect(() => {
    // Fetch Provinces
    axios.get("https://provinces.open-api.vn/api/p/").then((res) => {
      setProvinces(res.data);
    });
  }, []);

  const handleProvinceChange = (value:any) => {
    setSelectedProvince(value);
    setDistricts([]);
    setWards([]);
    axios
      .get(`https://provinces.open-api.vn/api/p/${value}?depth=2`)
      .then((res) => {
        setDistricts(res.data.districts);
      });
  };

  const handleDistrictChange = (value:any) => {
    setSelectedDistrict(value);
    setWards([]);
    axios
      .get(`https://provinces.open-api.vn/api/d/${value}?depth=2`)
      .then((res) => {
        setWards(res.data.wards);
      });
  };
  const handleFinish = (value:any) => {
    console.log("Form Values: ", value);
  };
    return (
      
      <div className="max-w-6xl mx-auto py-10">
         <div className="bg-gray-200 p-4">
          <p className="text-gray-600 text-sm">Trang chủ / CheckOut</p>
        </div>
    
      <div className="grid grid-cols-3 gap-8">
        
        {/* Form thông tin giao hàng */}
        <div className="col-span-2 bg-white shadow-md p-6 rounded-md">
          <Typography.Title level={4}>Thông tin giao hàng</Typography.Title>
          <Form layout="vertical" onFinish={handleFinish}>
            
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>

            <Form.Item
              label="Điện thoại"
              name="phone"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <div className="grid grid-cols-3 gap-4">
              <Form.Item
                label="Tỉnh/Thành phố"
                name="province"
                rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố!" }]}
                
              >
            <Select
              placeholder="Chọn tỉnh/thành phố"
              onChange={handleProvinceChange}
            >
              {provinces.map((province) => (
                <Option key={province.code} value={province.code}>
                  {province.name}
                </Option>
              ))}
            </Select>
              </Form.Item>

              <Form.Item
                label="Quận/Huyện"
                name="district"
                rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
              >
               <Select
              placeholder="Chọn quận/huyện"
              onChange={handleDistrictChange}
              disabled={!selectedProvince}
            >
              {districts.map((district) => (
                <Option key={district.code} value={district.code}>
                  {district.name}
                </Option>
              ))}
            </Select>
              </Form.Item>

              <Form.Item
                label="Phường/Xã"
                name="ward"
                rules={[{ required: true, message: "Vui lòng chọn phường/xã!" }]}
              >
                <Select placeholder="Chọn phường/xã" disabled={!selectedDistrict}>
              {wards.map((ward) => (
                <Option key={ward.code} value={ward.code}>
                  {ward.name}
                </Option>
              ))}
            </Select>
              </Form.Item>
            </div>

            <Form.Item
              label="Địa chỉ nhận hàng"
              name="address"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            >
              <Input.TextArea placeholder="Nhập địa chỉ nhận hàng" />
            </Form.Item>

            <Form.Item label="Ghi chú giao hàng" name="note">
              <Input.TextArea placeholder="Nhập ghi chú (nếu có)" />
            </Form.Item>

            <Typography.Title level={5}>Phương thức thanh toán</Typography.Title>
            <Form.Item name="paymentMethod" initialValue="cod">
            <Select>
              <Option value="cod">
                <ShoppingCartOutlined /> Thanh toán khi nhận hàng
              </Option>
              <Option value="bankTransfer">
                <BankOutlined /> Thanh toán chuyển khoản
              </Option>
            </Select>
            </Form.Item>

            <div className="flex justify-between">
              <Button type="default" className="uppercase !bg-blue-500 text-white border-none rounded-none hover:bg-blue-700" >Tiếp tục mua hàng</Button>
              <Button type="primary" className="uppercase !bg-blue-500 text-white border-none rounded-none hover:bg-blue-700" htmlType="submit">
                Hoàn tất đơn hàng
              </Button>
            </div>
          </Form>
        </div>

        {/* Đơn hàng của bạn */}
        <div className="bg-white shadow-md p-6 rounded-md">
          <Typography.Title level={4}>Đơn hàng của bạn</Typography.Title>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <Typography.Text>Áo bóng đá tuyển 1</Typography.Text>
                <Typography.Text type="secondary" className="block">
                  Số lượng: 1
                </Typography.Text>
              </div>
              <Typography.Text strong>80.000 VNĐ</Typography.Text>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <Typography.Text>Áo bóng đá tuyển 2</Typography.Text>
                <Typography.Text type="secondary" className="block">
                  Số lượng: 4
                </Typography.Text>
              </div>
              <Typography.Text strong>320.000 VNĐ</Typography.Text>
            </div>
          </div>

          <div className="mt-6">
            <Button type="default" className="uppercase !bg-blue-500 text-white border-none rounded-none hover:bg-blue-700" block>
              Áp dụng voucher của shop
            </Button>
          </div>

          <div className="mt-6 text-right">
            <Typography.Text strong>Tổng cộng: 480.000 VNĐ</Typography.Text>
            <Typography.Text type="secondary" className="block">
              Giá trên chưa bao gồm phí vận chuyển
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
}
