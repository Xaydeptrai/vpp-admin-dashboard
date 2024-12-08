/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnType } from "antd/es/table";
import type { Key } from "react";
import { FilterDropdownProps } from "antd/es/table/interface";

interface DataItem {
  id: number;
  [key: string]: unknown;
}

interface DataTableProps {
  columns: (ColumnType<DataItem> | { searchable: boolean; dataIndex: string })[];
  data: DataItem[];
  title?: string;
}

const DataTable = forwardRef<HTMLDivElement | null, DataTableProps>(
  ({ columns, data, title }, ref) => {
    const tableRef = useRef<HTMLDivElement | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [searchedColumn, setSearchedColumn] = useState<string>("");
    const [filteredData, setFilteredData] = useState<DataItem[]>(data);

    useImperativeHandle(ref, () => tableRef.current!);

    const handleSearch = (
      selectedKeys: string[],
      confirm: () => void,
      dataIndex: string
    ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);

      // Lọc dữ liệu theo từ khóa
      setFilteredData(
        data.filter((item) =>
          item[dataIndex]?.toString().toLowerCase().includes(selectedKeys[0].toLowerCase())
        )
      );
    };

    const handleReset = (clearFilters: (() => void) | undefined) => {
      clearFilters?.();
      setSearchText("");
      setFilteredData(data);
    };

    const getColumnSearchProps = (dataIndex: string): ColumnType<DataItem> => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: FilterDropdownProps) => (
        <div style={{ padding: 8 }}>
          <Input
            autoFocus
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys([e.target.value])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value: Key | boolean, record: DataItem): boolean => {
        const recordValue = record[dataIndex];
        if (recordValue === undefined || recordValue === null) {
          return false;
        }
        return recordValue.toString().toLowerCase().includes(value.toString().toLowerCase());
      },
    });

    const updatedColumns = columns.map((col) => {
      if ("searchable" in col && col.searchable) {
        return {
          ...col,
          ...getColumnSearchProps(col.dataIndex as string),
        };
      }
      return col;
    });

    return (
      <div ref={tableRef}>
        {title && <h2>{title}</h2>}
        <Table
          columns={updatedColumns as ColumnType<DataItem>[]} // Đảm bảo kiểu dữ liệu chính xác
          dataSource={filteredData}
          rowKey="id" // Sử dụng `rowKey` là 'id' hoặc key duy nhất từ dữ liệu của bạn
          pagination={{
            pageSize: 10, // Đặt kích thước trang mặc định
            showSizeChanger: true,
          }}
        />
      </div>
    );
  }
);

DataTable.displayName = "DataTable";

export default DataTable;
