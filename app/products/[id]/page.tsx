import { notFound } from "next/navigation";
import { products } from "@/src/constants/products";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return <ProductDetailClient product={product} related={related} />;
}
