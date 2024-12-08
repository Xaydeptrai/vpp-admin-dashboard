"use client";
import React, { useRef } from "react";
import ProductsTable from "../../components/ProductsTable ";


const ProductTable = () =>{
  const productTableRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <ProductsTable ref={productTableRef} />
    </div>
  );
}

export default ProductTable;
