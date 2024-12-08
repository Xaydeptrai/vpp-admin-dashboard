import { Card, Typography } from "antd";
import { ReactNode } from "react";

const { Title } = Typography;

// Define types for the props of the card component
interface CardComponentProps {
  icon: ReactNode;
  count: number;
  label: string;
  bgColor: string;
}

const CardComponent = ({ icon, count, label, bgColor }: CardComponentProps) => {
  return (
    <Card>
      <div className="flex items-center gap-16">
        <div className={`text-2xl flex items-center justify-center rounded-md h-12 w-12 ${bgColor}`}>
          {icon}
        </div>
        <div>
          <Title level={4} style={{ marginBottom: 0 }}>
            {count}
          </Title>
          <Typography>{label}</Typography>
        </div>
      </div>
    </Card>
  );
};

export default CardComponent;
