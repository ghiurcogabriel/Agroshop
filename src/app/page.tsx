import Link from 'next/link';
import Image from 'next/image';
import { HeroSearch } from '@/components/hero-search';
import { ProductCard } from '@/components/product-card';
import { getCategories, getHighlights } from '@/lib/api';

export default async function Home() {
  const [highlights, categories] = await Promise.all([
    getHighlights(),
    getCategories(),
  ]);

  return (
    <div className="stack-lg">
      <section className="banner-section">
        <Image
          src="/images/banner-hero.svg"
          alt="Descoperă Anvelopele Noastre Second Hand de Calitate"
          width={1400}
          height={500}
          priority
          className="banner-image"
        />
        <div className="banner-overlay">
          <Link href="/magazin" className="banner-cta">
            Vezi Produsele
          </Link>
        </div>
      </section>

      <section className="hero-panel">
        <div className="hero-copy reveal-up">
          <p className="eyebrow">Anvelope agricole second hand</p>
          <h1>Gasesti rapid anvelopa potrivita, fara timp pierdut.</h1>
          <p>
            Am reconstruit experienta Agromir pentru cautare mai clara, filtre
            utile si informatii complete la fiecare produs.
          </p>
          <div className="hero-cta">
            <Link href="/magazin" className="button button-primary">
              Vezi Toate Produsele
            </Link>
            <Link href="/contact" className="button button-secondary">
              Vorbeste Cu Un Agent
            </Link>
          </div>
        </div>
        <HeroSearch categories={categories} />
      </section>

      <section className="features-grid reveal-up">
        <article>
          <div className="feature-icon">
            <Image src="/icons/shield.svg" alt="Shield" width={40} height={40} />
          </div>
          <h3>Calitate Garantata</h3>
          <p>Produse atent selectate si verificate, cu date clare.</p>
        </article>
        <article>
          <div className="feature-icon">
            <Image src="/icons/zap.svg" alt="Lightning" width={40} height={40} />
          </div>
          <h3>Comparare Rapida</h3>
          <p>Cauti dupa latime, inaltime, diametru si categorie in cateva secunde.</p>
        </article>
        <article>
          <div className="feature-icon">
            <Image src="/icons/headphones.svg" alt="Headphones" width={40} height={40} />
          </div>
          <h3>Suport Uman Real</h3>
          <p>Contact direct pe telefon, WhatsApp sau formularul nou de cereri.</p>
        </article>
        <article>
          <div className="feature-icon">
            <Image src="/icons/truck.svg" alt="Truck" width={40} height={40} />
          </div>
          <h3>Livrare Nationala</h3>
          <p>Expediere rapida in toata tara, cu confirmare imediata.</p>
        </article>
      </section>

      <section className="section-block reveal-up">
        <div className="section-head">
          <h2>Produse Recente</h2>
          <Link href="/magazin">Vezi toate</Link>
        </div>
        <div className="products-grid">
          {highlights.recent.map((tire) => (
            <ProductCard key={tire.id} tire={tire} />
          ))}
        </div>
      </section>

      <section className="section-block reveal-up">
        <div className="section-head">
          <h2>Selectie Premium</h2>
          <p>Produse cu pret ridicat, de obicei cautate pentru utilaje mari.</p>
        </div>
        <div className="products-grid">
          {highlights.premium.map((tire) => (
            <ProductCard key={tire.id} tire={tire} />
          ))}
        </div>
      </section>
    </div>
  );
}
