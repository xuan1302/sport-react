import { Col, Form, Input, Modal, ModalProps, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import adminOrderApi from "../../api/admin.orderApi";

interface DialogOrderModalProps extends ModalProps {
  orderID?: string;
  onClose: () => void;
}

export default function DialogOrderModal({
  orderID,
  onClose,
  ...props
}: DialogOrderModalProps) {
  const [form] = useForm();
  const [dataOrder, setDataOrder] = useState([]);
  useEffect(() => {
    if (orderID) {
      (async () => {
        try {
          const detailOrder = await adminOrderApi.getProductOrder(orderID);
          console.log(detailOrder);
          setDataOrder(detailOrder);
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      })();
    }
  }, [orderID]);

  return (
    <Modal
      {...props}
      title={"Thông tin đơn hàng"}
      destroyOnClose={true}
      onOk={() => form.submit()}
      onCancel={onClose}
      footer={[]}
    >
      <>
        {dataOrder.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex items-center mb-4">
            <div className="flex items-center mb-4">
              {/* Thẻ 1: Ảnh */}
              <div className="w-3/12 mr-2">
                <img
                  src={item?.imageResponse?.path}
                  alt={item?.imageResponse?.name}
                  width={210}
                  height={210}
                  className="object-cover rounded"
                />
              </div>
              <div className="w-9/12 flex flex-col">
                <span className="font-semibold text-lg block">
                  {item.productName}
                </span>
                <span className="text-sm text-gray-500 block ">
                  {item.material} : {item.size}
                </span>
                <div className="flex items-center justify-between mt-2 text-sm">
                  <span className="text-gray-500 font-bold text-lg ml-4">
                    {item.totalPrice.toLocaleString()}{" "}
                    <span className="text-sm font-semibold">
                      <span className="text-xs">VND</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    </Modal>
  );
}
