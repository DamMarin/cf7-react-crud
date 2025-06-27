import { z } from "zod";

const API_URL = import.meta.env.VITE_API_URL;
const tenantId = import.meta.env.VITE_TENANT_ID;

export const productSchema = z.object({
  id: z.coerce.number().int(),
  name: z.string().min(1, "Required"),
  slug: z
    .string()
    .min(1, "Required")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Slug must use only Latin letters, numbers, - or _",
    ),
  description: z.string().optional(),
  image: z.string().url("Must be a valid URL").optional(),
  price: z.coerce.number().nonnegative("Must be a non-negative number"),
  sort: z.coerce.number().int().min(0, "Must be a non-negative integer"),
  is_active: z.boolean(),
  is_favorite: z.boolean(),
  category_id: z.coerce.number().int().min(1, "Category is required"),
});

export const productFormSchema = productSchema.omit({ id: true });

export type Product = z.infer<typeof productSchema>;

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}tenants/${tenantId}/products/`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  console.log("products response", data);
  return data;
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}tenants/${tenantId}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return await res.json();
}

export async function updateProduct(
  id: number,
  data: {
    description?: string | undefined;
    image?: string | undefined;
    is_active: boolean;
    is_favorite: boolean;
    name: string;
    price: number;
    slug: string;
    sort: number;
  },
): Promise<Product> {
  const res = await fetch(`${API_URL}tenants/${tenantId}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return await res.json();
}

export async function createProduct(
  data: Omit<Product, "id">,
): Promise<Product> {
  const res = await fetch(`${API_URL}tenants/${tenantId}/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return await res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${API_URL}tenants/${tenantId}/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
}
