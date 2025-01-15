
import { createFileRoute } from "@tanstack/react-router";
import { Button, Card, Col, Divider, Image, Row } from "antd";
import productExample from "../../assets/product-example.png";
import { useState } from "react";
import { MessageOutlined, ShoppingCartOutlined } from "@ant-design/icons";

export const Route = createFileRoute("/_public/product/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedSizeInfo, setSelectedSizeInfo] = useState(null);
  const handleSizeButtonClick = (size: any) => {
    setSelectedSizeInfo(size); // Cập nhật kích thước được chọn vào state
  };
  const product = {
    id: 1,
    name: "Áo Bóng Đá Đội Tuyển Bồ Đào Nha Đen Loang 2024-2025",
    description: "Description for Product A",
    categoryID: 101,
    categoryName: "Category 1",
    status: "active",
    mainImg: {
      id: 1,
      name: "main_image_A.jpg",
      path: "/images/products/main_image_A.jpg"
    },
    secondaryPhotos: [
      {
        id: 1,
        name: "secondary_image_A1.jpg",
        path: "/images/products/secondary_image_A1.jpg"
      },
      {
        id: 2,
        name: "secondary_image_A2.jpg",
        path: "/images/products/secondary_image_A2.jpg"
      }
    ],
    materials: [
      {
        materialsID: 201,
        materialsNAME: "Hàng Thun Lạnh",
        price: 300000,
        Size: [
          { SizeID: 303, sizeName: "X", quantity: 5 },
          { SizeID: 303, sizeName: "M", quantity: 5 },
          { SizeID: 303, sizeName: "L", quantity: 5 },
          { SizeID: 304, sizeName: "XL", quantity: 7 }
        ]
      },
      {
        materialsID: 202,
        materialsNAME: "Material 2",
        price: 700000,
        Size: [
          { SizeID: 303, sizeName: "X", quantity: 5 },
          { SizeID: 303, sizeName: "M", quantity: 5 },
          { SizeID: 303, sizeName: "L", quantity: 5 },
          { SizeID: 304, sizeName: "XL", quantity: 7 }
        ]
      },
      {
        materialsID: 202,
        materialsNAME: "Material 3",
        price: 700000,
        Size: [
          { SizeID: 303, sizeName: "X", quantity: 0 },
          { SizeID: 303, sizeName: "M", quantity: 5 },
          { SizeID: 303, sizeName: "L", quantity: 5 },
          { SizeID: 304, sizeName: "XL", quantity: 7 }
        ]
      }
    ]
  };
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<{ sizeName: string, quantity: number }[]>([]);

  // Hàm xử lý khi nhấn vào button
  const handleButtonClick = (material: any, index: number) => {
    setSelectedPrice(material.price);
    setSelectedMaterial(material.materialsNAME);
    setSelectedButton(index);
    setSelectedSize(material.Size); // Lưu lại thông tin Size của sản phẩm đã chọn
  };

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-y-4 mt-10">
      <div className="bg-gray-200 p-4">
        <p className="text-gray-600 text-sm">Trang chủ / {product.name}</p>
      </div>

      <Row>
        <Col span={8}>
          <Image src={productExample} preview={true} />
        </Col>

        <Col span={16}>
          <Card
            className="w-full"
          >
            <div className="flex flex-col gap-y-4">
              <p className="uppercase text-xl font-semibold tracking-wide">{product.name}</p>
              <p className="font-semibold text-red-500 text-xl">
                {selectedPrice ? selectedPrice.toLocaleString() + "₫" : "120.000 đ"}
              </p>

              {selectedMaterial && (
                <p className="text-xl font-semibold tracking-wide text-gray-700">
                  Bạn Đã Chọn: {selectedMaterial}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {product.materials.map((material, index) => (
                  <div key={index} className="relative">
                    <Button
                      className={`!bg-white !text-black font-bold w-[150px] h-[60px] flex flex-col justify-center items-center hover:!bg-[#FFCCFF] hover:!text-white 
                          ${selectedButton === index ? "!bg-[rgb(241,227,245)] border-[1px] !border-[rgb(106,181,250)]" : ""}`} // Add background and border on click
                      onClick={() => handleButtonClick(material, index)}
                    >
                      <span className="text-black font-semibold tracking-wide">{material.materialsNAME}</span>
                      <span className="text-red-500 font-semibold tracking-wide">{material.price.toLocaleString()}₫</span>
                    </Button>

                  </div>
                ))}

              </div>
              <div>

                Kích Thước Đã Chọn : X
                <div className="mt-2">
                  <Button className="!bg-[#ffffff] border-2 border-blue-500 py-6 px-10  text-black text-lg ">
                    <span className="text-black"> X </span>
                  </Button>
                  <Button className="!bg-[#ffffff] border-2 border-blue-500 py-6 px-10 ml-3 text-black text-lg ">
                    <span className="text-black"> Y </span>
                  </Button>
                  <Button className="!bg-[#ffffff] border-2 border-[#cccccc] py-6 px-10 ml-3 text-black text-lg active:border-blue-500 ">
                    <span className="text-black"> Z </span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4">
                  <Button className="!bg-[#312783] py-5 px-10">
                    <p className="font-bold">MUA NGAY</p><ShoppingCartOutlined className="cursor-pointer" />
                  </Button>
                </div>
                <div className="flex items-center">
                  <Image
                    src="https://png.pngtree.com/png-clipart/20190613/original/pngtree-messenger-logo-icon-png-image_3595693.jpg"
                    width={'50px'}
                    height={'50px'}
                    preview={false} ></Image>
                  <div className="mess_tuvan">
                    <a className="mess" target="_blank" href="https://www.messenger.com/t/1847033885584162/?messaging_source=source%3Apages%3Amessage_shortlink&amp;source_id=1441792&amp;recurring_notification=0" title="Nhắn tin ngay">Nhắn tin ngay</a>
                    <div className="tuvan">
                      <span>Tư vấn mua hàng</span>
                      <a href="tel:0989.248.835" title="Tư vấn mua hàng" className="text-red-500"> 0989.248.835</a> -
                      <a href="tel:0943.039.054" title="Tư vấn mua hàng" className="text-red-500"> 0943.039.054</a>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Divider className="mt-[50px]" orientation="center">
            <p className="uppercase font-sans text-2xl">Thông tin sản phẩm</p>
          </Divider>
          <p className="uppercase font-sans text-xl text-center">
            Áo Bóng Đá Đội Tuyển Bồ Đào Nha Đen Loang 2024-2025
          </p>
          <p className="text-xl mt-3">1. Thông tin sản phẩm</p>
          <p>
            <br />
            - Chất liệu: Thun lạnh
            <br />
            <br />
            - Màu sắc: Đen Loang
            <br />
            <br />
            - Size: S, M, L, XL, XXL, XXXL
            <br />
            <br />
            - Xuất xứ: Việt Nam
            <br />
            <br />
            - Thương hiệu: Sport Store
            <br />
            <br />
            - Sản phẩm chính hãng
            <br />
            <br />
            - Bảo hành: 1 năm
          </p>
          <div className="flex justify-center mt-4">
            <img
              src="https://aobongda.net/Pic/images/z6229647985275_376aa55c23520d6f4e8d863ca23999ac_11zon.webp"
              alt="Áo Bóng Đá Đội Tuyển Bồ Đào Nha"
            />
          </div>
          <p className="text-xl mt-3">2. HƯỚNG DẪN CHỌN SIZE</p>

          <p>
            <br />
            -Sản phẩm có sẵn các kích thước từ S đến XXL, phù hợp với mọi vóc dáng người mặc
            <br />
          </p>
          <div className="flex justify-center mt-4">
            <img
              src="https://aobongda.net/Pic/images/z5714553089234_818574dcd013573488de4b008ea7076f.webp"
              alt="Áo Bóng Đá Đội Tuyển Bồ Đào Nha"
            />
          </div>
          <p className="text-xl mt-3">3. HƯỚNG DẪN BẢO QUẢN</p>

          <p>
            <br />
            - Không sử dụng chất tẩy
            <br />
            <br />
            - Lật mặt trái trước khi giặt để màu sắc được luôn như mới
            <br />
            <br />
            - Ủi mặt trái của áo ở nhiệt độ thấp để bảo vệ chất liệu và màu sắc
            <br />
            <br />
            - Giặt tay hoặc giặt máy ở chế độ nhẹ, với nước lạnh
            <br />
            <br />
            - Không phơi trực tiếp dưới ánh nắng mặt trời
            <br />
          </p>
          <p className="text-xl mt-3">LƯU Ý:</p>

          <p>
            <br />
            - Đổi trả áo bóng đá trong vòng 7 ngày nếu sản phẩm có lỗi sản xuất hoặc không đúng mô tả
            <br />
            <br />
            - Thời gian để chúng tôi xử lý yêu cầu đổi trả sản phẩm áo đá bóng có thể mất từ 3-5 ngày làm việc
            <br />
            <br />
            - Tính từ ngày chúng tôi nhận lại được sản phẩm hoàn trả từ bạn
            <br />
            <br />
            - Không đổi trả đối với áo đã qua in nếu không có lỗi của NSX
            <br />
          </p>

          <p className="text-xl mt-3">Tìm Hiểu Thêm:</p>

          <p>
            <br />
            Hotline: 0989.248.835 - 094.303.9054
            <br />
            <br />
          </p>
        </Col>
      </Row>
    </div>
  );
}