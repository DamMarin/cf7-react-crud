import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProduct,
  getProduct,
  type Product,
  productFormSchema,
  updateProduct,
} from "../api/products";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type ProductPageProps = {
  mode?: "edit" | "create";
};

const ProductPage = ({ mode }: ProductPageProps) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const isEdit = mode === "edit" || (!!productId && mode !== "create");
  const [loading, setLoading] = useState(isEdit);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Omit<Product, "id">>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      image: "",
      price: 0,
      sort: 0,
      is_active: false,
      is_favorite: false,
      category_id: 1, // Default to 1
    },
  });

  useEffect(() => {
    if (isEdit && productId) {
      getProduct(Number(productId))
        .then((data) => {
          const values = {
            name: data.name ?? "",
            slug: data.slug ?? "",
            description: data.description ?? "",
            image: data.image ?? "",
            price: data.price ?? 0,
            sort: data.sort ?? 0,
            is_active: data.is_active ?? false,
            is_favorite: data.is_favorite ?? false,
            category_id: 1,
          };
          reset(values);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [isEdit, productId, reset]);

  const onSubmit = async (data: Omit<Product, "id">) => {
    try {
      if (isEdit && productId) {
        await updateProduct(Number(productId), data);
        toast.success("Product updated!");
      } else {
        await createProduct(data);
        toast.success("Product created!");
      }
      navigate("/products");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto mt-12 p-8 border rounded-md space-y-6 bg-white"
        autoComplete="off"
      >
        <h1 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Product" : "Create New Product"}
        </h1>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <div className="text-cf-dark-red text-sm">
              {errors.name.message}
            </div>
          )}
        </div>
        <div>
          <Label className="mb-1" htmlFor="slug">
            Slug
          </Label>
          <Input id="slug" {...register("slug")} />
          {errors.slug && (
            <div className="text-cf-dark-red text-sm">
              {errors.slug.message}
            </div>
          )}
        </div>
        <div>
          <Label className="mb-1" htmlFor="description">
            Description
          </Label>
          <Textarea id="description" rows={3} {...register("description")} />
          {errors.description && (
            <div className="text-cf-dark-red text-sm">
              {errors.description.message}
            </div>
          )}
        </div>
        <div>
          <Label className="mb-1" htmlFor="image">
            Image URL
          </Label>
          <Input id="image" {...register("image")} />
          {errors.image && (
            <div className="text-cf-dark-red text-sm">
              {errors.image.message}
            </div>
          )}
        </div>
        <div>
          <Label className="mb-1" htmlFor="price">
            Price (€)
          </Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <div className="text-cf-dark-red text-sm">
              {errors.price.message}
            </div>
          )}
        </div>
        <div>
          <Label className="mb-1" htmlFor="sort">
            Sort Order
          </Label>
          <Input
            id="sort"
            type="number"
            {...register("sort", { valueAsNumber: true })}
          />
          {errors.sort && (
            <div className="text-cf-dark-red text-sm">
              {errors.sort.message}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is_active"
            checked={watch("is_active")}
            onCheckedChange={(v) => setValue("is_active", v)}
          />
          <Label htmlFor="is_active">Active</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="is_favorite"
            checked={watch("is_favorite")}
            onCheckedChange={(v) => setValue("is_favorite", v)}
          />
          <Label htmlFor="is_favorite">Favorite</Label>
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </>
  );
};

export default ProductPage;
