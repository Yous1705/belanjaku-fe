export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const isFormData = options.body instanceof FormData;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(isFormData
        ? {}
        : {
            "Content-Type": "application/json",
          }),

      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
}
