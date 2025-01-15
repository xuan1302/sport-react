import { BankOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router'
import { Button, Col, Form, Input, Row, Select, Space, Typography, Menu } from 'antd';
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
  const [districts, setDistricts] = useState<Location[]>([]);
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

  const handleProvinceChange = (value: any) => {
    setSelectedProvince(value);
    setDistricts([]);
    setWards([]);
    axios
      .get(`https://provinces.open-api.vn/api/p/${value}?depth=2`)
      .then((res) => {
        setDistricts(res.data.districts);
      });
  };

  const handleDistrictChange = (value: any) => {
    setSelectedDistrict(value);
    setWards([]);
    axios
      .get(`https://provinces.open-api.vn/api/d/${value}?depth=2`)
      .then((res) => {
        setWards(res.data.wards);
      });
  };
  const handleFinish = (value: any) => {
    console.log("Form Values: ", value);
  };

  const cartItems = [
    { id: 1, name: "Sản phẩm 1", category: "Thun Lạnh", size: "XL", price: 100000, quantity: 2, image: "https://haycafe.vn/wp-content/uploads/2022/02/Tai-anh-girl-gai-dep-de-thuong-ve-may.jpg" },
    { id: 2, name: "Sản phẩm 2", category: "Thun Lạnh", size: "XL", price: 200000, quantity: 1, image: "https://haycafe.vn/wp-content/uploads/2022/02/Tai-anh-girl-gai-dep-de-thuong-ve-may.jpg" },
    { id: 3, name: "Sản phẩm 3", category: "Thun Lạnh", size: "XL", price: 200000, quantity: 1, image: "https://haycafe.vn/wp-content/uploads/2022/02/Tai-anh-girl-gai-dep-de-thuong-ve-may.jpg" },
    // Thêm sản phẩm khác nếu cần
  ];
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const totalPricePro = cartItems.reduce((total, item) => {
    const quantity = quantities[item.id] || item.quantity; // Lấy số lượng từ state, nếu không có thì lấy từ giá trị mặc định
    return total + (item.price * quantity);
  }, 0);



  // Hàm xử lý khi thay đổi số lượng
  const handleQuantityChange = (id: number, value: number) => {
    // Cập nhật số lượng mới vào state
    if (value >= 0) {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [id]: value,
      }));
    }
  };
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (index: any) => {
    setSelectedOption(index);
  };


  return (

    <div className="max-w-7xl mx-auto py-10">
      <div className="bg-gray-200 p-4">
        <p className="text-gray-600 text-sm">Trang chủ / CheckOut</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
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
              <Input placeholder="Nhập địa chỉ nhận hàng" />
            </Form.Item>

            <Form.Item label="Ghi chú giao hàng" name="note">
              <Input.TextArea placeholder="Nhập ghi chú (nếu có)" />
            </Form.Item>

            <Typography.Title level={5}>Phương thức thanh toán</Typography.Title>
            <Form.Item name="paymentMethod" initialValue="cod">
              <div className="flex w-full space-x-4">
                {/* Thẻ 1 */}
                <div
                  onClick={() => handleClick(1)}
                  className={`flex items-center w-full p-4 cursor-pointer ${selectedOption === 1 ? 'border-2 border-blue-500' : ''}`}
                >
                  <img
                    src={'https://aobongda.net/Css/Pic/freeShip.png'}
                    width={55}
                    height={55}
                    className="object-cover rounded"
                  />
                  <p className='uppercase ml-2'>Thanh Toán khi nhận hàng</p>
                </div>

                {/* Thẻ 2 */}
                <div
                  onClick={() => handleClick(2)}
                  className={`flex items-center w-full p-4 cursor-pointer ${selectedOption === 2 ? 'border-2 border-blue-500' : ''}`}
                >
                  <img
                    src={'https://aobongda.net/Css/Pic/freeShip.png'}
                    width={55}
                    height={55}
                    className="object-cover rounded"
                  />
                  <p className='uppercase ml-2'>Thanh Toán Qua ngân hàng</p>
                </div>
              </div>
            </Form.Item>

            <div className="flex justify-between">
              <Button type="default" className="uppercase !bg-blue-500 text-white border-none rounded-none hover:bg-blue-700" >Tiếp tục mua hàng</Button>
              <Button type="primary" className="uppercase !bg-blue-500 text-white border-none rounded-none hover:bg-blue-700" htmlType="submit">
                Hoàn tất đơn hàng
              </Button>
            </div>
          </Form>
        </div>

        <div className="bg-white shadow-md rounded-md mt-2">
          <div>
            <h3 className="text-lg bg-zinc-200 font-semibold mb-2 pl-4 rounded">Giỏ Hàng Của Bạn</h3>
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center mb-4">
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

                  {/* Thẻ 2: Thông tin sản phẩm */}
                  <div className="w-9/12 flex flex-col">
                    <span className="font-semibold text-lg block">{item.name}</span>
                    <span className="text-sm text-gray-500 block">{item.category} : {item.size}</span>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="font-bold text-gray-500">
                        <span className="font-bold text-lg"> {item.price.toLocaleString()}</span>
                        <span className="text-sm font-semibold">
                          <sup className="text-xs">VND</sup>
                        </span>
                      </span>
                      <span className="text-xs text-gray-500">  X  </span>

                      <Input
                        type="number"
                        className="w-10 p-1 border rounded text-center"
                        value={quantities[item.id] || item.quantity} // Đảm bảo nếu không có giá trị thì lấy giá trị mặc định từ item
                        onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                      />

                      <span className="text-gray-500 font-bold text-lg">
                        {(item.price * (quantities[item.id] || item.quantity)).toLocaleString()}             <span className="text-sm font-semibold">
                          <sup className="text-xs">VND</sup>
                        </span>
                      </span>
                      <DeleteOutlined className="text-red-500 cursor-pointer block" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Áp dụng voucher */}
          <div className="mt-6">
            <Button type="default" className="uppercase !bg-blue-500 text-white border-none rounded-none !hover:bg-blue-700" block>
              Áp dụng voucher của shop
            </Button>
          </div>

          {/* Tổng cộng */}
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
