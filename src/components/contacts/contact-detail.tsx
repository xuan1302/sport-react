import { Button, Card, Col, Drawer, DrawerProps, Row } from 'antd';
import dayjs from 'dayjs';

interface ContactDetailProps extends DrawerProps {
  contactID?: string;
}

export default function ContactDetail({
  contactID,
  ...props
}: ContactDetailProps) {
  return (
    <Drawer
      {...props}
      title='Chi tiết liên hệ'
      extra={<Button type='primary'>Phản hồi</Button>}
    >
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Card title='Thông tin khách hàng'>
            <p>Họ và tên: Quang Huy</p>
            <p>SĐT: 12912391923</p>
            <p>Email: qhuy@gmail.com</p>
          </Card>
        </Col>

        <Col span={24}>
          <Card title='Thông tin liên hệ'>
            <p>Ngày gửi: {dayjs().format('DD/MM/YYYY')}</p>
            <p>
              Mô tả: Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis reiciendis sequi veritatis corrupti. Ducimus deleniti
              nobis, ab, architecto possimus repellendus quod consequatur
              voluptate eos facilis in fuga dolorem voluptatem rerum.
            </p>
          </Card>
        </Col>
      </Row>
    </Drawer>
  );
}
