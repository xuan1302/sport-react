import {
  DeleteFilled,
  EditFilled,
  PauseCircleFilled,
  PlayCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useDisclosure } from "@mantine/hooks";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Button,
  Card,
  Form,
  Input,
  Popconfirm,
  Select,
  Table,
  notification,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import adminCategoriesApi from "../../../api/admin.categoriesApi";
import CreateCategoryModal from "../../../components/category/create-category";
import { hideLoading, showLoading } from "../../../store/loadingSlice";
import { AppDispatch } from "../../../store/store";

export const Route = createLazyFileRoute("/admin/_admin-layout/category")({
  component: RouteComponent,
});

function RouteComponent() {
  const [openModal, handleOpenModal] = useDisclosure(false);
  const [categoryID, setCategoryID] = useState<string | undefined>();
  const [form] = Form.useForm();
  useEffect(() => {
    if (openModal) return;

    setCategoryID(undefined);
  }, [openModal]);

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const fetchCategories = useCallback(
    async (searchKeyword = "", status = "", currentPage = 1, pageSize = 10) => {
      setLoading(true);
      try {
        const data = await adminCategoriesApi.listCatPaginate({
          keyword: searchKeyword,
          status,
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
    fetchCategories();
  }, [fetchCategories]);

  const handleTableChange = (newPagination: any) => {
    setPagination(newPagination);
    fetchCategories(
      form.getFieldValue("keywork"),
      form.getFieldValue("status"),
      newPagination.current,
      newPagination.pageSize
    );
  };
  const onFinish = async (values: any) => {
    fetchCategories(
      form.getFieldValue("keywork") || "",
      form.getFieldValue("status") || "",
      1,
      pagination.pageSize
    );
  };

  const handleReset = () => {
    form.resetFields();
    fetchCategories(
      form.getFieldValue("keywork"),
      form.getFieldValue("status"),
      1,
      pagination.pageSize
    );
  };
  const handleDeleteCat = async (id: string) => {
    setLoading(true);
    try {
      await adminCategoriesApi.delete(id);
      await fetchCategories();
      notification.success({
        message: "Xóa chuyên mục thành công",
        description: `Thành công`,
      });
    } catch (error) {
      notification.error({
        message: "Xóa chuyên mục thất bại",
        description: `Thất bại`,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleChangeStatusCat = async (id: string, status: boolean) => {
    dispatch(showLoading());
    try {
      await adminCategoriesApi.changeStatus(id, status);
      fetchCategories();
      notification.success({
        message: "Thay đổi trạng thái thành công",
        description: `Thành công`,
      });
    } catch (error) {
      notification.error({
        message: "Thay đổi trạng thái thất bại",
        description: error.message || "Đã xảy ra lỗi",
      });
    } finally {
      dispatch(hideLoading());
    }
  };
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between gap-x-2">
          <span>
            <SettingOutlined />
            <span>Quản lý danh mục</span>
          </span>
          <Button
            size="large"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal.open()}
          >
            Thêm danh mục
          </Button>
        </div>

        <Card>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Quản lý tài khoản</div>
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
                    placeholder="Tìm danh mục..."
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
                <Button
                  size="large"
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleReset}
                >
                  Đặt lại
                </Button>
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
              columns={[
                {
                  title: "STT",
                  dataIndex: "index",
                  render: (_, __, index) =>
                    (pagination.current - 1) * pagination.pageSize + index + 1,
                },
                {
                  title: "Tên danh mục",
                  dataIndex: "categoryName",
                },
                {
                  title: "Danh mục cha",
                  dataIndex: "parentName",
                },
                {
                  title: "Mô tả",
                  dataIndex: "categoryDescription",
                },
                {
                  title: "Trạng thái",
                  dataIndex: "status",
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
                  render: (_, record) => {
                    return (
                      <div className="flex items-center justify-center gap-x-2">
                        <Button
                          icon={<EditFilled />}
                          onClick={() => {
                            setCategoryID(record.categoryId);
                            handleOpenModal.open();
                          }}
                        ></Button>
                        <Popconfirm
                          title="Thay đổi trạng thái danh mục"
                          description={`Bạn có chắc chắn muốn ${record.status === true ? "ngưng hoạt động" : "cấp phép hoạt động"} danh mục này không?`}
                          okText="Xác nhận"
                          cancelText="Hủy"
                          onConfirm={() =>
                            handleChangeStatusCat(
                              record.categoryId,
                              !record.status
                            )
                          }
                        >
                          <Button
                            icon={
                              record.status === true ? (
                                <PauseCircleFilled />
                              ) : (
                                <PlayCircleOutlined />
                              )
                            }
                          />
                        </Popconfirm>
                        <Popconfirm
                          title="Xoá danh mục"
                          description="Bạn có chắc chắn muốn xoá danh mục này không?"
                          okText="Xoá"
                          cancelText="Hủy"
                          onConfirm={() => handleDeleteCat(record.categoryId)}
                        >
                          <Button icon={<DeleteFilled />} />
                        </Popconfirm>
                      </div>
                    );
                  },
                },
              ]}
              loading={loading}
              dataSource={dataSource}
              rowKey="categoryId"
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
              }}
              onChange={handleTableChange}
            ></Table>
          </div>
        </Card>
      </div>

      <CreateCategoryModal
        key={categoryID || "create-new"}
        open={openModal}
        categoryID={categoryID}
        onClose={(isSuccess) => {
          setCategoryID(undefined);
          if (isSuccess) {
            handleOpenModal.close();
            fetchCategories();
          }
        }}
        onCancel={() => handleOpenModal.close()}
      />
    </>
  );
}
