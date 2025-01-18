import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

import { Carousel, Divider, Image } from "antd";
import heroBannerImage from "../../assets/hero-banner.png";
import section1 from "../../assets/section-1.png";
import section2 from "../../assets/section-2.png";
import section3 from "../../assets/section-3.png";
import section4 from "../../assets/section-4.png";

import blogImage from "../../assets/blog-image.png";
import termBanner from "../../assets/term-banner.png";

import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import homeApi from "../../api/home/homeApi";
import customerExample from "../../assets/customer-example.png";

export const Route = createLazyFileRoute("/_public/")({
  component: RouteComponent,
});

function RouteComponent() {
  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN");
  };
  const navigate = useNavigate();
  const [outstandingProducts, setOutstandingProducts] = useState([]);
  const [dataProduct2, setDataProduct2] = useState([]);
  const [dataProduct3, setDataProduct3] = useState([]);
  const [dataProduct4, setDataProduct4] = useState([]);
  const [dataProduct5, setDataProduct5] = useState([]);
  useEffect(() => {
    const fetchApis = async () => {
      try {
        const [dataOutstandingProducts, data2, data3, data4, data5] =
          await Promise.all([
            homeApi.getOutstandingProduct(),
            homeApi.getTopProduct({ type: "national_team_shirts" }),
            homeApi.getTopProduct({ type: "club_shirts" }),
            homeApi.getTopProduct({ type: "soccer_shoes" }),
            homeApi.getTopProduct({ type: "accessories" }),
          ]);
        setOutstandingProducts(dataOutstandingProducts?.list);
        setDataProduct2(data2?.list);
        setDataProduct3(data3?.list);
        setDataProduct4(data4?.list);
        setDataProduct5(data5?.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchApis();
  }, []);
  const heroBannerImages = [
    "https://aobongda.net/pic/banner/qua-bong-da-dong-luc_5523_7493_HasThumb_Thumb.webp", // Đường dẫn ảnh
    "https://aobongda.net/pic/banner/banner-tet-1_5662_HasThumb_Thumb.webp",
    "https://aobongda.net/pic/banner/baner-pickleball_11zon-2_5874_HasThumb_Thumb.webp",
    "https://aobongda.net/pic/banner/doi-tac_5423_HasThumb_Thumb.webp",
    "https://aobongda.net/pic/banner/untitled-design-1_9940_HasThumb_Thumb.webp",
  ];

  return (
    <div className="flex flex-col">
      <div className="img-wid100">
        <Carousel autoplay>
          {heroBannerImages.map((src, index) => (
            <div key={index} className="flex justify-center">
              <Image src={src} alt={`Hero banner ${index + 1}`} height={600} />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="max-w-[1200px] mx-auto w-full">
        <div className="mt-[50px] grid grid-cols-4 gap-4 w-full">
          <div className="w-[280px]">
            <Image height={'215px'} src={'https://cuanhuanamwindows.com/wp-content/uploads/2024/08/ligue-1-co-bao-nhieu-vong-dau-lich-su-thu-vi-cua-ligue-1-10471.jpg'} preview={true} />
          </div>
          <div className="w-[280px]">
            <Image  height={'215px'}   src={'https://icdn.24h.com.vn/upload/1-2020/images/2020-03-14/NHA-bi-hoan-hay-bi-huy-Liverpool-vo-dich-luon-he-lo-ngay-phan-quyet-1-660-1584149293-717-width660height440.jpg'} preview={true} />
          </div>
          <div className="w-[280px]">
            <Image src={section3} preview={true} />
          </div>
          <div className="w-[280px]">
            <Image src={section4} preview={true} />
          </div>
        </div>
        <div>
          <div>
            <Divider className="py-5">
              <h2>Sản phẩm nổi bật</h2>
            </Divider>

            <div className="max-w-[1450px] mx-auto w-full">
              <div className="inline-block w-full">
                <div className="grid grid-cols-4 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
                  {outstandingProducts?.map((product, index) => (
                    <div
                      key={index}
                      className="relative group w-full max-w-[320px] mx-auto"
                    >
                      <Image
                        src={product.url}
                        alt={product.productName}
                        className="w-full h-auto"
                        width={300}
                        height={320}
                      />
                      <p
                        className="text-[#105458] hover:underline cursor-pointer"
                        onClick={() =>
                          navigate({
                            to: "/product/$id",
                            params: {
                              id: product.id,
                            },
                          })
                        }
                      >
                        <p className="text-[#262626] text-[11px] uppercase mt-2">
                          Sản phẩm nổi bật
                        </p>
                        {product.productName}
                      </p>
                      <div className="flex flex-col mt-2">
                        {product.prices.map((price, index) => (
                          <div key={index} className="w-full py-1">
                            <p className="font-semibold">
                              <span className="text-red-500">
                                {formatCurrency(price.price)}{" "}
                              </span>
                              VND - {price.materialName}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider className="py-5">
          <p>Áo đội tuyển quốc gia</p>
        </Divider>

        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {dataProduct2?.map((product, index) => (
            <div key={index} className="w-[280px]">
              <Image
                src={product.url}
                preview={false}
                width={300}
                height={320}
              />
              <p
                className="text-[#105458] hover:underline cursor-pointer"
                onClick={() =>
                  navigate({
                    to: "/product/$id",
                    params: {
                      id: product.id,
                    },
                  })
                }
              >
                <p className="text-[#262626] text-[11px] uppercase mt-2">
                  Áo đội tuyển quốc gia
                </p>
                {product.productName}
              </p>

              <div className="flex flex-col mt-2">
                {product.prices.map((price, index) => (
                  <div key={index} className="w-full py-1">
                    <p className="font-semibold">
                      <span className="text-red-500">
                        {formatCurrency(price.price)}{" "}
                      </span>
                      VND - {price.materialName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Divider className="py-5">
          <p>Áo câu lạc bộ</p>
        </Divider>

        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {dataProduct3?.map((product, index) => (
            <div key={index} className="w-[280px]">
              <Image
                src={product.url}
                preview={false}
                width={300}
                height={320}
              />
              <p
                className="text-[#105458] hover:underline cursor-pointer"
                onClick={() =>
                  navigate({
                    to: "/product/$id",
                    params: {
                      id: product.id,
                    },
                  })
                }
              >
                <p className="text-[#262626] text-[11px] uppercase mt-2">
                  Áo câu lạc bộ
                </p>
                {product.productName}
              </p>

              <div className="flex flex-col mt-2">
                {product.prices.map((price, index) => (
                  <div key={index} className="w-full py-1">
                    <p className="font-semibold">
                      <span className="text-red-500">
                        {formatCurrency(price.price)}{" "}
                      </span>
                      VND - {price.materialName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Divider className="py-5">
          <p>Giày thể thao</p>
        </Divider>

        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {dataProduct4?.map((product, index) => (
            <div key={index} className="w-[280px]">
              <Image
                src={product.url}
                preview={false}
                width={300}
                height={320}
              />
              <p
                className="text-[#105458] hover:underline cursor-pointer"
                onClick={() =>
                  navigate({
                    to: "/product/$id",
                    params: {
                      id: product.id,
                    },
                  })
                }
              >
                <p className="text-[#262626] text-[11px] uppercase mt-2">
                  Giày thể thao
                </p>
                {product.productName}
              </p>

              <div className="flex flex-col mt-2">
                {product.prices.map((price, index) => (
                  <div key={index} className="w-full py-1">
                    <p className="font-semibold">
                      <span className="text-red-500">
                        {formatCurrency(price.price)}{" "}
                      </span>
                      VND - {price.materialName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Divider className="py-5">
          <p>Phụ kiện thể thao</p>
        </Divider>

        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {dataProduct5?.map((product, index) => (
            <div key={index} className="w-[280px]">
              <Image
                src={product.url}
                preview={false}
                width={300}
                height={320}
              />
              <p
                className="text-[#105458] hover:underline cursor-pointer"
                onClick={() =>
                  navigate({
                    to: "/product/$id",
                    params: {
                      id: product.id,
                    },
                  })
                }
              >
                <p className="text-[#262626] text-[11px] uppercase mt-2">
                  Phụ kiện thể thao
                </p>
                {product.productName}
              </p>

              <div className="flex flex-col mt-2">
                {product.prices.map((price, index) => (
                  <div key={index} className="w-full py-1">
                    <p className="font-semibold">
                      <span className="text-red-500">
                        {formatCurrency(price.price)}{" "}
                      </span>
                      VND - {price.materialName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[50px]">
          <Image src={termBanner} preview={false} />
        </div>

        <Divider className="py-5">
          <p>Blog thể thao</p>
        </Divider>

        <div className="grid grid-cols-3 gap-4">
          <div className="w-full">
            <Image
              src={
                "https://cdn.tuoitre.vn/thumb_w/480/471584752817336320/2023/12/30/9-17039030422311436775144.jpg"
              }
              preview={false}
              width={"360px"}
              height={"290px"}
            />
            <p className="text-[#105458] hover:underline cursor-pointer text-center line-clamp-1">
              Viêt Nam Vô Địch – Sportshop.vn
            </p>

            <p className="text-center line-clamp-1">
              Nhịp thở chính xác của bạn sẽ phụ thuộc vào mức độ khó hay dễ ...
            </p>
          </div>
          <div className="w-full">
            <Image
              src={
                "https://th.bing.com/th/id/R.13f2201e80106050f1201f711501011c?rik=r3kgL98pZ5TV9A&riu=http%3a%2f%2fphotocdn.sohu.com%2f20131110%2fImg389866166.jpg&ehk=CfQCjCTbi62pS4%2fGmZyg5korwB6YlwmkpEJtGCQ4iAc%3d&risl=&pid=ImgRaw&r=0 "
              }
              width={"360px"}
              height={"290px"}
              preview={false}
            />
            <p className="text-[#105458] hover:underline cursor-pointer text-center line-clamp-1">
              Dành Chức Vô Địch Đầy Thuyết phục – Sportshop.vn
            </p>

            <p className="text-center line-clamp-1">
              Nhịp thở chính xác của bạn sẽ phụ thuộc vào mức độ khó hay dễ ...
            </p>
          </div>
          <div className="w-full">
            <Image
              src={
                "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              width={"360px"}
              height={"290px"}
              preview={false}
            />
            <p className="text-[#105458] hover:underline cursor-pointer text-center line-clamp-1">
              Nên chạy với nhịp thở nào để không mệt – Sportshop.vn
            </p>

            <p className="text-center line-clamp-1">
              Nhịp thở chính xác của bạn sẽ phụ thuộc vào mức độ khó hay dễ ...
            </p>
          </div>
        </div>

        <Divider className="py-5">
          <p>Đánh giá khách hàng</p>
        </Divider>

        <div className="grid grid-cols-3 gap-4 pb-10">
          <div className="flex flex-col items-center w-full p-4 border rounded-md shadow-md gap-y-4 border-neutral-200">
            <Image
              src={customerExample}
              preview={false}
              width={120}
              height={120}
            />

            <div className="flex items-center justify-center">
              {new Array(5).fill(0).map((_, index) => (
                <StarFilled key={index} className="text-yellow-400" />
              ))}
            </div>

            <p className="text-center">
              ” Em là một new Runner, mới chạy bộ được khoảng vài tháng nay. Ban
              đầu cũng không để ý nhiều đến cách chạy nên cứ ra đường là cắm đầu
              cắm cổ chạy nên rất hay bị chấn thương. Một ngày em thấy trên
              Fanpage của Sportshop hướng dẫn cách hồi phục chấn thương. Em đã
              mạnh dạn inbox và được admin chỉ dẫn nhiệt tình tư cách khởi động
              đến làm thế nào để chỉnh dáng chạy rồi cách chọn giày, quần áo
              chạy bộ… – những điều ma trước kia em không hay để ý. Còn các sản
              phẩm của Sportshop thì chất lượng cực tốt và em thấy được sự đặc
              biệt thoải mái mỗi khi chạy bộ. “
            </p>

            <p className="font-semibold">
              Hoàng Kiều Oanh / Nhân Viên Văn Phòng
            </p>
          </div>
          <div className="flex flex-col items-center w-full p-4 border rounded-md shadow-md gap-y-4 border-neutral-200">
            <Image
              src={
                "https://icdn.24h.com.vn/upload/4-2022/images/2022-11-25/ngoccham-1669387549-96-width660height523.jpg"
              }
              preview={false}
              width={120}
              height={120}
              className="rounded-[50%]"
            />

            <div className="flex items-center justify-center">
              {new Array(5).fill(0).map((_, index) => (
                <StarFilled key={index} className="text-yellow-400" />
              ))}
            </div>

            <p className="text-center">
              “Là một người yêu thích các môn thể thao ngoài trời, tôi đã thử
              qua rất nhiều sản phẩm. Nhưng kể từ khi biết đến Sportshop, tôi
              hoàn toàn bị thuyết phục. Sản phẩm không chỉ chất lượng mà đội ngũ
              nhân viên còn rất tận tình tư vấn. Những đôi giày được đề xuất
              giúp tôi chạy thoải mái hơn rất nhiều, đặc biệt là khi tham gia
              các buổi marathon dài hơi – những điều ma trước kia em không hay
              để ý. Còn các sản phẩm của Sportshop thì chất lượng cực tốt và em
              thấy được sự đặc biệt thoải mái mỗi khi chạy bộ..”
            </p>

            <p className="font-semibold">Nguyễn Minh Đức / Nhân Viên IT</p>
          </div>
          <div className="flex flex-col items-center w-full p-4 border rounded-md shadow-md gap-y-4 border-neutral-200">
            <Image
              src={
                "https://cdn.tuoitre.vn/thumb_w/480/471584752817336320/2023/12/30/9-17039030422311436775144.jpg"
              }
              preview={false}
              width={120}
              height={120}
              className="rounded-[50%]"
            />

            <div className="flex items-center justify-center">
              {new Array(4).fill(0).map((_, index) => (
                <StarFilled key={index} className="text-yellow-400" />
              ))}
              <StarOutlined className="text-yellow-400" />
            </div>

            <p className="text-center">
              “Trước đây tôi không quan tâm nhiều đến việc lựa chọn quần áo thể
              thao. Sau khi trải nghiệm tại Sportshop, tôi nhận thấy sự khác
              biệt rõ rệt. Nhân viên tư vấn chi tiết, sản phẩm cực kỳ bền và
              thoải mái. Mặc dù giá cả hơi cao một chút, nhưng rất đáng đồng
              tiền bát gạo.– những điều ma trước kia em không hay để ý. Còn các
              sản phẩm của Sportshop thì chất lượng cực tốt và em thấy được sự
              đặc biệt thoải mái mỗi khi chạy bộ..”
            </p>

            <p className="font-semibold">Lê Thị Phương / Giáo Viên</p>
          </div>
        </div>
      </div>
    </div>
  );
}
