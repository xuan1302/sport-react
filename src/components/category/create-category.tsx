import { Col, Form, Input, Modal, ModalProps, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';

interface CreateCategoryModalProps extends ModalProps {
  categoryID?: string;
}

export default function CreateCategoryModal({
  categoryID,
  ...props
}: CreateCategoryModalProps) {
  const [form] = useForm();

  return (
    <Modal
      {...props}
      title={categoryID ? 'Chỉnh sửa danh mục' : 'Tạo danh mục'}
    >
      <Form form={form} layout='vertical' initialValues={{ status: 'active' }}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Form.Item
              name='name'
              label='Tên danh mục'
              rules={[{ required: true }]}
              initialValue=''
              className='!mb-2'
            >
              <Input placeholder='Tên danh mục' />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name='status'
              label='Trạng thái'
              rules={[{ required: true }]}
              initialValue=''
              className='!mb-2'
            >
              <Select
                defaultValue='active'
                options={[
                  {
                    label: 'Đang hoạt động',
                    value: 'active',
                  },
                  {
                    label: 'Ngừng hoạt động',
                    value: 'inactive',
                  },
                ]}
                placeholder='Trạng thái'
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name='parentCode' label='Danh mục cha' className='!mb-2'>
              <Select options={[]} placeholder='Danh mục cha' />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name='description' label='Mô tả' className='!mb-2'>
              <Input.TextArea placeholder='Mô tả' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
