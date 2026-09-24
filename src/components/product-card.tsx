'use client';

import Link from "next/link";
import { Tire } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import { AddToCartModal } from "./add-to-cart-modal";

function formatPrice(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ProductCard({ tire }: { tire: Tire }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <article className="card">
        <div className="card-media">
          <Image
            src={tire.imageUrl}
            alt={`Imagine ${tire.brand}`}
            width={220}
            height={200}
            loading="eager"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              maxHeight: '145px',
            }}
          />
        </div>
        <h3>{`${tire.width}/${tire.height}R${tire.diameter} ${tire.brand}`}</h3>
        <div className="meta-row">
          {tire.category?.name ? (
            <span className="pill">{tire.category.name}</span>
          ) : null}
          <span className="pill">Brand: {tire.brand}</span>
        </div>
        <p className="price">{formatPrice(Number(tire.price))}</p>
        <div className="card-actions">
          <button 
            className="button button-primary"
            onClick={() => setShowModal(true)}
          >
            Adauga la cos
          </button>
          <Link href={`/produs/${tire.id}`} className="button button-secondary">
            Detalii
          </Link>
        </div>
      </article>
      {showModal && <AddToCartModal tire={tire} onClose={() => setShowModal(false)} />}
    </>
  );
}
