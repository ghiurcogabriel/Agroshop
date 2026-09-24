'use client';

import { useMemo } from 'react';
import { adminUpdateOrderStatus } from '@/lib/api';
import { CrmContext } from '../layout';
import React from 'react';

const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'preparing',
  'shipped',
  'delivered',
  'cancelled',
];

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
    maximumFractionDigits: 0,
  }).format(value ?? 0);
};

export default function OrdersPage() {
  const context = React.useContext(CrmContext);
  if (!context) {
    throw new Error('OrdersPage must be used within CrmLayout');
  }

  const { token, orders, loading, setError, setNotice, loadCrmData } = context;

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      const left = new Date(a.createdAt ?? '').getTime();
      const right = new Date(b.createdAt ?? '').getTime();
      return right - left;
    });
  }, [orders]);

  const onStatusChange = async (orderId: string, status: string) => {
    if (!token) {
      return;
    }

    setError('');

    try {
      await adminUpdateOrderStatus(token, orderId, status);
      setNotice('Statusul comenzii a fost actualizat.');
      await loadCrmData(token);
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : 'Actualizarea statusului a esuat.');
    }
  };

  return (
    <article className="page-block crm-orders-card">
      <div className="section-head" style={{ marginBottom: '0.6rem' }}>
        <h2>Comenzi ({orders.length})</h2>
        <p>Verifica detalii comenzi si actualizeaza statusurile de livrare direct din CRM.</p>
      </div>

      <div className="crm-orders-list">
        {sortedOrders.map((order) => (
          <details key={order.id} className="crm-order-item">
            <summary>
              <div>
                <strong>{order.orderNumber}</strong>
                <p>
                  {order.firstName} {order.lastName} · {formatPrice(Number(order.total))}
                </p>
              </div>
              <span className="pill">{order.status}</span>
            </summary>

            <div className="crm-order-body">
              <p>
                <strong>Contact:</strong> {order.phone} · {order.email}
              </p>
              <p>
                <strong>Adresa:</strong> {order.address}, {order.city}, {order.county} {order.zipCode}
              </p>
              {order.notes ? (
                <p>
                  <strong>Observatii:</strong> {order.notes}
                </p>
              ) : null}

              <div className="crm-order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="crm-order-line">
                    <span>
                      {item.width}/{item.height}R{item.diameter} {item.brand} x {item.quantity}
                    </span>
                    <strong>{formatPrice(Number(item.subtotal))}</strong>
                  </div>
                ))}
              </div>

              <div className="crm-order-status-row">
                <label>
                  <strong>Status livrare:</strong>
                </label>
                <select
                  defaultValue={order.status}
                  onChange={(event) => onStatusChange(order.id, event.target.value)}
                  disabled={loading}
                >
                  {ORDER_STATUSES.map((status) => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </details>
        ))}

        {orders.length === 0 ? <p className="crm-muted">Nu exista comenzi inca.</p> : null}
      </div>
    </article>
  );
}
