import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

import { Carousel, Divider, Image } from "antd";
import heroBannerImage from "../../assets/hero-banner.png";
import section1 from "../../assets/section-1.png";
import section2 from "../../assets/section-2.png";
import section3 from "../../assets/section-3.png";
import section4 from "../../assets/section-4.png";

import blogImage from "../../assets/blog-image.png";
import productExample from "../../assets/product-example.png";
import termBanner from "../../assets/term-banner.png";

import { StarFilled } from "@ant-design/icons";
import customerExample from "../../assets/customer-example.png";
import { makeID } from "../../utils/makeId";
import { useEffect, useState } from "react";
import homeApi from "../../api/home/homeApi";

export const Route = createLazyFileRoute("/_public/")({
  component: RouteComponent,
});

function RouteComponent() {
  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN");
  };
  const navigate = useNavigate();
  const [outstandingProducts, setOutstandingProducts] = useState([]);
  useEffect(() => {
    const fetchApis = async () => {
      try {
        const [dataOutstandingProducts] = await Promise.all([
          homeApi.getOutstandingProduct(),
        ]);
        setOutstandingProducts(dataOutstandingProducts?.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchApis();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="img-wid100">
        <Image src={heroBannerImage} preview={false} />
      </div>

      <div className="max-w-[1200px] mx-auto w-full">
        <div className="mt-[50px] grid grid-cols-4 gap-4 w-full">
          <div className="w-[280px]">
            <Image src={section1} preview={true} />
          </div>
          <div className="w-[280px]">
            <Image src={section2} preview={true} />
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
              <h2>Sản phẩm bán chạy</h2>
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
                        width={280}
                        height={280}
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
                        {product.productName}
                      </p>
                      <div className="flex flex-col mt-2">
                        {product.prices.map((price, index) => (
                          <div key={index} className="w-full py-1">
                            <p className="font-semibold">
                              {formatCurrency(price.price)} VND -{" "}
                              {price.materialName}
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
          <p>Đồ thể thao nam</p>
        </Divider>

        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className="w-[280px]">
              <Image src={productExample} preview={false} />

              <p className="text-[#262626] text-[11px] uppercase">
                Áo thể thao nam
              </p>

              <p
                className="text-[#105458] hover:underline cursor-pointer"
                onClick={() =>
                  navigate({
                    to: "/product/$id",
                    params: {
                      id: makeID(10),
                    },
                  })
                }
              >
                Quần chạy bộ Dài Nam MS277
              </p>

              <p className="font-semibold">299.000₫</p>
            </div>
          ))}
        </div>

        <Divider className="py-5">
          <p>Đồ thể thao nữ</p>
        </Divider>

        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className="w-[280px]">
              <Image src={productExample} preview={false} />

              <p className="text-[#262626] text-[11px] uppercase">
                Áo thể thao nam
              </p>

              <p
                className="text-[#105458] hover:underline cursor-pointer"
                onClick={() =>
                  navigate({
                    to: "/product/$id",
                    params: {
                      id: makeID(10),
                    },
                  })
                }
              >
                Quần chạy bộ Dài Nam MS277
              </p>

              <p className="font-semibold">299.000₫</p>
            </div>
          ))}
        </div>

        <Divider className="py-5">
          <p>Gel năng lượng</p>
        </Divider>

        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className="w-[280px]">
              <Image src={productExample} preview={false} />

              <p className="text-[#262626] text-[11px] uppercase">
                Áo thể thao nam
              </p>

              <p
                className="text-[#105458] hover:underline cursor-pointer"
                onClick={() =>
                  navigate({
                    to: "/product/$id",
                    params: {
                      id: makeID(10),
                    },
                  })
                }
              >
                Quần chạy bộ Dài Nam MS277
              </p>

              <p className="font-semibold">299.000₫</p>
            </div>
          ))}
        </div>

        <Divider className="py-5">
          <p>Phụ kiện thể thao</p>
        </Divider>

        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className="w-[280px]">
              <Image src={productExample} preview={false} />

              <p className="text-[#262626] text-[11px] uppercase">
                Áo thể thao nam
              </p>

              <p
                className="text-[#105458] hover:underline cursor-pointer"
                onClick={() =>
                  navigate({
                    to: "/product/$id",
                    params: {
                      id: makeID(10),
                    },
                  })
                }
              >
                Quần chạy bộ Dài Nam MS277
              </p>

              <p className="font-semibold">299.000₫</p>
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
          {new Array(3).fill(0).map((_, index) => (
            <div key={index} className="w-full">
              <Image src={blogImage} preview={false} />
              <p className="text-[#105458] hover:underline cursor-pointer text-center line-clamp-1">
                Nên chạy với nhịp thở nào để không mệt – Sportshop.vn
              </p>

              <p className="text-center line-clamp-1">
                Nhịp thở chính xác của bạn sẽ phụ thuộc vào mức độ khó hay dễ
                ...
              </p>
            </div>
          ))}
        </div>

        <Divider className="py-5">
          <p>Đánh giá khách hàng</p>
        </Divider>

        <div className="grid grid-cols-3 gap-4 pb-10">
          {new Array(3).fill(0).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full p-4 border rounded-md shadow-md gap-y-4 border-neutral-200"
            >
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
                ” Em là một new Runner, mới chạy bộ được khoảng vài tháng nay.
                Ban đầu cũng không để ý nhiều đến cách chạy nên cứ ra đường là
                cắm đầu cắm cổ chạy nên rất hay bị chấn thương. Một ngày em thấy
                trên Fanpage của Sportshop hướng dẫn cách hồi phục chấn thương.
                Em đã mạnh dạn inbox và được admin chỉ dẫn nhiệt tình tư cách
                khởi động đến làm thế nào để chỉnh dáng chạy rồi cách chọn giày,
                quần áo chạy bộ… – những điều ma trước kia em không hay để ý.
                Còn các sản phẩm của Sportshop thì chất lượng cực tốt và em thấy
                được sự đặc biệt thoải mái mỗi khi chạy bộ. “
              </p>

              <p className="font-semibold">
                Hoàng Kiều Oanh / Nhân Viên Văn Phòng
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
