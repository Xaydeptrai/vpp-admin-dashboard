const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function listProducts() {
  const res = await fetch(`${API_URL}/api/v1/products`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Error');
  }
  return data.result.items;
}

export async function fetchProductById(id: number) {
  const res = await fetch(`${API_URL}/api/v1/products/${id}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Error');
  }
  console.log(data.result)
  return data.result;
}
