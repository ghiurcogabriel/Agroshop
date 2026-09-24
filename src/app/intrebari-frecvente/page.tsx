'use client';

import { useMemo, useState } from 'react';

const faqs = [
  {
    q: 'Cum aleg dimensiunea corecta?',
    a: 'Foloseste filtrarea dupa latime, inaltime si diametru sau contacteaza un agent pentru verificare.',
    category: 'Produse',
  },
  {
    q: 'Produsele sunt verificate?',
    a: 'Da. Produsele listate sunt inspectate vizual inainte de publicare, iar detaliile importante sunt afisate in pagina produsului.',
    category: 'Calitate',
  },
  {
    q: 'Livrati in toata tara?',
    a: 'Da, oferim livrare nationala prin parteneri de curierat. Confirmam telefonic detaliile inainte de expediere.',
    category: 'Livrare',
  },
  {
    q: 'Cum cer o oferta personalizata?',
    a: 'Intra pe pagina de contact si trimite formularul cu dimensiunile dorite. Te contactam rapid cu recomandari.',
    category: 'Comercial',
  },
  {
    q: 'Pot comanda pentru flota sau pentru mai multe utilaje?',
    a: 'Da. Pentru comenzi multiple pregatim oferta dedicata si iti propunem variante compatibile in functie de buget.',
    category: 'Comercial',
  },
  {
    q: 'Cum aflu daca produsul este in stoc?',
    a: 'Stocul este actualizat in platforma. Pentru confirmare finala, poti suna direct unul dintre agentii nostri.',
    category: 'Produse',
  },
];

const quickStats = [
  { label: 'Raspuns mediu', value: '< 30 min' },
  { label: 'Livrare nationala', value: '24-72h' },
  { label: 'Consultanta', value: 'Telefon + WhatsApp' },
];

const FaqPage = () => {
  const [query, setQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return faqs;
    }

    return faqs.filter((item) => {
      return (
        item.q.toLowerCase().includes(normalized) ||
        item.a.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized)
      );
    });
  }, [query]);

  return (
    <section className="faq-layout reveal-up">
      <article className="page-block faq-hero">
        <p className="eyebrow" style={{ margin: 0 }}>
          Suport Agromir SH
        </p>
        <h1 style={{ marginTop: '0.55rem', marginBottom: '0.6rem' }}>Intrebari frecvente</h1>
        <p className="faq-hero-copy">
          Gasesti rapid raspunsuri despre stoc, livrare, selectie si comenzi. Daca ai un caz special,
          echipa noastra te ajuta direct.
        </p>
        <div className="faq-stats-row">
          {quickStats.map((stat) => (
            <div className="faq-stat-chip" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="page-block faq-content">
        <div className="faq-toolbar">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cauta raspunsuri (ex: livrare, dimensiune, oferta)"
            aria-label="Cauta in intrebari frecvente"
          />
          <a href="/contact" className="button button-secondary faq-toolbar-link">
            Nu ai gasit raspuns? Contacteaza-ne
          </a>
        </div>

        <div className="faq-accordion-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-category">{item.category}</span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))
          ) : (
            <p className="faq-empty">
              Nu exista rezultate pentru cautarea curenta. Incearca un termen diferit sau
              foloseste pagina de contact.
            </p>
          )}
        </div>
      </article>
    </section>
  );
};

export default FaqPage;
