import Link from "next/link";
import { notFound } from "next/navigation";
import { getTireById } from "@/lib/api";
import Image from "next/image";

function formatPrice(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(value);
}

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const tire = await getTireById(id);

  if (!tire) {
    notFound();
  }

  return (
    <div className="grid-2">
      <section className="page-block reveal-up">
        <div className="card-media" style={{ height: "320px" }}>
          <Image
            src={tire.imageUrl}
            alt={`${tire.brand} ${tire.width}/${tire.height}R${tire.diameter}`}
            fill
            sizes="(max-width: 900px) 92vw, 45vw"
            style={{ objectFit: "contain" }}
          />
        </div>
      </section>
      <section className="page-block reveal-up">
        <p className="eyebrow">Detalii produs</p>
        <h1 style={{ marginTop: "0.5rem" }}>
          {tire.width}/{tire.height}R{tire.diameter} {tire.brand}
        </h1>
        <p className="price">{formatPrice(Number(tire.price))}</p>
        <div className="meta-row">
          {tire.category?.name ? (
            <span className="pill">{tire.category.name}</span>
          ) : null}
          <span className="pill">Brand: {tire.brand}</span>
        </div>
        <p style={{ color: "var(--ink-soft)", lineHeight: 1.6 }}>
          {tire.description}
        </p>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <Link href="/contact" className="button button-primary">
            Cere Oferta
          </Link>
          <Link href="/magazin" className="button button-secondary">
            Inapoi in magazin
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
