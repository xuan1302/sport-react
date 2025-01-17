import { CloseCircleFilled } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router'
import { Button } from 'antd';

export const Route = createFileRoute('/_public/user/fail')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>  <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
    {/* Header */}
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
      <CloseCircleFilled className='text-red-500' style={{ fontSize: '60px' }}/>
      </div>
      <h1 className="text-2xl font-bold text-orange-500" >
        Gửi đơn hàng Thất Bại
      </h1>
      <p className="text-gray-600">
        Cảm ơn quý khách đã mua hàng tại vui lòng thực hiện lại <br />
        Nếu bạn có bất kỳ thắc mắc hay câu hỏi nào vui lòng gọi điện để được
        tư vấn: <span className="text-red-500 font-bold">0977500358</span>
      </p>
    </div>


    {/* Button */}
    <div className="text-center">
      <Button
        type="primary"
        size="large"
        className="bg-blue-500 hover:bg-blue-600"
      >
        Quay Lại
      </Button>
    </div>
  </div></div>
  );
}