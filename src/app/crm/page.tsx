'use client';

import Link from 'next/link';
import { CrmContext } from './layout';
import React from 'react';

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
    maximumFractionDigits: 0,
  }).format(value ?? 0);
};

export default function CrmDashboard() {
  const context = React.useContext(CrmContext);
  if (!context) {
    throw new Error('CrmDashboard must be used within CrmLayout');
  }

  const { products, orders } = context;

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const preparingOrders = orders.filter((o) => o.status === 'preparing');
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

  return (
    <div>
      <article className="page-block" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.2rem' }}>Panou comenzi - Bilanț</h2>

        <div className="crm-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div className="stat-card" style={{ padding: '1.2rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <p className="crm-muted">Comenzi in asteptare</p>
            <strong style={{ fontSize: '2rem', display: 'block', marginTop: '0.3rem' }}>{pendingOrders.length}</strong>
          </div>

          <div className="stat-card" style={{ padding: '1.2rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <p className="crm-muted">Comenzi in pregatire</p>
            <strong style={{ fontSize: '2rem', display: 'block', marginTop: '0.3rem' }}>{preparingOrders.length}</strong>
          </div>

          <div className="stat-card" style={{ padding: '1.2rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <p className="crm-muted">Total comenzi</p>
            <strong style={{ fontSize: '2rem', display: 'block', marginTop: '0.3rem' }}>{orders.length}</strong>
          </div>

          <div className="stat-card" style={{ padding: '1.2rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <p className="crm-muted">Venit total</p>
            <strong style={{ fontSize: '1.3rem', display: 'block', marginTop: '0.3rem' }}>{formatPrice(totalRevenue)}</strong>
          </div>

          <div className="stat-card" style={{ padding: '1.2rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <p className="crm-muted">Produse in catalog</p>
            <strong style={{ fontSize: '2rem', display: 'block', marginTop: '0.3rem' }}>{products.length}</strong>
          </div>
        </div>

        <div className="crm-quick-actions" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <Link href="/crm/orders" className="button button-primary" style={{ textAlign: 'center', textDecoration: 'none', display: 'block', padding: '1rem' }}>
            Verifica comenzi
          </Link>
          <Link href="/crm/products" className="button button-secondary" style={{ textAlign: 'center', textDecoration: 'none', display: 'block', padding: '1rem' }}>
            Gestioneaza produse
          </Link>
          <Link href="/crm/add-product" className="button button-primary" style={{ textAlign: 'center', textDecoration: 'none', display: 'block', padding: '1rem' }}>
            Adauga produs nou
          </Link>
        </div>
      </article>

      {pendingOrders.length > 0 && (
        <article className="page-block" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginTop: 0 }}>Comenzi in asteptare ({pendingOrders.length})</h3>
          <div className="crm-orders-list">
            {pendingOrders.slice(0, 5).map((order) => (
              <div key={order.id} style={{ padding: '0.8rem', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{order.orderNumber}</strong>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.9rem' }}>
                    {order.firstName} {order.lastName}
                  </p>
                </div>
                <span style={{ fontWeight: 'bold', color: '#d97706' }}>{formatPrice(Number(order.total))}</span>
              </div>
            ))}
          </div>
          <Link href="/crm/orders" className="button button-secondary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Vezi toate comenzile
          </Link>
        </article>
      )}
    </div>
  );
}
