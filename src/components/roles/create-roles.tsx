import { Col, Form, Input, Modal, ModalProps, Row, Tree } from 'antd';
import { useForm } from 'antd/es/form/Form';

interface CreateRoleModalProps extends ModalProps {
  roleId?: string;
}

export default function CreateRoleModal({
  roleId,
  ...props
}: CreateRoleModalProps) {
  const [form] = useForm();

  return (
    <Modal {...props} title={roleId ? 'Chỉnh sửa vai trò' : 'Thêm mới vai trò'}>
      <Form form={form} layout='vertical'>
        <Row gutter={[12, 0]}>
          <Col span={12}>
            <Form.Item
              label='Mã vai trò'
              rules={[{ required: true }]}
              name='code'
              className='!mb-2'
            >
              <Input placeholder='Nhập mã vai trò...' />
            </Form.Item>

            <Form.Item
              label='Tên vai trò'
              rules={[{ required: true }]}
              name='name'
              className='!mb-2'
            >
              <Input placeholder='Nhập tên vai trò...' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Tree
              checkable
              defaultExpandedKeys={['0-0-0', '0-0-1']}
              defaultSelectedKeys={['0-0-0', '0-0-1']}
              defaultCheckedKeys={['0-0-0', '0-0-1']}
              treeData={[
                {
                  title: 'parent 1',
                  key: '0-0',
                  children: [
                    {
                      title: 'parent 1-0',
                      key: '0-0-0',
                      disabled: true,
                      children: [
                        {
                          title: 'leaf',
                          key: '0-0-0-0',
                          disableCheckbox: true,
                        },
                        {
                          title: 'leaf',
                          key: '0-0-0-1',
                        },
                      ],
                    },
                    {
                      title: 'parent 1-1',
                      key: '0-0-1',
                      children: [
                        {
                          title: <span style={{ color: '#1677ff' }}>sss</span>,
                          key: '0-0-1-0',
                        },
                      ],
                    },
                  ],
                },
              ]}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
