import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDisclosure } from "@mantine/hooks";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Button,
  Card,
  Form,
  Input,
  Popconfirm,
  Select,
  Table,
  Tooltip,
  notification,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { hideLoading, showLoading } from "../../../store/loadingSlice";
import adminCategoriesApi from "../../../api/admin.categoriesApi";
import adminProductsApi from "../../../api/admin.productsApi";

export const Route = createLazyFileRoute("/admin/_admin-layout/products")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [openModal, handlerOpenModal] = useDisclosure(false);
  const [openModalChangePassword, handlerOpenModalChangePassword] =
    useDisclosure(false);
  const [dataSource, setDataSource] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showLoading());
        const [cat] = await Promise.all([adminCategoriesApi.listCat()]);
        setCategories(cat);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        dispatch(hideLoading());
      }
    };

    fetchData();
  }, []);
  const fetchProducts = useCallback(
    async (
      searchKeyword = "",
      categoryId = "",
      isInStock = "",
      isActive = "",
      currentPage = 1,
      pageSize = 10
    ) => {
      setLoading(true);
      try {
        const data = await adminProductsApi.listProducts({
          keyword: searchKeyword,
          categoryId,
          isInStock,
          isActive,
          pageSize,
          pageNumber: currentPage,
        });
        setDataSource(data?.list || []);
        setPagination((prev) => ({
          ...prev,
          total: data?.totalSize || 0,
        }));
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleTableChange = (newPagination: any) => {
    setPagination(newPagination);
    fetchProducts(
      keyword,
      "",
      "",
      "",
      newPagination.current,
      newPagination.pageSize
    );
  };
  const onFinish = async (values: any) => {
    fetchProducts(
      form.getFieldValue("keywork") || "",
      values.category,
      values.isStock,
      values.status,
      1,
      pagination.pageSize
    );
  };
  const handleDeleteProduct = async (id: string) => {
    dispatch(showLoading());
    try {
      await adminProductsApi.delete(id);
      fetchProducts();
      notification.success({
        message: "Xóa sản phẩm thành công",
        description: `Thành công`,
      });
    } catch (error) {
      notification.error({
        message: "Xóa sản phẩm thất bại",
        description: error.message || "Đã xảy ra lỗi",
      });
    } finally {
      dispatch(hideLoading());
    }
  };
  const handleChangeStatusProduct = async (id: string, status: boolean) => {
    dispatch(showLoading());
    try {
      await adminProductsApi.changeStatusProduct(id, status);
      fetchProducts();
      notification.success({
        message: "Thay đổi trạng thái sản phẩm thành công",
        description: `Thành công`,
      });
    } catch (error) {
      notification.error({
        message: "Thay đổi trạng thái sản phẩm thất bại",
        description: error.message || "Đã xảy ra lỗi",
      });
    } finally {
      dispatch(hideLoading());
    }
  };
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <UserOutlined />
          <span>Quản lý sản phẩm</span>
        </div>
        <div className="flex items-center justify-end gap-x-4">
          <Button
            size="large"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              navigate({ to: "/admin/product-add" });
            }}
          >
            Tạo sản phẩm
          </Button>
        </div>

        <Card>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Quản lý sản phẩm</div>
            </div>
            <div className="flex items-center justify-end gap-x-4">
              <Form
                className="flex items-center gap-4"
                form={form}
                layout="vertical"
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  name="keywork"
                  style={{ marginBottom: 0, width: "200px" }}
                >
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder="Tìm sản phẩm ..."
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="status"
                  style={{ marginBottom: 0, width: "200px" }}
                >
                  <Select
                    className="max-w-[400px] w-full"
                    size="large"
                    placeholder="Trạng thái"
                    options={[
                      {
                        label: "Tất cả",
                        value: "",
                      },
                      {
                        label: "Đang hoạt động",
                        value: "1",
                      },
                      {
                        label: "Không hoạt động",
                        value: "0",
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  name="isStock"
                  style={{ marginBottom: 0, width: "200px" }}
                >
                  <Select
                    className="max-w-[400px] w-full"
                    size="large"
                    placeholder="Tình trạng"
                    options={[
                      {
                        label: "Tất cả",
                        value: "",
                      },
                      {
                        label: "Còn hàng",
                        value: true,
                      },
                      {
                        label: "Hết hàng",
                        value: false,
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  name="category"
                  style={{ marginBottom: 0, width: "200px" }}
                >
                  <Select placeholder="Loại danh mục" allowClear>
                    {categories?.map((category) => (
                      <Select.Option key={category.id} value={category.id}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Button
                  htmlType="submit"
                  size="large"
                  type="primary"
                  icon={<SearchOutlined />}
                >
                  Tìm kiếm
                </Button>
              </Form>
            </div>
            <Table
              scroll={{
                x: 1200,
                y: window.innerHeight - 400,
              }}
              loading={loading}
              columns={[
                {
                  title: "STT",
                  dataIndex: "index",
                  render: (_, __, index) =>
                    (pagination.current - 1) * pagination.pageSize + index + 1,
                },
                {
                  title: "Ảnh sản phẩm",
                  dataIndex: "url",
                  render: (url: string | null) => {
                    return url ? (
                      <img
                        src={url}
                        alt="Product"
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                    ) : (
                      ""
                    );
                  },
                },
                {
                  title: "Mã sản phẩm",
                  dataIndex: "code",
                },
                {
                  title: "Tên sản phẩm",
                  dataIndex: "productName",
                },
                {
                  title: "Loại danh mục",
                  dataIndex: "categoryName",
                },
                {
                  title: "Tình trạng",
                  dataIndex: "isInStock",
                  render: (isInStock: boolean) => (
                    <span>{isInStock ? "Còn hàng" : "Hết hàng"}</span>
                  ),
                },
                {
                  title: "Trạng thái",
                  dataIndex: "isActive",
                  render: (status: boolean) => (
                    <span>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: status ? "green" : "red",
                          display: "inline-block",
                          marginRight: "8px",
                        }}
                      ></span>
                      {status ? "Đang hoạt động" : "Không hoạt động"}
                    </span>
                  ),
                },
                {
                  title: "Thao tác",
                  dataIndex: "action",
                  fixed: "right",
                  align: "center",
                  render: (_, record) => (
                    <>
                      <Tooltip title="Chỉnh sửa">
                        <Button
                          onClick={() => {
                            navigate({
                              to: "/admin/product-detail/$id",
                              params: { id: record.id },
                            });
                          }}
                          icon={<EditOutlined />}
                        ></Button>
                      </Tooltip>
                      <Popconfirm
                        title="Thay đổi trạng thái sản phẩm"
                        description={`Bạn có chắc chắn muốn ${record.isActive === true ? "ngưng hoạt động" : "hoạt động"} sản phẩm này không?`}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        onConfirm={() =>
                          handleChangeStatusProduct(record.id, !record.isActive)
                        }
                      >
                        <Tooltip
                          title={`${record.isActive === true ? "Ngưng hoạt động" : "Hoạt động"}`}
                        >
                          <Button
                            icon={
                              record.isActive === true ? (
                                <PauseCircleOutlined />
                              ) : (
                                <PlayCircleOutlined />
                              )
                            }
                          ></Button>
                        </Tooltip>
                      </Popconfirm>
                      <Popconfirm
                        title="Thay đổi trạng thái sản phẩm"
                        description={`Bạn có chắc chắn muốn ${record.isActive === true ? "ngưng hoạt động" : "hoạt động"} sản phẩm này không?`}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        onConfirm={() => handleDeleteProduct(record.id)}
                      >
                        <Tooltip title="Xóa">
                          <Button icon={<DeleteOutlined />}></Button>
                        </Tooltip>
                      </Popconfirm>
                      <Tooltip title="Thêm mới biến thể">
                        <Button icon={<PlusCircleOutlined />} />
                      </Tooltip>
                    </>
                  ),
                },
              ]}
              dataSource={dataSource}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
              }}
              rowKey="id"
              onChange={handleTableChange}
            />
          </div>
        </Card>
      </div>
    </>
  );
}

export default RouteComponent;
