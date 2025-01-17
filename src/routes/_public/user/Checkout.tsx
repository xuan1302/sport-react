import {
  BankOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
  Menu,
  notification,
} from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { removeFromCart, updateQuantity } from "../../../store/cardSlice";
import homeApi from "../../../api/home/homeApi";
import { hideLoading, showLoading } from "../../../store/loadingSlice";
export const Route = createFileRoute("/_public/user/Checkout")({
  component: RouteComponent,
});
interface Product {
  id: number;
  productName: string;
  url: string;
  prices: Price[];
}

interface Price {
  materialName: string;
  price: number;
}

interface Location {
  code: string;
  name: string;
}
function RouteComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [wards, setWards] = useState<Location[]>([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

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
  const handleFinish = async (value: any) => {
    dispatch(showLoading());
    const data = {
      deliveryInformation: {
        fullName: value.fullName,
        phoneNumber: value.phone,
        provinceCode: value.province,
        districtCode: value.district,
        wardCode: value.ward,
        address: value.address,
        note: value.note,
      },
      totalPrice: totalPrice,
      paymentType: selectedOption,
      cartItems: cartItems?.map((item) => ({
        productId: item.id,
        materialId: item.materialId,
        sizeId: item.sizeId,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.totalPrice,
      })),
    };
    try {
      const checkout = await homeApi.checkout(data);
      console.log(checkout);
      if (checkout.paymentType === 1) {
        navigate({
          to: "/user/access",
        });
      }
      if (checkout.paymentType === 2) {
        window.location.href = checkout.message;
      }
    } catch (error) {
      notification.error({
        message: error.message || "Thanh toán thất bại",
        description: `Thất bại`,
      });
    } finally {
      dispatch(hideLoading());
    }
  };

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const totalPrice = cartItems.reduce((total, item) => {
    const quantity = quantities[item.id] || item.quantity; // Lấy số lượng từ state, nếu không có thì lấy từ giá trị mặc định
    return total + item.price * quantity;
  }, 0);

  const [selectedOption, setSelectedOption] = useState(1);

  const handleClick = (index: any) => {
    setSelectedOption(index);
  };

  const handleRemove = (data) => {
    dispatch(removeFromCart(data));
  };

  const handleQuantityChange = (id, quantity, materialId, sizeId) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity, materialId, sizeId }));
    }
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
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <div className="grid grid-cols-3 gap-4">
              <Form.Item
                label="Tỉnh/Thành phố"
                name="province"
                rules={[
                  { required: true, message: "Vui lòng chọn tỉnh/thành phố!" },
                ]}
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
                rules={[
                  { required: true, message: "Vui lòng chọn quận/huyện!" },
                ]}
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
                rules={[
                  { required: true, message: "Vui lòng chọn phường/xã!" },
                ]}
              >
                <Select
                  placeholder="Chọn phường/xã"
                  disabled={!selectedDistrict}
                >
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

            <Typography.Title level={5}>
              Phương thức thanh toán
            </Typography.Title>
            <Form.Item name="paymentMethod" initialValue="cod">
              <div className="flex w-full space-x-4">
                {/* Thẻ 1 */}
                <div
                  onClick={() => handleClick(1)}
                  className={`flex items-center w-full p-4 cursor-pointer ${selectedOption === 1 ? "border-2 border-blue-500" : ""}`}
                >
                  <img
                    src={"https://aobongda.net/Css/Pic/freeShip.png"}
                    width={55}
                    height={55}
                    className="object-cover rounded"
                  />
                  <p className="uppercase ml-2">Thanh Toán khi nhận hàng</p>
                </div>

                {/* Thẻ 2 */}
                <div
                  onClick={() => handleClick(2)}
                  className={`flex items-center w-full p-4 cursor-pointer ${selectedOption === 2 ? "border-2 border-blue-500" : ""}`}
                >
                  <img
                    src={"https://aobongda.net/Css/Pic/freeShip.png"}
                    width={55}
                    height={55}
                    className="object-cover rounded"
                  />
                  <p className="uppercase ml-2">Thanh Toán Qua ngân hàng</p>
                </div>
              </div>
            </Form.Item>

            <div className="flex justify-between">
              <Button
                type="default"
                className="uppercase !bg-blue-500 text-white border-none rounded-none hover:bg-blue-700"
              >
                Tiếp tục mua hàng
              </Button>
              <Button
                type="primary"
                className="uppercase !bg-blue-500 text-white border-none rounded-none hover:bg-blue-700"
                htmlType="submit"
              >
                Hoàn tất đơn hàng
              </Button>
            </div>
          </Form>
        </div>

        <div className="bg-white shadow-md rounded-md mt-2">
          <div>
            <h3 className="text-lg bg-zinc-200 font-semibold mb-2 pl-4 rounded">
              Giỏ Hàng Của Bạn
            </h3>
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex items-center mb-4"
              >
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
                        <span className="font-bold text-lg ">
                          {" "}
                          {item.price}
                        </span>
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
          </div>
          {/* Áp dụng voucher */}
          <div className="mt-6">
            <Button
              type="default"
              className="uppercase !bg-blue-500 text-white border-none rounded-none !hover:bg-blue-700"
              block
            >
              Áp dụng voucher của shop
            </Button>
          </div>

          {/* Tổng cộng */}
          <div className="mt-6 text-right">
            <Typography.Text strong>
              Tổng cộng: {totalPrice?.toLocaleString()} VND
            </Typography.Text>
            <Typography.Text type="secondary" className="block">
              Giá trên chưa bao gồm phí vận chuyển
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
}
