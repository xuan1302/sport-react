import { ShoppingCartOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Card, Col, Divider, Form, Image, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import homeApi from "../../api/home/homeApi";
import { hideLoading, showLoading } from "../../store/loadingSlice";
import { AppDispatch } from "../../store/store";

export const Route = createFileRoute("/_public/product/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedMaterial, setSelectedMaterial] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [detailProduct, setDetailProduct] = useState(null);
  const [fileList, setFileList] = useState<unknown[]>([]);
  const [filePrimary, setFilePrimary] = useState<unknown[]>([]);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };
  useEffect(() => {
    const fetchDataProduct = async (id: string | number) => {
      if (id) {
        try {
          dispatch(showLoading());
          const product = await homeApi.getProductById(id);
          setDetailProduct(product);
          let listSecondPhoto = [];
          if (product?.secondaryPhotos?.length > 0) {
            listSecondPhoto = [...product.secondaryPhotos];
            setFileList(listSecondPhoto);
          }
          setFilePrimary(product?.mainImage ? [product?.mainImage] : []);
          form.setFieldsValue({
            name: product?.name,
            description: product?.description,
            materials: product?.materials,
          });
          setSelectedMaterial(product?.materials[0] || null);
          setSelectedSize(product?.materials[0]?.sizes[0] || null);
        } catch (error) {
          console.error("Error fetching data", error);
        } finally {
          dispatch(hideLoading());
        }
      }
    };

    fetchDataProduct(id);
  }, [id]);
  const handleAddProductToMiniCard = () => {
    console.log("123");
  };
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-y-4 mt-10">
      <Form
        form={form}
        layout="vertical"
        name="dynamic_form_nest_item"
        // onFinish={onFinish}
        autoComplete="off"
      >
        <Row>
          <Col span={8}>
            {filePrimary[0]?.path && (
              <Image
                width={400}
                height={300}
                src={filePrimary[0]?.path}
                alt="Image Preview"
              />
            )}
            <div style={{ display: "flex", gap: "8px", marginTop: 8 }}>
              {fileList.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)", // Chia thành 4 cột đều nhau
                    gridTemplateRows: "repeat(2, 1fr)", // Chia thành 2 hàng đều nhau
                    gap: "10px", // Khoảng cách giữa các ô
                  }}
                >
                  {fileList.map((file, index) => (
                    <div
                      key={index}
                      className="hover-delete-icon"
                      style={{ marginTop: 0, position: "relative" }}
                    >
                      <Image
                        width={100}
                        height={100}
                        src={file?.path}
                        alt="Image Preview"
                      />
                      {/* Icon xóa khi hover */}
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          visibility: "hidden",
                          opacity: 0,
                          transition: "visibility 0s, opacity 0.3s ease",
                        }}
                        className="image-delete-icon"
                      ></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Col>

          <Col span={16}>
            <Card title={form.getFieldValue("name")} className="w-full">
              <div className="flex flex-col gap-y-4">
                <p className="font-semibold text-red-500">
                  {formatCurrency(selectedMaterial?.price)}
                </p>
                <div style={{ marginBottom: 16 }}>
                  <span>Bạn đang chọn: </span>
                  <span>{selectedMaterial?.materialName}</span>
                  <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
                    {form.getFieldValue("materials")?.map((material) => (
                      <Col key={material.materialId}>
                        <div
                          className={`item-size ${selectedMaterial.materialId === material.materialId ? "active-class" : ""}`}
                          onClick={() => {
                            setSelectedMaterial(material);
                            setSelectedSize(material?.sizes[0]);
                          }}
                        >
                          <div className="material-name">
                            {material.materialName}
                          </div>
                          <div
                            className="material-prince"
                            style={{ fontSize: "12px" }}
                          >
                            {formatCurrency(material.price)}
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <span>Bạn đang chọn: </span>
                  <span>{selectedSize?.sizeName}</span>
                  <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
                    {selectedMaterial?.sizes?.map((size) => (
                      <Col key={size.sizeId}>
                        <div
                          className={`item-size-material ${size.sizeId === selectedSize?.sizeId ? "active-class" : ""}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size.sizeName}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>

                <div className="flex items-center gap-x-2">
                  <Button type="primary" size="large">
                    Mua ngay
                  </Button>
                  <Button
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddProductToMiniCard}
                  >
                    Thêm vào giỏ
                  </Button>
                </div>
              </div>
            </Card>
          </Col>

          <Col span={24}>
            <Divider className="mt-[50px]" orientation="left">
              Thông tin sản phẩm
            </Divider>

            <div
              dangerouslySetInnerHTML={{
                __html: form.getFieldValue("description"),
              }}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
