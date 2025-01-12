import { createFileRoute } from '@tanstack/react-router'
import { Button, Col, Form, Input, Row, Select, Space } from 'antd'
import { Option } from 'antd/es/mentions'

export const Route = createFileRoute('/_public/user/Checkout')({
  component: RouteComponent,
})

function RouteComponent() {
    return (
        
    <div className="">
             <div className="bg-gray-200 p-4">
          <p className="text-gray-600 text-sm">Trang chủ / CheckOut </p>
        </div>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl flex p-4 border border-gray-300 rounded-lg bg-white">
        {/* Form Giao hàng */}
        <div className="w-2/3 p-6 mr-4">
          <h2 className="text-xl font-semibold text-center mb-6 uppercase">Thông tin giao hàng</h2>

          <Form
            layout="vertical"
            onFinish={values => console.log(values)}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="fullName"
                  rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                >
                  <Input 
                    placeholder="Họ và Tên *" 
                    className="text-black"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phoneNumber"
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                  <Input 
                    placeholder="Số Điện Thoại *"
                    className="text-black"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="city"
                  rules={[{ required: true, message: 'Vui lòng chọn thành phố!' }]}
                >
                  <Select placeholder="Thành phố *" className="text-black">
                    <Option value="hanoi">Hà Nội</Option>
                    <Option value="hochiminh">Hồ Chí Minh</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="district"
                  rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
                >
                  <Select placeholder="Quận/Huyện" className="text-black">
                    <Option value="caugiay">Cầu Giấy</Option>
                    <Option value="tanbinh">Tân Bình</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="commune"
                  rules={[{ required: true, message: 'Vui lòng chọn xã!' }]}
                >
                  <Select placeholder="Xã *" className="text-black">
                    <Option value="mydinh">Mỹ Đình</Option>
                    <Option value="phuoclong">Phước Long</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ nhận hàng!' }]}
            >
              <Input.TextArea placeholder="Địa chỉ nhận hàng *" rows={4} className="text-black" />
            </Form.Item>

            <Form.Item
              name="notes"
            >
              <Input.TextArea placeholder="Ghi chú giao hàng" rows={4} className="text-black" />
            </Form.Item>

            <h2 className="text-xl font-semibold text-center mb-6 uppercase">Phương Thức Thanh TOÁN</h2>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" className="mt-4">
                  Gửi
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="w-1/3 p-6">
          <h3 className="text-lg font-semibold mb-4">Thông tin sản phẩm</h3>
          <div className="mb-4">
            <h4 className="font-medium">Tên sản phẩm:</h4>
            <p>Điện thoại iPhone 13 Pro</p>
          </div>
          <div className="mb-4">
            <h4 className="font-medium">Số lượng:</h4>
            <p>2</p>
          </div>
          <div className="mb-4">
            <h4 className="font-medium">Giá:</h4>
            <p>30.000.000 VND</p>
          </div>
          <div className="mb-4">
            <h4 className="font-medium">Tổng tiền:</h4>
            <p>60.000.000 VND</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
