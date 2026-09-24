'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/lib/types';

export function HeroSearch({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [diameter, setDiameter] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();

    if (category) params.set('category', category);
    if (width) params.set('width', width);
    if (height) params.set('height', height);
    if (diameter) params.set('diameter', diameter);

    router.push(`/magazin?${params.toString()}`);
  };

  return (
    <form className="page-block reveal-up" onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0 }}>Cautare Inteligenta</h3>
      <p style={{ color: 'var(--ink-soft)' }}>
        Alege dimensiunile si categoria, apoi vezi direct produsele potrivite.
      </p>
      <div className="stack-lg" style={{ gap: '0.65rem' }}>
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">Toate categoriile</option>
          {categories.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="grid-2">
          <input
            placeholder="Latime (ex: 480)"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
          />
          <input
            placeholder="Inaltime (ex: 70)"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
        </div>
        <input
          placeholder="Diametru (ex: 34)"
          value={diameter}
          onChange={(event) => setDiameter(event.target.value)}
        />
        <button type="submit" className="button button-primary">
          Cauta in Magazin
        </button>
      </div>
    </form>
  );
}
