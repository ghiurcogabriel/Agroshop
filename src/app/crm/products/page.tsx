'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminDeleteProduct, adminUpdateProduct, AdminTirePayload } from '@/lib/api';
import { Tire } from '@/lib/types';
import { CrmContext } from '../layout';
import React from 'react';

interface EditProductFormValues {
  brand: string;
  width: string;
  height: string;
  diameter: string;
  price: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  addedById: string;
}

const editProductSchema = Yup.object({
  brand: Yup.string().trim().required('Brandul este obligatoriu.'),
  width: Yup.string().trim().required('Latimea este obligatorie.'),
  height: Yup.string().trim().required('Inaltimea este obligatorie.'),
  diameter: Yup.string().trim().required('Diametrul este obligatoriu.'),
  price: Yup.number()
    .typeError('Pretul trebuie sa fie numeric.')
    .min(0, 'Pretul nu poate fi negativ.')
    .required('Pretul este obligatoriu.'),
  description: Yup.string().trim().required('Descrierea este obligatorie.'),
  imageUrl: Yup.string().trim().url('Introdu un URL valid.').required('URL-ul imaginii este obligatoriu.'),
  categoryId: Yup.string().trim(),
  addedById: Yup.string().trim(),
});

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
    maximumFractionDigits: 0,
  }).format(value ?? 0);
};

export default function ProductsPage() {
  const context = React.useContext(CrmContext);
  if (!context) {
    throw new Error('ProductsPage must be used within CrmLayout');
  }

  const { token, products, setError, setNotice, loadCrmData } = context;
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  const editFormik = useFormik<EditProductFormValues>({
    initialValues: {
      brand: '',
      width: '',
      height: '',
      diameter: '',
      price: '',
      description: '',
      imageUrl: '',
      categoryId: '',
      addedById: '',
    },
    validationSchema: editProductSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (!token || !editingProductId) {
        return;
      }

      setEditLoading(true);
      setError('');

      try {
        const payload: AdminTirePayload = {
          brand: values.brand.trim(),
          width: values.width.trim(),
          height: values.height.trim(),
          diameter: values.diameter.trim(),
          price: Number(values.price),
          description: values.description.trim(),
          imageUrl: values.imageUrl.trim(),
          categoryId: values.categoryId || undefined,
          addedById: values.addedById || undefined,
        };

        await adminUpdateProduct(token, editingProductId, payload);
        setNotice('Produs actualizat.');
        setEditingProductId(null);
        editFormik.resetForm();
        await loadCrmData(token);
      } catch (submitError) {
        setError(submitError instanceof Error ? submitError.message : 'Operatiunea a esuat.');
      } finally {
        setEditLoading(false);
        setSubmitting(false);
      }
    },
  });

  const onEditProduct = (product: Tire) => {
    setEditingProductId(product.id);
    editFormik.setValues({
      brand: product.brand,
      width: product.width,
      height: product.height,
      diameter: product.diameter,
      price: String(Number(product.price)),
      description: product.description,
      imageUrl: product.imageUrl,
      categoryId: product.category?.id ?? '',
      addedById: '',
    });
    editFormik.setTouched({});
  };

  const onDeleteProduct = async (productId: string) => {
    const confirmed = window.confirm('Stergi acest produs din catalog?');
    if (!confirmed) {
      return;
    }

    setEditLoading(true);
    setError('');

    try {
      await adminDeleteProduct(token, productId);
      setNotice('Produs sters.');
      await loadCrmData(token);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Stergerea a esuat.');
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <article className="page-block crm-products-card">
      <div className="section-head" style={{ marginBottom: '0.6rem' }}>
        <h2>Produse ({products.length})</h2>
        <p>Gestioneaza catalogul de produse - editeaza detalii sau sterge articole.</p>
      </div>

      {editingProductId ? (
        <form className="crm-product-edit-modal" onSubmit={editFormik.handleSubmit} noValidate style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0 }}>Editare produs</h3>
          <div className="grid-2" style={{ gap: '1rem' }}>
            <input
              name="brand"
              value={editFormik.values.brand}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
              placeholder="Brand"
            />
            {editFormik.touched.brand && editFormik.errors.brand ? <p className="form-error">{editFormik.errors.brand}</p> : null}
            <input
              name="imageUrl"
              value={editFormik.values.imageUrl}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
              placeholder="URL imagine"
            />
            {editFormik.touched.imageUrl && editFormik.errors.imageUrl ? <p className="form-error">{editFormik.errors.imageUrl}</p> : null}
            <input
              name="width"
              value={editFormik.values.width}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
              placeholder="Latime"
            />
            {editFormik.touched.width && editFormik.errors.width ? <p className="form-error">{editFormik.errors.width}</p> : null}
            <input
              name="height"
              value={editFormik.values.height}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
              placeholder="Inaltime"
            />
            {editFormik.touched.height && editFormik.errors.height ? <p className="form-error">{editFormik.errors.height}</p> : null}
            <input
              name="diameter"
              value={editFormik.values.diameter}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
              placeholder="Diametru"
            />
            {editFormik.touched.diameter && editFormik.errors.diameter ? <p className="form-error">{editFormik.errors.diameter}</p> : null}
            <input
              name="price"
              type="number"
              min={0}
              value={editFormik.values.price}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
              placeholder="Pret"
            />
            {editFormik.touched.price && editFormik.errors.price ? <p className="form-error">{editFormik.errors.price}</p> : null}
          </div>
          <textarea
            name="description"
            style={{ marginTop: '1rem', width: '100%' }}
            value={editFormik.values.description}
            onChange={editFormik.handleChange}
            onBlur={editFormik.handleBlur}
            placeholder="Descriere produs"
          />
          {editFormik.touched.description && editFormik.errors.description ? <p className="form-error">{editFormik.errors.description}</p> : null}
          <div className="crm-form-actions" style={{ marginTop: '1rem' }}>
            <button
              type="submit"
              className="button button-primary"
              disabled={editLoading || editFormik.isSubmitting}
            >
              {editLoading ? 'Se salveaza...' : 'Salveaza modificarile'}
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setEditingProductId(null);
                editFormik.resetForm();
              }}
              disabled={editLoading || editFormik.isSubmitting}
            >
              Anulare
            </button>
          </div>
        </form>
      ) : null}

      <div className="crm-products-list">
        {products.map((product) => (
          <div key={product.id} className="crm-product-row">
            <div>
              <strong>
                {product.width}/{product.height}R{product.diameter} {product.brand}
              </strong>
              <p>{product.category?.name ?? 'Fara categorie'} · {formatPrice(Number(product.price))}</p>
            </div>
            <div className="crm-inline-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => onEditProduct(product)}
              >
                Editeaza
              </button>
              <button
                type="button"
                className="button button-secondary crm-danger"
                onClick={() => onDeleteProduct(product.id)}
                disabled={editLoading}
              >
                Sterge
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 ? <p className="crm-muted">Nu exista produse in catalog.</p> : null}
      </div>
    </article>
  );
}
