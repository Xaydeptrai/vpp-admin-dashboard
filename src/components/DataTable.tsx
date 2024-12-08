/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, forwardRef } from "react";
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

const DataTable = forwardRef<HTMLDivElement, DataTableProps>(({ columns, data, title }, ref) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");
  const [filteredData, setFilteredData] = useState<DataItem[]>(data);

  const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: string) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);

    // Filter data based on the search term
    setFilteredData(
      data.filter(item =>
        item[dataIndex]?.toString().toLowerCase().includes(selectedKeys[0].toLowerCase())
      )
    );
  };

  const handleReset = (clearFilters: (() => void) | undefined) => {
    clearFilters?.();
    setSearchText("");
    setFilteredData(data);
  };

  // Add search functionality to the columns
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
    // Fix the onFilter type mismatch by ensuring value is treated as Key (string | number)
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
    <div ref={ref}>
      {title && <h2>{title}</h2>}
      <Table
        columns={updatedColumns as ColumnType<DataItem>[]} // Ensure the columns are typed correctly
        dataSource={filteredData}
        rowKey="id" // Use rowKey as 'id' or another unique key from your data
        pagination={{
          pageSize: 10, // Set default page size
          showSizeChanger: true,
        }}
      />
    </div>
  );
});

DataTable.displayName = "DataTable"; 

export default DataTable;