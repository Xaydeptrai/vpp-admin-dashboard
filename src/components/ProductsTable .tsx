"use client";

import React, { useEffect, useState, useRef, forwardRef } from "react";
import { Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { listProducts } from "../api/product";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
  catalogName: string;
  createDate: string;
  updateDate: string;
}

const ProductsTable = forwardRef<HTMLDivElement, object>((props, ref) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref) {
      if (typeof ref === "function") {
        ref(tableRef.current);
      } else if (ref && "current" in ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = tableRef.current;
      }
    }
  }, [ref]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await listProducts();
        setProducts(items);
      } catch (error) {
        console.error("Failed to load products:", error);
        message.error("Không thể tải danh sách sản phẩm!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: ColumnsType<Product> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => (
        <Image
          src={imageUrl}
          width={50}
          height={50}
          alt="Product"
        />
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "catalogName",
      key: "catalogName",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      key: "createDate",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateDate",
      key: "updateDate",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div ref={tableRef}>
      <div className="text-3xl mb-5 font-semibold">Danh sách sản phẩm</div>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
      />
    </div>
  );
});

ProductsTable.displayName = "ProductsTable";

export default ProductsTable;
