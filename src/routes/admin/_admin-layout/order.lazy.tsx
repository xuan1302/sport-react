import { createLazyFileRoute } from "@tanstack/react-router";
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
import adminCategoriesApi from "../../../api/admin.categoriesApi";
import { hideLoading, showLoading } from "../../../store/loadingSlice";
import {
  CheckOutlined,
  CloseOutlined,
  PauseCircleFilled,
  PlayCircleOutlined,
  SearchOutlined,
  SendOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import adminOrderApi from "../../../api/admin.orderApi";

export const Route = createLazyFileRoute("/admin/_admin-layout/order")({
  component: RouteComponent,
});

function RouteComponent() {
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const fetchOrder = useCallback(
    async (searchKeyword = "", currentPage = 1, pageSize = 10) => {
      setLoading(true);
      try {
        const data = await adminOrderApi.listOrder({
          keyword: searchKeyword,
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
    fetchOrder();
  }, [fetchOrder]);

  const handleTableChange = (newPagination: any) => {
    setPagination(newPagination);
    fetchOrder(
      form.getFieldValue("keywork"),
      newPagination.current,
      newPagination.pageSize
    );
  };
  const onFinish = async (values: any) => {
    fetchOrder(form.getFieldValue("keywork") || "", 1, pagination.pageSize);
  };

  const handleReset = () => {
    form.resetFields();
    fetchOrder(form.getFieldValue("keywork"), 1, pagination.pageSize);
  };
  const handleChangeStatusOrder = async (id: string, status: number) => {
    dispatch(showLoading());
    try {
      await adminOrderApi.changeStatus(id, status);
      fetchOrder();
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
            <span>Quản lý Order</span>
          </span>
        </div>

        <Card>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Quản lý Order</div>
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
                    placeholder="Tìm order..."
                    size="large"
                  />
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
              columns={[
                {
                  title: "STT",
                  dataIndex: "index",
                  render: (_, __, index) =>
                    (pagination.current - 1) * pagination.pageSize + index + 1,
                },
                {
                  title: "Mã đơn hàng",
                  dataIndex: "orderCode",
                },
                {
                  title: "Tên khách hàng",
                  dataIndex: "fullName",
                },
                {
                  title: "Ngày tạo đơn",
                  dataIndex: "createDate",
                },
                {
                  title: "Số điện thoại",
                  dataIndex: "phone",
                },
                {
                  title: "Địa chỉ nhận hàng",
                  dataIndex: "address",
                },
                {
                  title: "Hình thức thanh toán",
                  dataIndex: "paymentType",
                },
                {
                  title: "Trạng thái",
                  dataIndex: "status",
                },
                {
                  title: "Thao tác",
                  dataIndex: "action",
                  fixed: "right",
                  align: "center",
                  render: (_, record) => {
                    return (
                      <div className="flex items-center justify-center gap-x-2">
                        <Popconfirm
                          title="Xác nhận đơn hảng"
                          description={`Bạn có chắc chắn muốn xác nhận đơn hàng này không?`}
                          okText="Xác nhận"
                          cancelText="Hủy"
                          onConfirm={() =>
                            handleChangeStatusOrder(record.orderId, 2)
                          }
                        >
                          <Tooltip title="Xác nhận đơn hàng">
                            <Button icon={<SendOutlined />} />
                          </Tooltip>
                        </Popconfirm>
                        <Popconfirm
                          title="Xác nhận hủy đơn hàng"
                          description={`Bạn có chắc chắn muốn hủy đơn hàng này không?`}
                          okText="Xác nhận"
                          cancelText="Hủy"
                          onConfirm={() =>
                            handleChangeStatusOrder(record.orderId, 3)
                          }
                        >
                          <Tooltip title="Xác nhận hủy đơn hàng">
                            <Button icon={<CloseOutlined />} />
                          </Tooltip>
                        </Popconfirm>
                        <Popconfirm
                          title="Xác nhận Ship đã nhận hàng"
                          description={`Bạn có chắc chắn muốn Xác nhận Ship đã nhận hàng này không?`}
                          okText="Xác nhận"
                          cancelText="Hủy"
                          onConfirm={() =>
                            handleChangeStatusOrder(record.orderId, 4)
                          }
                        >
                          <Tooltip title="Xác nhận Ship đã nhận hàng">
                            <Button icon={<CheckOutlined />} />
                          </Tooltip>
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
    </>
  );
}
