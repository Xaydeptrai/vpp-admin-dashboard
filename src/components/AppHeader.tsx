'use client'; // Add this if using client-side components

import React from 'react';
import { Layout } from 'antd';
import { RadarChartOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header className="!bg-white border-b border-[#f1f1f1] flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <RadarChartOutlined className="text-3xl" />
        <div>VPP-Admin</div>
      </div>
      <div className="flex items-center gap-2">
        <Avatar size={36} src="/profile.png" />
        <div>Xaydeptrai</div>
      </div>
    </Header>
  );
};

export default AppHeader;
