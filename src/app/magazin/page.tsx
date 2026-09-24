import Link from 'next/link';
import { CommercialBannerCarousel } from '@/components/commercial-banner-carousel';
import { ProductCard } from '@/components/product-card';
import { getCategories, getTires } from '@/lib/api';

type SearchParams = Record<string, string | string[] | undefined>;

const MagazinPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;
  const [tires, categories] = await Promise.all([getTires(), getCategories()]);

  const category = typeof params.category === 'string' ? params.category : '';
  const width = typeof params.width === 'string' ? params.width : '';
  const height = typeof params.height === 'string' ? params.height : '';
  const diameter = typeof params.diameter === 'string' ? params.diameter : '';
  const q = typeof params.q === 'string' ? params.q.toLowerCase() : '';

  const filtered = tires.filter((item) => {
    const matchesCategory = !category || item.category?.name === category;
    const matchesWidth = !width || item.width.includes(width);
    const matchesHeight = !height || item.height.includes(height);
    const matchesDiameter = !diameter || item.diameter.includes(diameter);
    const text = `${item.brand} ${item.width}/${item.height}r${item.diameter} ${item.description}`.toLowerCase();
    const matchesText = !q || text.includes(q);

    return (
      matchesCategory &&
      matchesWidth &&
      matchesHeight &&
      matchesDiameter &&
      matchesText
    );
  });

  return (
    <div className="stack-lg">
      <CommercialBannerCarousel />

      <section className="page-block reveal-up">
        <h1 style={{ marginTop: 0 }}>Magazin</h1>
        <p style={{ color: 'var(--ink-soft)' }}>
          Filtreaza rapid dupa dimensiuni, brand sau categorie.
        </p>
        <details className="filters-disclosure">
          <summary>Filtre produse</summary>
          <form className="catalog-controls" method="get">
            <input name="q" placeholder="Cauta brand, dimensiune..." defaultValue={q} />
            <select name="category" defaultValue={category}>
              <option value="">Toate categoriile</option>
              {categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <input name="width" placeholder="Latime" defaultValue={width} />
            <input name="height" placeholder="Inaltime" defaultValue={height} />
            <input name="diameter" placeholder="Diametru" defaultValue={diameter} />
            <button className="button button-primary" type="submit">
              Aplica filtre
            </button>
            <Link href="/magazin" className="button button-secondary">
              Reseteaza filtre
            </Link>
          </form>
        </details>
      </section>

      <section className="products-grid reveal-up">
        {filtered.map((tire) => (
          <ProductCard key={tire.id} tire={tire} />
        ))}
      </section>
    </div>
  );
}

export default MagazinPage;
