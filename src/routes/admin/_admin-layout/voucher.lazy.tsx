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
  DatePicker,
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
import { hideLoading, showLoading } from "../../../store/loadingSlice";
import { AppDispatch } from "../../../store/store";
import moment from "moment";
import CreateVoucherModal from "../../../components/voucher/create-voucher";

export const Route = createLazyFileRoute("/admin/_admin-layout/voucher")({
  component: RouteComponent,
});

function RouteComponent() {
  const [openModal, handleOpenModal] = useDisclosure(false);
  const [voucherId, setVoucherId] = useState<string | undefined>();
  const [form] = Form.useForm();
  useEffect(() => {
    if (openModal) return;

    setVoucherId(undefined);
  }, [openModal]);

  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const fetchVoucher = useCallback(
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
    fetchVoucher();
  }, [fetchVoucher]);

  const handleTableChange = (newPagination: any) => {
    setPagination(newPagination);
    fetchVoucher(
      form.getFieldValue("keywork"),
      form.getFieldValue("status"),
      newPagination.current,
      newPagination.pageSize
    );
  };
  const onFinish = async (values: any) => {
    console.log(values);
    fetchVoucher(
      form.getFieldValue("keywork") || "",
      form.getFieldValue("status") || "",
      1,
      pagination.pageSize
    );
  };

  const handleReset = () => {
    form.resetFields();
    fetchVoucher(
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
      await fetchVoucher();
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
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between gap-x-2">
          <span>
            <SettingOutlined />
            <span>Quản lý Voucher</span>
          </span>
          <Button
            size="large"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal.open()}
          >
            Tạo voucher
          </Button>
        </div>

        <Card>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Quản lý Voucher</div>
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
                    placeholder="Tìm voucher..."
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
                  title: "Mã voucher",
                  dataIndex: "categoryName",
                },
                {
                  title: "Tên voucher",
                  dataIndex: "parentName",
                },
                {
                  title: "Ngày bắt đầu",
                  dataIndex: "categoryDescription",
                },
                {
                  title: "Ngày kết thúc",
                  dataIndex: "categoryDescription",
                },
                {
                  title: "Kiểu voucher",
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
                      {status ? "Đang hoạt động" : "Đã hết hạn"}
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
                            setVoucherId(record.categoryId);
                            handleOpenModal.open();
                          }}
                        ></Button>
                        <Popconfirm
                          title="Xoá voucher"
                          description="Bạn có chắc chắn muốn xoá voucher này không?"
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

      <CreateVoucherModal
        key={voucherId || "create-new"}
        open={openModal}
        width={600}
        voucherId={voucherId}
        onClose={(isSuccess) => {
          setVoucherId(undefined);
          if (isSuccess) {
            handleOpenModal.close();
            fetchVoucher();
          }
        }}
        onCancel={() => handleOpenModal.close()}
      />
    </>
  );
}
