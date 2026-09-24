'use client';

import { useState } from 'react';
import { API_BASE } from '@/lib/api';

type FormState = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const response = await fetch(`${API_BASE}/contact-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('Mesaj trimis cu succes. Revenim catre tine in scurt timp.');
      setForm(initialState);
    } catch {
      setStatus('Nu am putut trimite mesajul acum. Incearca din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="page-block" onSubmit={onSubmit}>
      <h2 style={{ marginTop: 0 }}>Trimite o cerere</h2>
      <div className="grid-2">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Nume complet"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="Telefon"
          required
        />
      </div>
      <div className="grid-2" style={{ marginTop: '0.7rem' }}>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email (optional)"
        />
        <input
          name="subject"
          value={form.subject}
          onChange={onChange}
          placeholder="Subiect"
        />
      </div>
      <textarea
        style={{ marginTop: '0.7rem' }}
        name="message"
        value={form.message}
        onChange={onChange}
        placeholder="Detalii cerere"
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.7rem' }}>
        <button type="submit" className="button button-primary" disabled={loading}>
          {loading ? 'Se trimite...' : 'Trimite Cererea'}
        </button>
        {status ? (
          <span style={{ color: 'var(--ink-soft)', fontSize: '0.92rem' }}>{status}</span>
        ) : null}
      </div>
    </form>
  );
}
