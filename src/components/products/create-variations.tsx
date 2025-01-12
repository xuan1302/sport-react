import { Col, Form, Input, Modal, ModalProps, Row, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import adminProductsApi from "../../api/admin.productsApi";
import { hideLoading, showLoading } from "../../store/loadingSlice";
import { AppDispatch } from "../../store/store";

interface CreateVariationModalProps extends ModalProps {
  id?: string;
  onClose: (isSuccess?: boolean) => void;
}

export default function CreateVariationModal({
  id,
  onClose,
  ...props
}: CreateVariationModalProps) {
  const [form] = useForm();
  const [productName, setProductName] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const detailCat = await adminProductsApi.getProductVariations(id);
          setProductName(detailCat.productName);
          form.setFieldsValue({
            materials: detailCat?.materials || [],
          });
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      })();
    }
  }, [id]);
  const onFinish = async (values: unknown) => {
    dispatch(showLoading());
    if (id) {
      try {
        await adminProductsApi.addQuantity(id, {
          ...values,
        });
        notification.success({
          message: "Thêm số lượng sản phẩm thành công",
          description: `Thành công`,
        });
        onClose(true);
      } catch (err) {
        notification.error({
          message: "Thêm số lượng sản phẩm thất bại",
          description: err.message || "Đã xảy ra lỗi",
        });
      }
    }
    dispatch(hideLoading());
  };
  return (
    <Modal
      {...props}
      title={"Thêm số lượng sản phẩm"}
      destroyOnClose={true}
      onOk={() => form.submit()}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <strong>Tên sản phẩm: {productName}</strong>
          </Col>
          <Col span={24}>
            <Form.List name="materials">
              {(fields) => (
                <>
                  {/* Tiêu đề */}
                  <div style={{ marginBottom: "16px" }}>
                    <Row gutter={16}>
                      <Col span={8}>
                        <strong>Chất liệu</strong>
                      </Col>
                      <Col span={8}>
                        <strong>Size</strong>
                      </Col>
                      <Col span={8}>
                        <strong>Số lượng</strong>
                      </Col>
                    </Row>
                  </div>

                  {/* Danh sách sản phẩm */}
                  {fields.map((field) => (
                    <div key={field.key} style={{ marginBottom: "24px" }}>
                      {/* Chất liệu */}
                      <Row gutter={16}>
                        <Col span={8}>
                          <strong>
                            {
                              form.getFieldValue("materials")[field.name]
                                ?.materialName
                            }
                          </strong>
                        </Col>

                        {/* Danh sách size và số lượng */}
                        <Col span={8}>
                          <Form.List name={[field.name, "sizes"]}>
                            {(sizeFields) =>
                              sizeFields.map((sizeField) => (
                                <Row gutter={16} key={sizeField.key}>
                                  {/* Size */}
                                  <Col span={24}>
                                    <Form.Item
                                      name={[sizeField.name, "sizeName"]}
                                      fieldKey={[
                                        sizeField.fieldKey,
                                        "sizeName",
                                      ]}
                                    >
                                      <Input disabled />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              ))
                            }
                          </Form.List>
                        </Col>
                        <Col span={8}>
                          <Form.List name={[field.name, "sizes"]}>
                            {(sizeFields) =>
                              sizeFields.map((sizeField) => (
                                <Row gutter={16} key={sizeField.key}>
                                  {/* Số lượng */}
                                  <Col span={24}>
                                    <Form.Item
                                      style={{ width: "100%" }}
                                      name={[sizeField.name, "quantity"]}
                                      fieldKey={[
                                        sizeField.fieldKey,
                                        "quantity",
                                      ]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Nhập số lượng",
                                        },
                                      ]}
                                    >
                                      <Input
                                        type="number"
                                        placeholder="Nhập số lượng"
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              ))
                            }
                          </Form.List>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
