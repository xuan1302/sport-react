import { Collapse } from "antd";
import Panel from "antd/es/splitter/Panel";

export default function Footer() {
  return (
    <div className="bg-blue-400 text-white py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột 1: Về Chúng Tôi */}
        <div className="text-center">
          <h3 className="font-bold mb-4">VỀ CHÚNG TÔI</h3>
          <p>Sport Shop.VN – Makes you stronger</p>
          <p>0977500358</p>
          <p>sportshop.vn.official@gmail.com</p>
          <a href="https://sportshop.vn/" className="text-blue-300">
            https://sportshop.vn/
          </a>
        </div>

        {/* Cột 2: Danh Mục Sản Phẩm */}
        <div className="text-center">
          <h3 className="font-bold mb-4">DANH MỤC SẢN PHẨM</h3>
          <ul className="space-y-2">
            <li className="text-lg font-sans">Đồ thể thao nam</li>
            <li className="text-lg font-sans">Đồ thể thao nữ</li>
            <li className="text-lg font-sans">Gel năng lượng</li>
            <li className="text-lg font-sans">Giày chạy Bộ Nam Nữ</li>
            <li className="text-lg font-sans">Phụ kiện thể thao</li>
            <li className="text-lg font-sans">Quần áo Đội Nhóm</li>
            <li className="text-lg font-sans">Tất cả sản phẩm</li>
          </ul>
        </div>

        {/* Cột 3: Bài Viết Gần Đây */}
        <div className="text-center">
          <h3 className="font-bold mb-4">BÀI VIẾT GẦN ĐÂY</h3>
          <ul className="space-y-4">
            <li>
              <p className="text-sm">10 Th10</p>
              <a
                href="#"
                className="text-blue-300 hover:text-yellow-300 transition"
              >
                Nên chạy với nhịp thở nào để không mệt – Sportshop.vn
              </a>
            </li>
            <li>
              <p className="text-sm">10 Th10</p>
              <a
                href="#"
                className="text-blue-300 hover:text-yellow-300 transition"
              >
                Giữ an toàn khi chạy bộ – Sportshop
              </a>
            </li>
            {/* Thêm bài viết tương tự */}
          </ul>
        </div>
      </div>


    </div>
  );
}
