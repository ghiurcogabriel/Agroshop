'use client';

import { CartProvider } from '@/lib/cart-context';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <SiteHeader />
      <main className="site-main">{children}</main>
      <SiteFooter />
    </CartProvider>
  );
}
