"use client";
import { Row, Col } from "antd";
import CardComponent from "@/components/Card"; // Import the new CardComponent
import { CrownOutlined, HddOutlined, FileProtectOutlined, UserOutlined } from "@ant-design/icons";

export default function Home() {
  return (
    <Row gutter={16}>
      <Col span={24}>
        <Row gutter={16}>
        <Col span={6}>
            <CardComponent
              icon={<HddOutlined />}
              count={56}
              label="Completed Orders"
              bgColor="bg-green-200"
            />
          </Col>

          <Col span={6}>
            <CardComponent
              icon={<CrownOutlined />}
              count={24}
              label="Uncompleted Orders"
              bgColor="bg-red-200"
            />
          </Col>

          <Col span={6}>
            <CardComponent
              icon={<FileProtectOutlined />}
              count={17}
              label="Today Orders"
              bgColor="bg-yellow-200"
            />
          </Col>

          <Col span={6}>
            <CardComponent
              icon={<UserOutlined />}
              count={120}
              label="Total Customer"
              bgColor="bg-blue-200"
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
