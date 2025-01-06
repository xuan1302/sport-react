import {
  DeleteFilled,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDisclosure } from "@mantine/hooks";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Button, Card, Input, Popconfirm, Table, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import CreateRoleModal from "../../../components/roles/create-roles";
import adminRolesApi from "../../../api/admin.rolesApi";
import { debounce } from "lodash";

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
    setPagination(newPagination);
    fetchRoles(keyword, newPagination.current, newPagination.pageSize);
  };
  const fetchRoles = useCallback(
    async (searchKeyword = "", currentPage = 1, pageSize = 10) => {
      setLoading(true);
      try {
        const data = await adminRolesApi.getListRoles({
          keyword: searchKeyword,
          pageSize,
          pageNumber: currentPage,
        });
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

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    if (openModal) return;

    setRoleId(undefined);
  }, [openModal]);

  const handleSearch = useCallback(
    debounce((value: string) => {
      fetchRoles(value, 1, pagination.pageSize);
    }, 500)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    handleSearch(e.target.value);
  };

  const handleDeleteRole = async (id: string) => {
    setLoading(true);
    try {
      await adminRolesApi.delete(id);
      await fetchRoles();
      notification.success({
        message: "Xóa role thành công",
        description: `Thành công`,
      });
    } catch (error) {
      notification.error({
        message: "Xóa role thất bại",
        description: `Thất bại`,
      });
    } finally {
      setLoading(false);
    }
  };

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
                  value={keyword}
                  onChange={handleInputChange}
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
                  render: (_, __, index) =>
                    (pagination.current - 1) * pagination.pageSize + index + 1,
                },
                {
                  title: "Mã vai trò",
                  dataIndex: "code",
                },
                {
                  title: "Tên vai trò",
                  dataIndex: "roleName",
                },
                {
                  title: "Ngày tạo",
                  dataIndex: "createAt",
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
                            setRoleId(record.roleId);
                            handleOpenModal.open();
                          }}
                        ></Button>

                        <Popconfirm
                          title="Xoá vai trò"
                          description={`Bạn có chắc chắn muốn xoá vai trò ${record.roleName} không?`}
                          okText="Xoá"
                          cancelText="Hủy"
                          onConfirm={() => handleDeleteRole(record.roleId)} // Truyền id vào hàm
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
              rowKey="roleId"
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

      <CreateRoleModal
        key={roleId || "create-new"}
        roleId={roleId}
        open={openModal}
        onClose={(isSuccess) => {
          setRoleId(undefined);
          handleOpenModal.close();
          if (isSuccess) {
            fetchRoles();
          }
        }}
        onCancel={() => handleOpenModal.close()}
      />
    </>
  );
}
