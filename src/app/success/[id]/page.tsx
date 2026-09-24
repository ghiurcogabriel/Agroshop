"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getOrderById, OrderResponse } from "@/lib/api";

function formatPrice(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(value);
}

const SuccessPage = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (!id) {
    return (
      <div className="page-block reveal-up" style={{ textAlign: "center" }}>
        <h1>Link invalid</h1>
        <p>Comanda nu are un identificator valid.</p>
        <Link href="/magazin" className="button button-primary">
          Inapoi la magazin
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-block reveal-up" style={{ textAlign: "center" }}>
        <p>Se incarca...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="page-block reveal-up" style={{ textAlign: "center" }}>
        <h1>Ceva s-a intamplat</h1>
        <p>Nu am putut gasi comanda ta.</p>
        <Link href="/magazin" className="button button-primary">
          Inapoi la magazin
        </Link>
      </div>
    );
  }

  return (
    <div className="stack-lg reveal-up">
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          background: "var(--surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "120px",
            margin: "0 auto 1rem",
            background: "#e8f5e3",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "4rem",
          }}
        >
          ✓
        </div>
        <h1 style={{ margin: "0 0 0.5rem", color: "var(--brand-strong)" }}>
          Comanda confirmata!
        </h1>
        <p style={{ margin: 0, fontSize: "1.1rem", color: "var(--ink-soft)" }}>
          Numar comanda: <strong>{order.orderNumber ?? order.id}</strong>
        </p>
      </div>

      <div className="grid-2">
        <div className="page-block">
          <h3 style={{ marginTop: 0 }}>Detaliile comenzii</h3>
          <p>
            <strong>Nume:</strong> {order.firstName} {order.lastName}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Telefon:</strong> {order.phone}
          </p>
          <p>
            <strong>Adresa:</strong> {order.address}, {order.city},{" "}
            {order.county} {order.zipCode}
          </p>
        </div>

        <div className="page-block">
          <h3 style={{ marginTop: 0 }}>Rezumat financiar</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{formatPrice(order.total)}</span>
          </div>
          <div className="summary-row">
            <span>Transport:</span>
            <span>Gratuit</span>
          </div>
          <div className="summary-row total">
            <span>Total de platit:</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="page-block">
        <h3 style={{ marginTop: 0 }}>
          Articole comandate ({order.items.length})
        </h3>
        {order.items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.75rem 0",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div>
              <div style={{ fontWeight: "600" }}>
                {item.width}/{item.height}R{item.diameter} {item.brand}
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--ink-soft)" }}>
                Cantitate: {item.quantity} x {formatPrice(item.price)}
              </div>
            </div>
            <div style={{ fontWeight: "600", textAlign: "right" }}>
              {formatPrice(item.subtotal)}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          background: "var(--surface)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <p style={{ marginTop: 0 }}>
          O notificare de confirmare a fost trimisa la {order.email}
        </p>
        <p style={{ color: "var(--ink-soft)" }}>
          Vom contacta telefonic pentru coordonare transportului in curand.
        </p>
        <div
          style={{
            display: "flex",
            gap: "0.7rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/magazin" className="button button-primary">
            Cumparaturile continuă
          </Link>
          <Link href="/" className="button button-secondary">
            Inapoi la home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
