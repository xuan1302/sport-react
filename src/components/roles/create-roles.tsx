import {
  Col,
  Form,
  Input,
  Modal,
  ModalProps,
  Row,
  Tree,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import adminRolesApi from "../../api/admin.rolesApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { hideLoading, showLoading } from "../../store/loadingSlice";

interface CreateRoleModalProps extends ModalProps {
  roleId?: string;
  onClose: (isSuccess?: boolean) => void;
}

export default function CreateRoleModal({
  roleId,
  onClose,
  ...props
}: CreateRoleModalProps) {
  const [form] = useForm();
  const [checkedKeys, setCheckedKeys] = useState([]);
  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };
  useEffect(() => {
    if (roleId) {
      (async () => {
        try {
          const detailRole = await adminRolesApi.getRoleById(roleId);
          form.setFieldsValue({
            code: detailRole.roleCode,
            roleName: detailRole.roleName,
          });
          const listId = detailRole?.permissions?.map((item) =>
            String(item.id)
          );
          setCheckedKeys(listId);
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      })();
    }
  }, [roleId]);
  const [listPermission, setPermission] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const permission = await adminRolesApi.getPermissions();
        setPermission(convertToTreeData(permission));
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    })();
  }, []);
  const dispatch = useDispatch<AppDispatch>();
  const onFinish = async (values: unknown) => {
    dispatch(showLoading());
    if (roleId) {
      try {
        await adminRolesApi.update(roleId, {
          code: values.code,
          roleName: values.roleName,
          permissionsIds: checkedKeys,
        });
        notification.success({
          message: "Chỉnh sửa vai trò thành công",
          description: `Thành công`,
        });
        onClose(true);
      } catch (err) {
        notification.error({
          message: "Chỉnh sửa vai trò thất bại",
          description: err.message || "Đã xảy ra lỗi",
        });
      }
    } else {
      try {
        const role = await adminRolesApi.create({
          code: values.code.toUpperCase(),
          roleName: values.roleName,
          permissionsIds: checkedKeys,
        });
        form.resetFields();
        notification.success({
          message: "Thêm mới role thành công",
          description: `Thành công`,
        });
        onClose(true);
      } catch (err) {
        notification.error({
          message: "Thêm mới role thất bại",
          description: err.message || "Đã xảy ra lỗi",
        });
      }
    }
    dispatch(hideLoading());
  };

  const convertToTreeData = (permissions) => {
    return permissions.map((item) => {
      const treeNode = {
        title: item.description, // Ánh xạ `description` thành `title`
        key: item.permissionId.toString(), // Sử dụng `permissionId` làm `key`
      };

      // Nếu có children, xử lý đệ quy
      if (item.permissionChildren && item.permissionChildren.length > 0) {
        treeNode.children = convertToTreeData(item.permissionChildren);
      }

      return treeNode;
    });
  };
  const handleCancel = () => {
    setCheckedKeys([]);
    onClose();
    form.resetFields();
  };
  return (
    <Modal
      {...props}
      title={roleId ? "Chỉnh sửa vai trò" : "Thêm mới vai trò"}
      destroyOnClose={true}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText={roleId ? "Cập nhật" : "Thêm mới"}
      width={500}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={[12, 0]}>
          <Col span={24}>
            <Form.Item
              label="Mã vai trò"
              rules={[
                { required: true, message: "Vui lòng nhập mã vai trò ..." },
                {
                  pattern: /^[A-Za-z0-9_]*$/,
                  message: "Vui lòng chỉ nhập số, chữ hoặc dấu gạch dưới!",
                },
              ]}
              name="code"
              className="!mb-2"
            >
              <Input placeholder="Nhập mã vai trò..." />
            </Form.Item>

            <Form.Item
              label="Tên vai trò"
              rules={[
                { required: true, message: "Vui lòng nhập tên vai trò ..." },
              ]}
              name="roleName"
              className="!mb-2"
            >
              <Input placeholder="Nhập tên vai trò..." />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Tree
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              checkable
              defaultExpandAll
              defaultExpandedKeys={checkedKeys}
              defaultSelectedKeys={checkedKeys}
              defaultCheckedKeys={checkedKeys}
              treeData={listPermission}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
