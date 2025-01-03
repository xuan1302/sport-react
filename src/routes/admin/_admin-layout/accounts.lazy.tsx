import {
  EditOutlined,
  EllipsisOutlined,
  KeyOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDisclosure } from "@mantine/hooks";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Button, Card, Dropdown, Input, MenuProps, Table } from "antd";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import adminAccountApi from "../../../api/admin.accountApi";
import ChangePasswordModal from "../../../components/accounts/changePassword";
import CreateAccountModal from "../../../components/accounts/create-account";

export const Route = createLazyFileRoute("/admin/_admin-layout/accounts")({
  component: RouteComponent,
});

function RouteComponent() {
  const [openModal, handlerOpenModal] = useDisclosure(false);
  const [openModalChangePassword, handlerOpenModalChangePassword] =
    useDisclosure(false);
  const [accountId, setAccountId] = useState<string | undefined>();
  const [dataSource, setDataSource] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [visibleMenuRowKey, setVisibleMenuRowKey] = useState<string | null>(
    null
  );
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setVisibleMenuRowKey(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const fetchAccounts = useCallback(
    async (searchKeyword = "", currentPage = 1, pageSize = 10) => {
      setLoading(true);
      try {
        const data = await adminAccountApi.getListAccount({
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
    fetchAccounts();
  }, [fetchAccounts]);

  // Hàm debounce để gọi API khi nhập ô tìm kiếm
  const handleSearch = useCallback(
    debounce((value: string) => {
      fetchAccounts(value, 1, pagination.pageSize); // Reset về trang đầu khi tìm kiếm
    }, 500), // Chờ 500ms sau khi người dùng dừng nhập
    [fetchAccounts, pagination.pageSize]
  );

  // Xử lý thay đổi ô tìm kiếm
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value); // Cập nhật giá trị keyword
    handleSearch(e.target.value); // Gọi hàm debounce
  };

  // Xử lý khi người dùng thay đổi trang hoặc số mục trên trang
  const handleTableChange = (newPagination: any) => {
    setPagination(newPagination); // Cập nhật thông tin phân trang
    fetchAccounts(keyword, newPagination.current, newPagination.pageSize); // Gọi API với phân trang mới
  };

  //   const items = [
  //     {
  //       key: "1",
  //       label: (
  //         <span
  //           onClick={() => handleMenuAction("activate", recordKey)}
  //           style={{ cursor: "pointer" }}
  //         >
  //           <PauseOutlined style={{ marginRight: 8 }} />
  //           Cấp phép hoạt động{visibleMenuRowKey} {recordKey}
  //         </span>
  //       ),
  //     },
  //     {
  //       key: "2",
  //       label: (
  //         <span onClick={() => handleMenuAction("changePassword", recordKey)}>
  //           <KeyOutlined style={{ marginRight: 8 }} />
  //           Đổi mật khẩu
  //         </span>
  //       ),
  //     },
  //     {
  //       key: "3",
  //       label: (
  //         <span
  //           style={{ color: "orange" }}
  //           onClick={() => handleMenuAction("edit", recordKey)}
  //         >
  //           <EditOutlined style={{ marginRight: 8 }} />
  //           Sửa
  //         </span>
  //       ),
  //     },
  //   ];

  //   return (
  //     <Dropdown
  //       menu={{ items }}
  //       trigger={["click"]}
  //       open={visibleMenuRowKey === recordKey}
  //       onOpenChange={(open) => {
  //         if (!open) setVisibleMenuRowKey(null);
  //       }}
  //     >
  //       <div ref={menuRef} />
  //     </Dropdown>
  //   );
  // };

  const handleMenuClick = (id: string) => (e: React.MouseEvent) => {
    console.log(`Clicked on menu item with ID: ${id}`);
  };

  const getMenuItems = (status: boolean): MenuProps["items"] => [
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {status ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          {status ? "Dừng hoạt động" : "Cấp phép hoạt động"}
        </div>
      ),
      key: "activate",
    },
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <KeyOutlined />
          Đổi mật khẩu
        </div>
      ),
      key: "changePassword",
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#fff",
            backgroundColor: "#fd5c00",
            padding: "5px 10px",
            borderRadius: "4px",
          }}
        >
          <EditOutlined />
          Sửa
        </div>
      ),
      key: "edit",
      style: { backgroundColor: "#fd5c00" }, // Đặt màu nền cho menu item
    },
  ];
  const menuProps = (id: string, status: boolean) => ({
    items: getMenuItems(status),
    onClick: (info: { key: string }) => {
      console.log(`Menu clicked: ${info.key} for ID: ${id}`);
      switch (info.key) {
        case "activate":
          // Logic cấp phép hoạt động
          console.log(`Cấp phép hoạt động cho ID: ${id}`);
          break;

        case "changePassword":
          // Logic đổi mật khẩu
          console.log(`Đổi mật khẩu cho ID: ${id}`);
          setAccountId(id);
          handlerOpenModalChangePassword.open();
          break;

        case "edit":
          // Logic sửa tài khoản
          console.log(`Sửa tài khoản ID: ${id}`);
          // Ví dụ: Mở modal hoặc điều hướng đến trang chỉnh sửa
          setAccountId(id);
          handlerOpenModal.open();
          break;

        default:
          console.error("Hành động không xác định!");
      }
    },
  });
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <UserOutlined />
          <span>Quản lý tài khoản</span>
        </div>

        <Card>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Quản lý tài khoản</div>

              <div className="flex items-center gap-x-4">
                <Input
                  prefix={<SearchOutlined />}
                  placeholder="Tìm tài khoản..."
                  size="large"
                  value={keyword}
                  onChange={handleInputChange} // Gọi hàm xử lý thay đổi
                />

                <Button
                  size="large"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handlerOpenModal.open()}
                >
                  Tạo tài khoản
                </Button>
              </div>
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
                  title: "Họ và tên",
                  dataIndex: "fullName",
                },
                {
                  title: "Email",
                  dataIndex: "email",
                },
                {
                  title: "Số điện thoại",
                  dataIndex: "phoneNumber",
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
                  title: "Ngày tạo",
                  dataIndex: "createAt",
                },
                {
                  title: "Vai trò",
                  dataIndex: "roles",
                  render: (roles: { roleId: number; roleName: string }[]) =>
                    roles?.map((role) => role.roleName).join(", "),
                },
                {
                  title: "Thao tác",
                  dataIndex: "action",
                  fixed: "right",
                  align: "center",
                  render: (text, record) => (
                    <Dropdown
                      menu={menuProps(record.id, record.status)}
                      trigger={["click"]}
                    >
                      <EllipsisOutlined
                        style={{
                          fontSize: "24px",
                          color: "#fd5c00",
                          cursor: "pointer",
                        }}
                        onClick={handleMenuClick(record.id)}
                      />
                    </Dropdown>
                  ),
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
              onChange={handleTableChange}
            />
          </div>
        </Card>
      </div>

      <CreateAccountModal
        key={accountId || "create-new"}
        accountId={accountId}
        open={openModal}
        onClose={(isSuccess) => {
          setAccountId(undefined);
          handlerOpenModal.close();
          if (isSuccess) {
            fetchAccounts();
          }
        }}
        onCancel={() => handlerOpenModal.close()}
        cancelText="Hủy"
        okText="Tạo"
      />
      <ChangePasswordModal
        accountId={accountId}
        open={openModalChangePassword}
        onClose={(isSuccess) => {
          setAccountId(undefined);
          handlerOpenModalChangePassword.close();
          if (isSuccess) {
            fetchAccounts();
          }
        }}
        onCancel={() => handlerOpenModalChangePassword.close()}
        cancelText="Hủy"
        okText="Tạo"
      />
    </>
  );
}

export default RouteComponent;
