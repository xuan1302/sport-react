import { createFileRoute, useNavigate } from '@tanstack/react-router'

import {  Button, Divider, Image, message, Pagination, Select } from "antd";
import section2 from "../../../assets/section-2.png";
import section3 from "../../../assets/section-3.png";
import section4 from "../../../assets/section-4.png";
import productExample from "../../../assets/product-example.png";
import { useEffect, useState } from 'react';
import { Option } from 'antd/es/mentions';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

export const Route = createFileRoute('/_public/user/Accessories')({
  component: RouteComponent,
})


function RouteComponent() {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const dispatch = useDispatch();
 
   const products: Product[]  = [
     { id: "1", name: "Quần chạy bộ Dài Nam MS277", price: "299.000₫", image: productExample },
     { id: "2", name: "Áo Thể Thao Nam MS124", price: "199.000₫", image: productExample },
     { id: "3", name: "Giày Thể Thao Nam MS856", price: "699.000₫", image: productExample },
     { id: "4", name: "Balo Thể Thao Nam MS498", price: "499.000₫", image: productExample },
     { id: "5", name: "Áo Khoác Thể Thao Nam MS302", price: "399.000₫", image: productExample },
     { id: "6", name: "Quần Thể Thao Nam MS150", price: "249.000₫", image: productExample },
     { id: "7", name: "Mũ Thể Thao Nam MS721", price: "129.000₫", image: productExample },
     { id: "8", name: "Kính Thể Thao Nam MS876", price: "349.000₫", image: productExample },
   ];
   const parsePrice = (price: string): number => {
    return parseInt(price.replace(/[^\d]/g, ''));
  };
  
   const sortedProducts = [...products].sort((a, b) => {
    const priceA = parsePrice(a.price);
    const priceB = parsePrice(b.price);
    if (sortOrder === 'asc') {
      return priceA - priceB; // Sắp xếp tăng dần
    } else {
      return priceB - priceA; // Sắp xếp giảm dần
    }
  });
  

    const displayedProducts = sortedProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const [cart, setCart] = useState<Product[]>(() => {
    const storedCart = sessionStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);



  
   // Hàm xử lý thay đổi trang
   const onPageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) setPageSize(size);
  };


  return (
    <div className="flex flex-col">

    <div className="max-w-[1400px] mx-auto w-full">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div className="w-[320px]">
          <Image  
      width={320} 
      height={250}  src={'https://png.pngtree.com/thumb_back/fw800/background/20230912/pngtree-sportswear-image_13269715.jpg'} preview={true} />
        </div>
        <div className="w-[320px] h-[200px]">
          <Image  width={320} 
      height={250}  src={section2} preview={true} />
        </div>
        <div className="w-[320px]">
          <Image  width={320} 
      height={250} src={section3} preview={true} />
        </div>
        <div className="w-[320px]">
          <Image  width={320} 
      height={250} src={section4} preview={true} />
        </div>
      </div>

      <Divider orientation="left">
        <p className="text-2xl font-bold text-gray-500 inline">Trang Chủ / </p>
        <p className="text-2xl font-bold inline">ĐỒ THỂ THAO NAM</p>
      </Divider>

    <div>
    <div className="flex justify-end items-center space-x-2"> {/* Căn tất cả sang bên phải */}
      <p className="text-lg">Kết Quả Hiển Thị:</p> {/* Chữ "Kết quả hiển thị" */}
        <Select
          value={sortOrder}
          className="w-[200px]"

          onChange={(value) => setSortOrder(value)}
        >
          <Option value="asc">Giá từ thấp đến cao</Option>
          <Option value="desc">Giá từ cao đến thấp</Option>
        </Select>
    </div>
 
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {displayedProducts.map((product) => (
          <div className="relative group w-[320px]">
          <Image
            src="https://dongphuchaianh.vn/wp-content/uploads/2022/03/ao-quan-the-thao-dep.jpg"
            alt={product.name}
            className="w-full h-auto"
          />
           
          {/* Các thông tin khác của sản phẩm */}
          <p className="text-[#262626] text-[11px] uppercase mt-2">Sản phẩm thể thao</p>
          <p className="text-[#105458] hover:underline cursor-pointer" onClick={() => navigate({ to: `/product/${product.id}` })}>
            {product.name}
          </p>
        
          {/* Hiển thị giá và nút ở bên phải */}
          <div className="flex justify-between items-center mt-2">
            <p className="font-semibold">{product.price}</p>
            <Button
                  type="primary"
                  className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-2 rounded-full hover:from-blue-500 hover:to-blue-700"

                  icon={<ShoppingCartOutlined />}
                />
          </div>
        </div>
        ))}
      </div>
      <div className="flex justify-center my-6">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={products.length}
          showSizeChanger
          onChange={onPageChange}
        />
      </div>
    </div>


      </div>
    </div>
  );
}
