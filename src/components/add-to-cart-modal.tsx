'use client';

import React, { useState } from 'react';
import { Tire } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';

export function AddToCartModal({ tire, onClose }: { tire: Tire; onClose: () => void }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      id: tire.id,
      tireId: tire.id,
      diameter: tire.diameter,
      width: tire.width,
      height: tire.height,
      brand: tire.brand,
      price: Number(tire.price),
      quantity,
      imageUrl: tire.imageUrl,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <h2>Adauga la cos</h2>
        <div className="modal-product">
          <h3>{`${tire.width}/${tire.height}R${tire.diameter} ${tire.brand}`}</h3>
          <p className="modal-price">RON {Number(tire.price).toLocaleString('ro-RO')}</p>
        </div>
        
        <div className="quantity-selector">
          <label>Cantitate:</label>
          <div className="quantity-controls">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        <div className="modal-actions">
          <button className="button button-primary" onClick={handleAddToCart}>
            Adauga la cos
          </button>
          <Link href="/cos" className="button button-secondary">
            Mergi la cos
          </Link>
        </div>
      </div>
    </div>
  );
}
