import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Editor } from "@tinymce/tinymce-react";
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  Select,
  Space,
  Upload,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import adminCategoriesApi from "../../../api/admin.categoriesApi";
import adminProductsApi from "../../../api/admin.productsApi";
import { hideLoading, showLoading } from "../../../store/loadingSlice";
import { AppDispatch } from "../../../store/store";
export const Route = createLazyFileRoute("/admin/_admin-layout/product-add")({
  component: RouteComponent,
});
const keyTiny = import.meta.env.VITE_API_TINY_KEY;
function RouteComponent() {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<unknown[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [filePrimary, setFilePrimary] = useState<unknown[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [material, setMaterial] = useState<{ id: string; name: string }[]>([]);
  const [size, setSize] = useState<{ id: string; name: string }[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showLoading());
        const [cat, material, size] = await Promise.all([
          adminCategoriesApi.listCat(),
          adminProductsApi.listMaterial(),
          adminProductsApi.listSize(),
        ]);
        setCategories(cat);
        setMaterial(material);
        setSize(size);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        dispatch(hideLoading());
      }
    };

    fetchData();
  }, []);
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleCustomRequestPrimary = async (options) => {
    const { file } = options;
    dispatch(showLoading());
    try {
      const data = await adminProductsApi.upload(file);
      setFilePrimary([...data?.imageResponse]);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      dispatch(hideLoading());
    }
  };
  const handleCustomRequest = async (options) => {
    const { file } = options;
    dispatch(showLoading());
    try {
      const data = await adminProductsApi.upload(file);
      setFileList((prevFileList) => [...prevFileList, ...data?.imageResponse]);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      dispatch(hideLoading());
    }
  };
  const onFinish = async (values: any) => {
    const body = {
      ...values,
      description: values?.description?.level?.content || values?.description,
      mainPhotoId: filePrimary[0]?.id,
      secondaryPhotoIds: fileList?.map((item) => item.id),
    };
    dispatch(showLoading());
    try {
      await adminProductsApi.createProduct(body);
      notification.success({
        message: "Thêm mới sản phẩm thành công",
        description: `Thành công`,
      });
      navigate({ to: "/admin/products" });
    } catch (err) {
      notification.error({
        message: "Thêm mới sản phẩm thất bại",
        description: err?.message || "Đã xảy ra lỗi",
      });
    }
    dispatch(hideLoading());
  };

  return (
    <Card title="Thêm mới sản phẩm" style={{ padding: 16 }}>
      <Form
        form={form}
        layout="vertical"
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div style={{ display: "flex", gap: "16px" }}>
          {/* Khu vực ảnh */}
          <div style={{ flex: "1 1 30%" }}>
            <h2 style={{ marginBottom: 8 }}>Ảnh chính</h2>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 250,
              }}
            >
              <Upload
                customRequest={handleCustomRequestPrimary}
                maxCount={1}
                listType="picture-card"
                showUploadList={false}
              >
                {filePrimary.length >= 1 ? null : uploadButton}
              </Upload>

              {/* Hiển thị ảnh preview khi đã upload */}
              {filePrimary.length === 1 && (
                <div
                  className="hover-delete-icon"
                  style={{ marginTop: 0, position: "relative" }}
                >
                  <Image
                    width={400}
                    height={250}
                    src={filePrimary[0]?.path}
                    alt="Image Preview"
                  />
                  {/* Icon xóa khi hover */}
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      visibility: "hidden",
                      opacity: 0,
                      transition: "visibility 0s, opacity 0.3s ease",
                    }}
                    className="image-delete-icon"
                  >
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => setFilePrimary([])}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderColor: "transparent",
                      }}
                    />
                  </div>
                </div>
              )}
            </Card>
            <h2 style={{ marginTop: 8 }}>Ảnh phụ</h2>
            <div style={{ display: "flex", gap: "8px", marginTop: 8 }}>
              {fileList.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)", // Chia thành 4 cột đều nhau
                    gridTemplateRows: "repeat(2, 1fr)", // Chia thành 2 hàng đều nhau
                    gap: "10px", // Khoảng cách giữa các ô
                  }}
                >
                  {fileList.map((file, index) => (
                    <div
                      key={index}
                      className="hover-delete-icon"
                      style={{ marginTop: 0, position: "relative" }}
                    >
                      <Image
                        width={100}
                        height={100}
                        src={file?.path}
                        alt="Image Preview"
                      />
                      {/* Icon xóa khi hover */}
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          visibility: "hidden",
                          opacity: 0,
                          transition: "visibility 0s, opacity 0.3s ease",
                        }}
                        className="image-delete-icon"
                      >
                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() =>
                            setFileList((prevFile) =>
                              prevFile.filter((_, i) => i !== index)
                            )
                          }
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.7)",
                            borderColor: "transparent",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Upload
                customRequest={handleCustomRequest}
                multiple={true}
                listType="picture-card"
                showUploadList={false}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </div>
          </div>
          <div style={{ display: "flex", gap: "20px", flex: "1 1 70%" }}>
            <div style={{ flex: "1 1 40%" }}>
              <Form.Item
                label="Tên"
                name="name"
                rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>

              <Form.Item
                label="Loại danh mục"
                name="categoryId"
                rules={[{ required: true, message: "Chọn loại danh mục" }]}
              >
                <Select placeholder="Chọn danh mục">
                  {categories.map((category) => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[{ required: true, message: "Chọn trạng thái" }]}
              >
                <Select placeholder="Chọn trạng thái">
                  <Select.Option value="true">Đang hoạt động</Select.Option>
                  <Select.Option value="false">Ngừng hoạt động</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div style={{ flex: "1 1 60%" }}>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập mô tả",
                  },
                ]}
                valuePropName="value"
              >
                <Editor
                  textareaName="description"
                  apiKey={keyTiny}
                  value={form?.getFieldValue("description") || ""}
                  onEditorChange={(content) => {
                    form.setFieldsValue({ description: content });
                  }}
                  init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div style={{ padding: "20px" }}>
          <Form.List name="materials">
            {(fields, { add, remove }) => (
              <div
                style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
              >
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Sản phẩm biến thể ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <Form.Item
                        style={{ width: 220 }}
                        name={[field.name, "materialId"]}
                        rules={[
                          {
                            required: true,
                            message: "Bạn chưa chọn chất liệu",
                          },
                        ]}
                      >
                        <Select placeholder="Chọn chất liệu">
                          {material.map((materia) => (
                            <Select.Option key={materia.id} value={materia.id}>
                              {materia.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        style={{ width: 220 }}
                        name={[field.name, "price"]}
                        rules={[
                          { required: true, message: "Bạn chưa nhập giá" },
                        ]}
                      >
                        <Input
                          style={{ height: "38px" }}
                          type="number"
                          placeholder="Nhập giá"
                        />
                      </Form.Item>
                    </div>

                    {/* Nest Form.List */}
                    <Form.Item label="Size">
                      <Form.List name={[field.name, "sizes"]}>
                        {(subFields, subOpt) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              rowGap: 16,
                            }}
                          >
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "16px",
                                  }}
                                >
                                  <Form.Item
                                    style={{ width: 220 }}
                                    name={[subField.name, "sizeId"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Bạn chưa chọn size",
                                      },
                                    ]}
                                  >
                                    <Select placeholder="Chọn chất liệu">
                                      {size.map((si) => (
                                        <Select.Option
                                          key={si.id}
                                          value={si.id}
                                        >
                                          {si.name}
                                        </Select.Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                    style={{ width: 220 }}
                                    name={[subField.name, "quantity"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Bạn chưa nhập số lượng",
                                      },
                                    ]}
                                  >
                                    <Input
                                      style={{ height: "38px" }}
                                      type="number"
                                      placeholder="Nhập số lượng"
                                    />
                                  </Form.Item>
                                </div>
                                <CloseOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Space>
                            ))}
                            <Button
                              style={{ width: "150px" }}
                              type="dashed"
                              onClick={() => subOpt.add()}
                              block
                            >
                              + Thêm size
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                ))}

                <div style={{ marginBottom: "20px", textAlign: "right" }}>
                  <Button
                    style={{ width: "150px" }}
                    type="dashed"
                    onClick={() => add()}
                    block
                  >
                    + Thêm chất liệu
                  </Button>
                </div>
              </div>
            )}
          </Form.List>
          <Space
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
            <Button onClick={() => navigate({ to: "/admin/products" })}>
              Thoát
            </Button>
          </Space>
        </div>
      </Form>
    </Card>
  );
}
