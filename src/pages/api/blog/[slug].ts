import type { APIRoute } from 'astro';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://yupi-dev.up.railway.app';

export const GET: APIRoute = async ({ params }) => {
  const upstream = `${API_BASE_URL}/blog/${params.slug}`;

  try {
    const res = await fetch(upstream);
    const data = await res.text();
    return new Response(data, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to reach API' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
