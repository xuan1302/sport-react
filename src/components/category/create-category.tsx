import {
  Col,
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

interface CreateCategoryModalProps extends ModalProps {
  categoryID?: string;
  onClose: (isSuccess?: boolean) => void;
}

export default function CreateCategoryModal({
  categoryID,
  onClose,
  ...props
}: CreateCategoryModalProps) {
  const [form] = useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  useEffect(() => {
    if (categoryID) {
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
  }, [categoryID]);
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
    if (categoryID) {
      try {
        await adminCategoriesApi.update(categoryID, {
          name: values.name,
          description: values.description,
          parentId: values.parentId || 0,
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
          parentId: values.parentId || 0,
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
      title={categoryID ? "Chỉnh sửa danh mục" : "Tạo danh mục"}
      destroyOnClose={true}
      onOk={() => form.submit()}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Tên danh mục"
              rules={[
                { required: true, message: "Vui lòng nhập tên danh mục ..." },
              ]}
              initialValue=""
              className="!mb-2"
            >
              <Input placeholder="Tên danh mục" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[
                { required: true, message: "Vui lòng chọn trạng thái ..." },
              ]}
              className="!mb-2"
            >
              <Select
                options={[
                  {
                    label: "Hoạt động",
                    value: true,
                  },
                  {
                    label: "Ngừng hoạt động",
                    value: false,
                  },
                ]}
                placeholder="Trạng thái"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="parentCode" label="Danh mục cha" className="!mb-2">
              <Select placeholder="Chọn danh mục">
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="description" label="Mô tả" className="!mb-2">
              <Input.TextArea placeholder="Mô tả" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
