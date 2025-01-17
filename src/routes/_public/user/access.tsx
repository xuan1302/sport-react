import { ShoppingCartOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Table } from "antd";

export const Route = createFileRoute("/_public/user/access")({
  component: RouteComponent,
});

function RouteComponent() {
  const customerInfo = {
    orderId: "638695555002",
    name: "Vũ Mai",
    phone: "0968615771",
    address: "Mỹ Đức - Hà Nội, Xã Mỹ Đức, Mỹ Đức, Hà Nội",
    paymentMethod: "Thanh toán chuyển khoản",
  };

  const orderItems = [
    {
      key: "1",
      product: "Áo Bóng Đá Câu Lạc Bộ Miami Trắng Cổ Hồng 2024-2025 (Size S)",
      price: "80.000₫",
      quantity: 1,
      image: "/path-to-image1.jpg",
    },
    {
      key: "2",
      product:
        "Áo Bóng Đá Câu Lạc Bộ Real Madrid Trẻ Em Trắng Hồng 2024-2025 (Size 5)",
      price: "100.000₫",
      quantity: 1,
      image: "/path-to-image2.jpg",
    },
    {
      key: "3",
      product: "Áo Bóng Đá Đội Tuyển Quốc Gia Đen 2024-2025 (Size S)",
      price: "80.000₫",
      quantity: 1,
      image: "/path-to-image3.jpg",
    },
    {
      key: "4",
      product: "Áo Thể Thao Nam Beyono CB06 (Size M Màu Xanh Lam)",
      price: "180.000₫",
      quantity: 1,
      image: "/path-to-image4.jpg",
    },
  ];
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (text: any, record: any) => (
        <div className="flex items-center gap-4">
          <img
            src={record.image}
            alt={text}
            className="w-16 h-16 object-cover rounded"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];
  return (
    <div>
      {" "}
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ShoppingCartOutlined
              style={{ fontSize: "60px" }}
              className="text-orange-500"
            />
          </div>
          <h1 className="text-2xl font-bold text-orange-500">
            Gửi đơn hàng thành công
          </h1>
          <p className="text-gray-600">
            Cảm ơn quý khách đã mua hàng tại Aobongda.net. <br />
            Nếu bạn có bất kỳ thắc mắc hay câu hỏi nào vui lòng gọi điện để được
            tư vấn: <span className="text-red-500 font-bold">0977500358</span>
          </p>
        </div>

        {/* Thông tin khách hàng */}
        {/* <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">THÔNG TIN KHÁCH HÀNG</h2>
      <table className="w-full text-gray-700">
        <tbody>
          <tr>
            <td className="font-semibold">Mã số đơn hàng</td>
            <td>: {customerInfo.orderId}</td>
          </tr>
          <tr>
            <td className="font-semibold">Họ và tên</td>
            <td>: {customerInfo.name}</td>
          </tr>
          <tr>
            <td className="font-semibold">Số điện thoại</td>
            <td>: {customerInfo.phone}</td>
          </tr>
          <tr>
            <td className="font-semibold">Địa chỉ</td>
            <td>: {customerInfo.address}</td>
          </tr>
          <tr>
            <td className="font-semibold">Hình thức thanh toán</td>
            <td>: {customerInfo.paymentMethod}</td>
          </tr>
        </tbody>
      </table>
    </div> */}

        {/* Thông tin đơn hàng */}
        {/* <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">THÔNG TIN ĐƠN HÀNG</h2>
      <Table
        columns={columns}
        dataSource={orderItems}
        pagination={false}
        bordered
      />
    </div> */}

        {/* Button */}
        <div className="text-center">
          <Button
            type="primary"
            size="large"
            className="bg-blue-500 hover:bg-blue-600"
          >
            MUA THÊM SẢN PHẨM KHÁC
          </Button>
        </div>
      </div>
    </div>
  );
}
