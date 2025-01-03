import {
  DeleteFilled,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDisclosure } from "@mantine/hooks";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Button, Card, Input, Popconfirm, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import CreateRoleModal from "../../../components/roles/create-roles";
import adminRolesApi from "../../../api/admin.rolesApi";

export const Route = createLazyFileRoute("/admin/_admin-layout/roles")({
  component: RouteComponent,
});

function RouteComponent() {
  const [openModal, handleOpenModal] = useDisclosure(false);
  const [roleId, setRoleId] = useState<string | undefined>();

  const [dataSource, setDataSource] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const handleTableChange = (newPagination: any) => {
    setPagination(newPagination); // Cập nhật thông tin phân trang
    fetchRoles(keyword, newPagination.current, newPagination.pageSize); // Gọi API với phân trang mới
  };
  const fetchRoles = useCallback(
    async (searchKeyword = "", currentPage = 1, pageSize = 10) => {
      setLoading(true);
      try {
        const data = await adminRolesApi.list({
          keyword: searchKeyword,
          pageSize,
          pageNumber: currentPage,
        });
        console.log(data);
        setDataSource(data.list || []);
        setPagination((prev) => ({
          ...prev,
          total: data.totalSize || 0,
        }));
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    if (openModal) return;

    setRoleId(undefined);
  }, [openModal]);

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <UserOutlined />
          <span>Quản lý vai trò</span>
        </div>

        <Card>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Quản lý vai trò</div>

              <div className="flex items-center gap-x-4">
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Tìm tên vai trò..."
                  size="large"
                />

                <Button
                  size="large"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleOpenModal.open()}
                >
                  Thêm vai trò
                </Button>
              </div>
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
                },
                {
                  title: "Tên vai trò",
                  dataIndex: "name",
                },
                {
                  title: "Trạng thái",
                  dataIndex: "status",
                },
                {
                  title: "Ngày tạo",
                  dataIndex: "createdAt",
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
                            setRoleId(record.id);
                            handleOpenModal.open();
                          }}
                        ></Button>

                        <Popconfirm
                          title="Xoá vai trò"
                          description="
                        Bạn có chắc chắn muốn xoá vai trò này không?"
                          okText="Xoá"
                          cancelText="Hủy"
                        >
                          <Button icon={<DeleteFilled />} />
                        </Popconfirm>
                      </div>
                    );
                  },
                },
              ]}
              dataSource={dataSource}
              rowKey="id"
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
              }}
              onChange={handleTableChange} // Xử lý thay đổi phân trang
            ></Table>
          </div>
        </Card>
      </div>

      <CreateRoleModal
        roleId={roleId}
        open={openModal}
        onClose={() => handleOpenModal.close()}
        onCancel={() => handleOpenModal.close()}
      />
    </>
  );
}
