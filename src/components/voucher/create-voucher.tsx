import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  ModalProps,
  Row,
  Select,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../store/loadingSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import adminCategoriesApi from "../../api/admin.categoriesApi";
import TextArea from "antd/es/input/TextArea";

interface CreateVoucherModalProps extends ModalProps {
  voucherId?: string;
  onClose: (isSuccess?: boolean) => void;
}

export default function CreateVoucherModal({
  voucherId,
  onClose,
  ...props
}: CreateVoucherModalProps) {
  const [form] = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  useEffect(() => {
    if (voucherId) {
      (async () => {
        try {
          const detailCat = await adminCategoriesApi.getCatById(categoryID);
          form.setFieldsValue({
            description: detailCat.categoryDescription,
            parentCode: detailCat.parentId || null,
            name: detailCat.categoryName,
            status: detailCat.status ? detailCat.status : false,
          });
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      })();
    }
  }, [voucherId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showLoading());
        const [cat] = await Promise.all([adminCategoriesApi.listCatParent()]);
        setCategories(cat);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        dispatch(hideLoading());
      }
    };

    fetchData();
  }, []);
  const onFinish = async (values: unknown) => {
    dispatch(showLoading());
    if (voucherId) {
      try {
        await adminCategoriesApi.update(voucherId, {
          name: values.name,
          description: values.description,
          parentId: values.parentCode || 0,
          status: values.status ? values.status : false,
        });
        notification.success({
          message: "Chỉnh sửa chuyên mục thành công",
          description: `Thành công`,
        });
        onClose(true);
      } catch (err) {
        notification.error({
          message: "Chỉnh sửa chuyên mục thất bại",
          description: err.message || "Đã xảy ra lỗi",
        });
      }
    } else {
      try {
        await adminCategoriesApi.create({
          name: values.name,
          description: values.description || "",
          parentId: values.parentCode || 0,
          status: values.status,
        });
        form.resetFields();
        notification.success({
          message: "Thêm mới tài khoản thành công",
          description: `Thành công`,
        });
        onClose(true);
      } catch (err) {
        notification.error({
          message: "Thêm mới tài khoản thất bại",
          description: err.message || "Đã xảy ra lỗi",
        });
      }
    }
    dispatch(hideLoading());
  };
  return (
    <Modal
      {...props}
      title={voucherId ? "Chỉnh sửa danh mục" : "Tạo danh mục"}
      destroyOnClose={true}
      onOk={() => form.submit()}
      onCancel={onClose}
    >
      {/* <Form form={form} layout="vertical" onFinish={onFinish}> */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          voucherCode: "M1234",
          voucherName: "Giảm giá khi mua đơn hàng đầu tiên",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Mã voucher"
              name="voucherCode"
              rules={[{ required: true, message: "Nhập mã voucher" }]}
            >
              <Input placeholder="Nhập mã voucher" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Tên voucher"
              name="voucherName"
              rules={[{ required: true, message: "Nhập tên voucher" }]}
            >
              <Input placeholder="Nhập tên voucher" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ngày bắt đầu"
              name="startDate"
              rules={[{ required: true, message: "Chọn ngày bắt đầu" }]}
            >
              <DatePicker
                format="DD, [Th] MM, YYYY"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngày kết thúc"
              name="endDate"
              rules={[{ required: true, message: "Chọn ngày kết thúc" }]}
            >
              <DatePicker
                format="DD, [Th] MM, YYYY"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Kiểu voucher"
              name="voucherType"
              rules={[{ required: true, message: "Chọn kiểu voucher" }]}
            >
              <Select placeholder="Chọn kiểu voucher">
                <Select.Option value="fixed">Giảm giá cố định</Select.Option>
                <Select.Option value="percentage">
                  Giảm giá phần trăm
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số lượng tối đa"
              name="maxUsage"
              rules={[{ required: true, message: "Nhập số lượng" }]}
            >
              <Input type="number" placeholder="50" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="numberGiam">
              <Input type="number" placeholder="Nhập số lượng giảm" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="count">
              <Input type="number" placeholder="Nhập số lượng" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Sản phẩm áp dụng voucher"
              name="applicableProducts"
            >
              <Input placeholder="Nhập sản phẩm áp dụng" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Nhập mô tả" }]}
            >
              <TextArea
                rows={4}
                placeholder="Nhập mô tả voucher"
                maxLength={500}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
