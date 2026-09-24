"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

function formatPrice(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(value);
}

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="page-block reveal-up">
        <h1 className="cart-title" style={{ marginTop: 0 }}>
          <Image src="/icons/cart-bag.svg" alt="Cos" width={26} height={26} />
          Cosul tau
        </h1>
        <div className="cart-empty-message">
          <Image
            src="/icons/box-small.svg"
            alt="Cutie goala"
            width={56}
            height={56}
            className="cart-empty-icon"
          />
          <h2>Cosul tau este gol</h2>
          <p>Adauga niste anvelope ca sa continui cu achizitia.</p>
          <Link href="/magazin" className="button button-primary">
            Mergi la magazin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="stack-lg reveal-up">
      <h1 className="cart-title" style={{ margin: 0 }}>
        <Image src="/icons/cart-bag.svg" alt="Cos" width={28} height={28} />
        Cosul tau
      </h1>

      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.tireId} className="cart-item">
              <div className="cart-item-image">
                <Image
                  src={item.imageUrl}
                  alt={item.brand}
                  width={100}
                  height={100}
                  style={{
                    width: "auto",
                    height: "80px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="cart-item-details">
                <h3 className="cart-item-title">
                  {`${item.width}/${item.height}R${item.diameter} ${item.brand}`}
                </h3>
                <p className="cart-item-price">{formatPrice(item.price)}</p>
                <p className="cart-item-meta">
                  Subtotal: {formatPrice(item.price * item.quantity)}
                </p>
                <div className="cart-item-actions">
                  <label>Cantitate:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.tireId,
                        Math.max(1, parseInt(e.target.value) || 1),
                      )
                    }
                    style={{ width: "60px", padding: "0.25rem" }}
                  />
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.tireId)}
                  >
                    Sterge
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Rezumat comanda</h3>
          <div className="summary-row">
            <span className="summary-label">
              <Image
                src="/icons/discount-tag.svg"
                alt="Subtotal"
                width={16}
                height={16}
              />
              Subtotal:
            </span>
            <span>{formatPrice(getTotalPrice())}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">
              <Image
                src="/icons/truck.svg"
                alt="Transport"
                width={16}
                height={16}
              />
              Transport:
            </span>
            <span>Gratuit</span>
          </div>
          <div className="summary-row total">
            <span className="summary-label">
              <Image
                src="/icons/cart-bag.svg"
                alt="Total"
                width={16}
                height={16}
              />
              Total:
            </span>
            <span>{formatPrice(getTotalPrice())}</span>
          </div>
          <div className="cart-actions">
            <Link href="/checkout" className="button button-primary">
              Continua plata
            </Link>
            <Link href="/magazin" className="button button-secondary">
              Continua cumparaturile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
