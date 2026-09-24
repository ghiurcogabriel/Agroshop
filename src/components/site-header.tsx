"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

export function SiteHeader() {
  const { getTotalItems } = useCart();
  const cartItems = getTotalItems();

  return (
    <header className="site-header">
      <Link href="/" className="brand">
        AGROMIR SH
      </Link>
      <nav className="nav-row">
        <Link href="/magazin" className="nav-link">
          <Image
            src="/icons/storefront.svg"
            alt="Magazin"
            width={16}
            height={16}
          />
          Magazin
        </Link>
        <Link href="/despre-noi" className="nav-link">
          <Image
            src="/icons/team.svg"
            alt="Despre Noi"
            width={16}
            height={16}
          />
          Despre Noi
        </Link>
        <Link href="/intrebari-frecvente" className="nav-link">
          <Image src="/icons/faq-chat.svg" alt="FAQ" width={16} height={16} />
          FAQ
        </Link>
        <Link href="/contact" className="nav-link">
          <Image
            src="/icons/contact-phone.svg"
            alt="Contact"
            width={16}
            height={16}
          />
          Contact
        </Link>
        <Link href="/crm" className="nav-link">
          <Image src="/icons/box-small.svg" alt="CRM" width={16} height={16} />
          CRM
        </Link>
        <Link href="/cos" className="nav-link nav-link-cart">
          <Image src="/icons/cart-bag.svg" alt="Cos" width={16} height={16} />
          Cos
          {cartItems > 0 && <span className="cart-badge">{cartItems}</span>}
        </Link>
      </nav>
    </header>
  );
}
