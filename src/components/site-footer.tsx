import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h4>Agromir SH</h4>
          <p>Anvelope second hand verificate pentru utilaje agricole.</p>
          <p>Baia Mare, Romania</p>
        </div>
        <div>
          <h4>Pagini Utile</h4>
          <p>
            <Link href="/despre-noi">Despre noi</Link>
          </p>
          <p>
            <Link href="/intrebari-frecvente">Intrebari frecvente</Link>
          </p>
          <p>
            <Link href="/contact">Contact</Link>
          </p>
        </div>
        <div>
          <h4>Informatii Legale</h4>
          <p>
            <Link href="/termeni-si-conditii">Termeni si conditii</Link>
          </p>
          <p>
            <Link href="/politica-confidentialitate">Politica de confidentialitate</Link>
          </p>
          <p>
            <Link href="/politica-cookies">Politica cookies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
