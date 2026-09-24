const trustStats = [
  { id: "years", label: "Ani de experienta", value: "12+" },
  { id: "clients", label: "Clienti deserviti", value: "3.400+" },
  { id: "stock", label: "Anvelope verificate", value: "9.000+" },
  { id: "response", label: "Raspuns mediu", value: "< 30 min" },
];

const values = [
  {
    id: "quality",
    title: "Calitate verificata",
    description:
      "Fiecare anvelopa este inspectata vizual si tehnic inainte de listare.",
  },
  {
    id: "transparent",
    title: "Transparenta totala",
    description:
      "Publicam dimensiuni, stoc si preturi clare, fara pasi inutili.",
  },
  {
    id: "support",
    title: "Consultanta rapida",
    description:
      "Echipa noastra te ajuta sa alegi varianta potrivita pentru utilajul tau.",
  },
];

const reviews = [
  {
    id: "review-1",
    name: "Ioan M.",
    role: "Fermier, Satu Mare",
    rating: 5,
    text: "Am primit exact ce cautam pentru tractor, cu explicatii clare si livrare rapida.",
  },
  {
    id: "review-2",
    name: "Ana P.",
    role: "Administrator ferma, Cluj",
    rating: 5,
    text: "Platforma este simpla, iar consultantul a confirmat dimensiunile inainte de comanda.",
  },
  {
    id: "review-3",
    name: "Mihai D.",
    role: "Service utilaje, Bistrita",
    rating: 4,
    text: "Raport bun calitate-pret si suport foarte prompt pentru comenzi recurente.",
  },
];

const makeStars = (count: number) => "★".repeat(count) + "☆".repeat(5 - count);

const DespreNoiPage = () => {
  return (
    <section className="about-layout reveal-up">
      <article className="page-block about-hero">
        <p className="eyebrow" style={{ margin: 0 }}>
          Despre Agromir SH
        </p>
        <h1 style={{ marginTop: "0.55rem", marginBottom: "0.75rem" }}>
          Despre Noi
        </h1>
        <p>
          Agromir SH este un magazin specializat in anvelope second hand pentru
          utilaje agricole, construit pe experienta directa din teren.
        </p>
        <p>
          Noua platforma pune accent pe claritate: dimensiuni vizibile,
          organizare pe categorii, cautare intuitiva si contact rapid cu un
          agent.
        </p>
        <p>
          Misiunea noastra este simpla: sa gasesti produsul potrivit mai repede
          si cu mai multa incredere.
        </p>
        <div className="about-cta-row">
          <a href="/magazin" className="button button-primary">
            Vezi magazinul
          </a>
          <a href="/contact" className="button button-secondary">
            Discuta cu un consultant
          </a>
        </div>
      </article>

      <section className="about-stats-grid">
        {trustStats.map((stat) => (
          <article key={stat.id} className="about-stat-card">
            <p className="about-stat-value">{stat.value}</p>
            <p className="about-stat-label">{stat.label}</p>
          </article>
        ))}
      </section>

      <section className="about-two-col">
        <article className="page-block">
          <div className="section-head" style={{ marginBottom: "0.4rem" }}>
            <h2>Ce ne diferentiaza</h2>
          </div>
          <div className="about-values-grid">
            {values.map((value) => (
              <article key={value.id} className="about-value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="page-block about-map-card">
          <div className="section-head" style={{ marginBottom: "0.45rem" }}>
            <h2>Unde ne gasesti</h2>
          </div>
          <p className="about-map-copy">
            Suntem in Baia Mare, cu livrare in toata Romania. Poti veni direct
            la punctul nostru de lucru sau ne poti contacta pentru recomandari.
          </p>
          <div className="about-map-wrap">
            <iframe
              title="Harta Agromir SH"
              src="https://www.openstreetmap.org/export/embed.html?bbox=23.5500%2C47.6200%2C23.6200%2C47.6900&layer=mapnik&marker=47.6597%2C23.5795"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="about-address">Baia Mare, Romania</p>
        </article>
      </section>

      <article className="page-block">
        <div className="section-head" style={{ marginBottom: "0.45rem" }}>
          <h2>Ce spun clientii</h2>
          <p>Review-uri orientative cu date mock pentru prezentare UX.</p>
        </div>
        <div className="about-reviews-grid">
          {reviews.map((review) => (
            <article key={review.id} className="about-review-card">
              <p
                className="about-review-stars"
                aria-label={`Scor ${review.rating} din 5`}
              >
                {makeStars(review.rating)}
              </p>
              <p className="about-review-text">{review.text}</p>
              <p className="about-review-author">{review.name}</p>
              <p className="about-review-role">{review.role}</p>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
};

export default DespreNoiPage;
