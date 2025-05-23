import { Container } from "@/components/Container";
import { SingleProduct } from "@/components/Product";
import { products } from "@/constants/products";
import { Product } from "@/types/products";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const product = products.find((p: Product) => p.slug === slug);

  if (!product) {
    return {
      title: "Project Not Found",
      description: "The project you are looking for could not be found.",
    };
  }

  return {
    title: product.title, // Changed from product.name
    description: product.description,
    // You can add more metadata here, like openGraph images
    // openGraph: {
    //   title: product.title, // Changed from product.name
    //   description: product.description,
    //   images: [{ url: product.thumbnail || '/default-og-image.png' }], // Assuming thumbnail can be used for OG image
    // },
  };
}

export default function SingleProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const product: Product | undefined = products.find(
    (p: Product) => p.slug === slug
  );

  if (!product) {
    redirect("/projects");
  }
  return (
    <Container>
      <SingleProduct product={product} />
    </Container>
  );
}
