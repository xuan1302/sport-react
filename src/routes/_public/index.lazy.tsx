import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'

import { Button, Carousel, Divider, Image } from 'antd'
import heroBannerImage from '../../assets/hero-banner.png'
import section2 from '../../assets/section-2.png'
import section3 from '../../assets/section-3.png'
import section4 from '../../assets/section-4.png'

import termBanner from '../../assets/term-banner.png'

import { LeftOutlined, RightOutlined, StarFilled } from '@ant-design/icons'
import customerExample from '../../assets/customer-example.png'
import axiosClient from '../../api/axiosClient'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

export const Route = createLazyFileRoute('/_public/')({
  component: RouteComponent,
})
import axios from 'axios'

const adminProduct = {
  listProduct(): Promise<unknown> {
    const url = '/v1/sporty-shop/auth/home'
    return axiosClient.get(url)
  },
}

interface Price {
  materialName: string
  price: number
}

interface Product {
  id: number
  productName: string
  url: string
  prices: Price[]
}

interface Category {
  categoryName: string
  products: Product[]
}

interface ApiResponse {
  status: number
  message: string
  data: Category[]
}

function RouteComponent() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Category[]>([]);
  const dispatch = useDispatch()
  useEffect(() => {
    /*
      try {
        const response = await adminProduct.listProduct();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching", error);
      }
    
    */ 
    axios
      .get('/product.json')
      .then((response) => {
        console.log("Response" + response)
        setProducts(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        alert('Something went wrong!')
      })
  }, [])

  const chunkProducts = (arr: Product[], size: number): Product[][] => {
    const result: Product[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };
  return (
    <div className="flex flex-col">
      <div className="img-wid100">
        <Image src={heroBannerImage} preview={false} />
      </div>

      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div className="w-[320px]">
            <Image
              width={320}
              height={250}
              src={
                'https://png.pngtree.com/thumb_back/fw800/background/20230912/pngtree-sportswear-image_13269715.jpg'
              }
              preview={true}
            />
          </div>
          <div className="w-[320px] h-[200px]">
            <Image width={320} height={250} src={section2} preview={true} />
          </div>
          <div className="w-[320px]">
            <Image width={320} height={250} src={section3} preview={true} />
          </div>
          <div className="w-[320px]">
            <Image width={320} height={250} src={section4} preview={true} />
          </div>
          </div>
                <div className="max-w-[1450px] mx-auto w-full">
          </div>

            <div>
      {products.map((category, index) => (
        <div key={index}>
          <Divider className="py-5">
            <p>{category.categoryName}</p>
          </Divider>

          <div className="max-w-[1450px] mx-auto w-full">
          <Carousel
           arrows
           infinite={false}
          >
          {chunkProducts(category.products, 4).map((chunk, chunkIndex) => (
            <div key={chunkIndex} className="inline-block w-full">
              <div className="grid grid-cols-4 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
                {chunk.map((product) => (
                  <div key={product.id} className="relative group w-full max-w-[320px] mx-auto">
                    <Image
                      src={'https://dongphuchaianh.vn/wp-content/uploads/2022/03/ao-quan-the-thao-dep.jpg'}
                      alt={product.productName}
                      className="w-full h-auto"
                      width={320}
                      height={320}
                    />

                    <p className="text-[#262626] text-[11px] uppercase mt-2">
                      {category.categoryName}
                    </p>
                    <p className="text-[#105458] hover:underline cursor-pointer">
                      {product.productName}
                    </p>
                    <div className="flex flex-col mt-2">
                      {product.prices.map((price, index) => (
                        <div key={index} className="w-full py-1">
                          <p className="font-semibold">
                            {price.price} VND - {price.materialName}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
            </Carousel>
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
          {new Array(3).fill(0).map((_, index) => (
            <div key={index} className="w-full">
              <Image
                src={
                  'https://vcdn1-thethao.vnecdn.net/2024/02/11/z5147422459305-13b8c0052f20e07-1139-1999-1707610042.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=mqgt3BRPcNZPr2G0ufJr6A'
                }
                preview={false}
              />
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
  )
}
