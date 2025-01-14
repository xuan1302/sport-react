import { createFileRoute } from '@tanstack/react-router'
import { Button, Form, Input, notification } from 'antd'
import axiosClient from '../../../api/axiosClient';
import { useDispatch } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import { hideLoading, showLoading } from '../../../store/loadingSlice';

export const Route = createFileRoute('/_public/user/Contact')({
  component: RouteComponent,
})
interface CreateContacts {
    fullname: string;
    phone: string;
    email: string;
    content: string;
  }
  
  const UserContactsApi = {
    create(data: CreateContacts): Promise<unknown> {
      const url = "/v1/sporty-shop/home/contact";
      return axiosClient.post(url, data);
    },
  }
  
  function RouteComponent() {

    const [form] = useForm();

    const dispatch = useDispatch(); 
    const handleSubmit = async (values: CreateContacts) => {
      try {
        dispatch(showLoading());
        
        // Gửi thông tin liên hệ qua API
        const contact = await UserContactsApi.create({
          fullname: values.fullname,
          phone: values.phone,
          email: values.email,
          content: values.content,
        });
        console.log('Thông tin liên hệ:', contact);
        form.resetFields();
        notification.success({
          message: 'Gủi hỗ trợ thành công',
          description: 'Thông tin liên hệ của bạn đã được gửi thành công.',
        });
    
      } catch (err) {
        // Xử lý lỗi một cách an toàn
        const errorMessage = (err instanceof Error) ? err.message : 'Đã xảy ra lỗi khi gửi thông tin.';
        notification.error({
          message: 'Gủi hỗ trợ thất bại',
          description: errorMessage,
        });
    
      } finally {
        // Tắt trạng thái loading
        dispatch(hideLoading());
      }
    };
    
  
    return (
      <div className="">
        {/* Thanh tiêu đề từ "Trang chủ / Liên Hệ" */}
        <div className="bg-gray-200 p-4">
          <p className="text-gray-600 text-sm">Trang chủ / Liên Hệ</p>
        </div>
    
        {/* Nội dung chính của form */}
        <div className="max-w-xl mx-auto mt-6 p-4">
          {/* Tiêu đề trong form */}
          <h2 className="text-xl font-bold mb-2">Bạn cần hỗ trợ?</h2>
          <p className="text-gray-700 mb-6">
            Chúng tôi mong muốn lắng nghe ý kiến của quý khách. Vui lòng gửi mọi yêu cầu, thắc mắc theo thông tin bên dưới, chúng tôi sẽ liên lạc với bạn sớm nhất có thể.
          </p>
    
          {/* Form liên hệ */}
          <Form
            name="contactForm"
            initialValues={{
              fullname: '',
              phone: '',
              email: '',
              content: '',
            }}
            layout="vertical"
            onFinish={handleSubmit}
            className="bg-white p-6 rounded shadow-md"
          >
            <Form.Item
              label="Họ tên"
              name="fullname"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
            >
              <Input />
            </Form.Item>
    
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                { pattern: /^[0-9]+$/, message: 'Số điện thoại không hợp lệ!' },
              ]}
            >
              <Input />
            </Form.Item>
    
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input />
            </Form.Item>
    
            <Form.Item
              label="Nội dung"
              name="content"
              rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
            >
              <Input.TextArea />
            </Form.Item>
    
            <Form.Item>
            <Button
              htmlType="submit"
              className="w-auto mx-auto !bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 block rounded-lg shadow-md transition-all duration-200  uppercase"
            >
              GỬI NGAY
            </Button>

            </Form.Item>
          </Form>
        </div>
      </div>
    );
    
  }