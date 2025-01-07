import React, { useCallback, useEffect, useState } from "react";
import { EyeOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Input, Table } from "antd";
import { debounce } from "lodash";
import moment from "moment";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import adminCustomerApi from "../../../api/admin.customerApi";

export const Route = createLazyFileRoute("/admin/_admin-layout/customer")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchCustomer = useCallback(
    async (
      searchKeyword = keyword,
      currentPage = pagination.current,
      pageSize = pagination.pageSize
    ) => {
      setLoading(true);
      try {
        const data = await adminCustomerApi.listCustomer({
          keyword: searchKeyword,
          pageSize,
          pageNumber: currentPage,
          startDate: selectedRange[0] || "",
          endDate: selectedRange[1] || "",
        });
        setDataSource(data.list || []);
        setPagination((prev) => ({
          ...prev,
          total: data.totalSize || 0,
        }));
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    },
    [keyword, pagination.current, pagination.pageSize, selectedRange]
  );

  const handleSearch = useCallback(
    debounce((value) => {
      setKeyword(value);
      fetchCustomer(value, 1, pagination.pageSize);
    }, 500),
    [pagination.pageSize, fetchCustomer]
  );

  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  };

  const handleRangeChange = (dates, dateStrings) => {
    const converted = dateStrings.map((date) =>
      date ? moment(date, "DD/MM/YYYY").format("YYYY-MM-DD") : ""
    );
    setSelectedRange(converted);
    fetchCustomer(keyword, 1, pagination.pageSize);
  };

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
    fetchCustomer(keyword, newPagination.current, newPagination.pageSize);
  };

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-2">
        <UserOutlined />
        <span>Quản lý khách hàng</span>
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
                onChange={handleInputChange}
              />

              <DatePicker.RangePicker
                format="DD/MM/YYYY"
                size="large"
                className="w-[400px]"
                onChange={handleRangeChange}
              />
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
                title: "Ngày đăng ký",
                dataIndex: "registrationDate",
                render: (date) => moment(date).format("DD/MM/YYYY"),
              },
              {
                title: "Họ và tên",
                dataIndex: "fullName",
              },
              {
                title: "Tài khoản",
                dataIndex: "userName",
              },
              {
                title: "Email",
                dataIndex: "email",
              },
              {
                title: "Số điện thoại",
                dataIndex: "phone",
              },
              {
                title: "Địa chỉ",
                dataIndex: "address",
              },
              {
                title: "Lịch sử mua hàng",
                dataIndex: "action",
                fixed: "right",
                align: "center",
                render: (_, record) => (
                  <Button
                    icon={<EyeOutlined />}
                    // onClick={() =>
                    //   navigate({
                    //     to: "/admin/customer-history/$id",
                    //     params: { id: record.id },
                    //   })
                    // }
                  >
                    Xem
                  </Button>
                ),
              },
            ]}
            loading={loading}
            rowKey="customerId"
            dataSource={dataSource}
            pagination={{
              ...pagination,
              showSizeChanger: true,
            }}
            onChange={handleTableChange}
          />
        </div>
      </Card>
    </div>
  );
}
