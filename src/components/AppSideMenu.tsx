'use client';
import { Menu } from 'antd';
import type { MenuProps } from 'antd'; // Import the type for Menu items
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function AppSideMenu() {
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState<string>(''); // Start with an empty string

  // Initialize selectedKey on first render based on pathname
  useEffect(() => {
    const pathMap: Record<string, string> = {
      '/': '1',
      '/products': '2',
      '/orders': '3',
      '/customers': '4',
    };

    // Get the matching key from pathname, or default to '1' if no match is found
    const matchedKey = Object.entries(pathMap).find(([key]) =>
      pathname.startsWith(key)
    )?.[1];

    setSelectedKey(matchedKey || '1'); // Default to '1' (Home) if no match is found
  }, []);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link href="/">Home</Link>,
    },
    {
      key: '2',
      label: <Link href="/products">Products</Link>,
    },
    {
      key: '3',
      label: <Link href="/orders">Orders</Link>,
    },
    {
      key: '4',
      label: <Link href="/customers">Customers</Link>,
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key); // Update selected key when a menu item is clicked
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]} // Pass selectedKey as an array
      items={items}
      onClick={handleMenuClick} // Handle the menu item click to update selected key
    />
  );
}
