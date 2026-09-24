import { ContactForm } from "@/components/contact-form";

const ContactPage = () => {
  return (
    <section className="contact-layout reveal-up">
      <article className="page-block contact-hero">
        <p className="eyebrow" style={{ margin: 0 }}>
          Contact rapid
        </p>
        <h1 style={{ marginTop: '0.55rem', marginBottom: '0.65rem' }}>Ia legatura cu noi</h1>
        <p className="contact-hero-copy">
          Pentru comenzi rapide sau clarificari despre compatibilitate, ne poti contacta direct.
          Raspundem prioritar solicitarilor legate de stoc si dimensiuni.
        </p>
        <div className="contact-actions-grid">
          <a className="contact-action-card" href="tel:0743700470">
            <strong>Agent Raul</strong>
            <span>0743 700 470</span>
            <small>Apel direct</small>
          </a>
          <a className="contact-action-card" href="tel:0744396161">
            <strong>Agent Ionut</strong>
            <span>0744 396 161</span>
            <small>Apel direct</small>
          </a>
          <a className="contact-action-card" href="mailto:comenzi@agromir-sh.ro">
            <strong>Email comercial</strong>
            <span>comenzi@agromir-sh.ro</span>
            <small>Trimite mesaj</small>
          </a>
        </div>
      </article>

      <div className="contact-main-grid">
        <ContactForm />

        <article className="page-block contact-side-panel">
          <h2 style={{ marginTop: 0, marginBottom: '0.6rem' }}>Program si locatie</h2>
          <div className="contact-meta-list">
            <p>
              <strong>Locatie:</strong> Baia Mare, Romania
            </p>
            <p>
              <strong>Luni - Vineri:</strong> 08:00 - 18:00
            </p>
            <p>
              <strong>Sambata:</strong> 09:00 - 14:00
            </p>
            <p>
              <strong>Timp mediu raspuns:</strong> sub 30 minute in intervalul de program
            </p>
          </div>

          <div className="contact-map-wrap" aria-label="Harta punct lucru Agromir SH">
            <iframe
              title="Harta punct lucru Agromir SH"
              src="https://www.openstreetmap.org/export/embed.html?bbox=23.5500%2C47.6200%2C23.6200%2C47.6900&layer=mapnik&marker=47.6597%2C23.5795"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="contact-note">
            <strong>Tip util:</strong> Include in mesaj dimensiunea anvelopei si tipul utilajului
            pentru o recomandare mai rapida.
          </div>
        </article>
      </div>
    </section>
  );
};

export default ContactPage;
