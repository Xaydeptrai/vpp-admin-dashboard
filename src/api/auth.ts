const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function login(email: string, password: string): Promise<{ token: string }> {
    const res = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    if (!res.ok) {
      throw new Error('Failed to login');
    }
  
    const data = await res.json();
    return { token: data.result.token };
  }
  
