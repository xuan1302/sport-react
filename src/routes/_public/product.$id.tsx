import { ShoppingCartOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Card, Col, Divider, Image, Row } from 'antd';
import productExample from '../../assets/product-example.png';

export const Route = createFileRoute('/_public/product/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='max-w-[1200px] mx-auto flex flex-col gap-y-4 mt-10'>
      <Row>
        <Col span={8}>
          <Image src={productExample} preview={true} />
        </Col>

        <Col span={16}>
          <Card
            title='Áo Bóng Đá Đội Tuyển Bồ Đào Nha Đen Loang 2024-2025'
            className='w-full'
          >
            <div className='flex flex-col gap-y-4'>
              <p className='font-semibold text-red-500'>120.000 đ</p>

              <div className='flex flex-wrap gap-2'>
                <Button size='large'>Hàng Thun Lạnh</Button>

                <Button size='large'>Hàng Thun Co Giãn</Button>

                <Button size='large'>Hàng Mè Caro</Button>
              </div>

              <div className='flex flex-wrap gap-2'>
                <Button size='large'>S</Button>

                <Button size='large'>M</Button>

                <Button size='large'>XL</Button>

                <Button size='large'>XXL</Button>

                <Button size='large'>XXXL</Button>
              </div>

              <div className='flex items-center gap-x-2'>
                <Button type='primary' size='large'>
                  Mua ngay
                </Button>
                <Button size='large' icon={<ShoppingCartOutlined />}>
                  Thêm vào giỏ
                </Button>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Divider className='mt-[50px]' orientation='left'>
            Thông tin sản phẩm
          </Divider>

          <p>
            Áo Bóng Đá Đội Tuyển Bồ Đào Nha Đen Loang 2024-2025
            <br />
            <br />
            - Chất liệu: Thun lạnh
            <br />
            - Màu sắc: Đen Loang
            <br />
            - Size: S, M, L, XL, XXL, XXXL
            <br />
            - Xuất xứ: Việt Nam
            <br />
            - Thương hiệu: Sport Store
            <br />
            - Sản phẩm chính hãng
            <br />- Bảo hành: 1 năm
          </p>
        </Col>
      </Row>
    </div>
  );
}
