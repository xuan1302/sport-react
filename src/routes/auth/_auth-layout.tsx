import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Col, Row } from "antd";
import authBg from "../../assets/auth-bg.png";

export const Route = createFileRoute("/auth/_auth-layout")({
  beforeLoad: ({ context }) => {
    console.log(context);
    // if (!!context?.auth) {
    //   throw redirect({
    //     to: "/admin",
    //   });
    // }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-[100vw] max-h-[100vh] overflow-hidden h-[100vh] w-full">
      <Row gutter={[24, 24]} className="h-full">
        <Col span={0} md={16}>
          <img
            src={authBg}
            alt="auth-bg"
            className="object-cover w-full h-full"
          />
        </Col>

        <Col span={24} md={8}>
          <div className="flex items-center justify-center w-full h-full flex-col gap-y-4">
            <Outlet />
          </div>
        </Col>
      </Row>
    </div>
  );
}
