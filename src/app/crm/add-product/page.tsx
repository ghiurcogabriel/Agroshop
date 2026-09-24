'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminCreateProduct, AdminTirePayload } from '@/lib/api';
import { CrmContext } from '../layout';
import React from 'react';

interface ProductFormValues {
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

const initialProductForm: ProductFormValues = {
  brand: '',
  width: '',
  height: '',
  diameter: '',
  price: '',
  description: '',
  imageUrl: '',
  categoryId: '',
  addedById: '',
};

const productSchema = Yup.object({
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
  categoryId: Yup.string().trim().required('Categoria este obligatorie.'),
  addedById: Yup.string().trim().required('Operatorul este obligatoriu.'),
});

export default function AddProductPage() {
  const context = React.useContext(CrmContext);
  if (!context) {
    throw new Error('AddProductPage must be used within CrmLayout');
  }

  const { token, users, categories, loading, setError, setNotice, loadCrmData } = context;
  const formik = useFormik<ProductFormValues>({
    initialValues: initialProductForm,
    validationSchema: productSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (!token) {
        return;
      }

      setError('');
      setNotice('');

      try {
        const payload: AdminTirePayload = {
          brand: values.brand.trim(),
          width: values.width.trim(),
          height: values.height.trim(),
          diameter: values.diameter.trim(),
          price: Number(values.price),
          description: values.description.trim(),
          imageUrl: values.imageUrl.trim(),
          categoryId: values.categoryId,
          addedById: values.addedById,
        };

        await adminCreateProduct(token, payload);
        setNotice('Produs adaugat cu succes.');
        resetForm();
        await loadCrmData(token);
      } catch (submitError) {
        setError(submitError instanceof Error ? submitError.message : 'Operatiunea a esuat.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <article className="page-block crm-form-card">
      <h2 style={{ marginTop: 0, marginBottom: '0.7rem' }}>Adauga produs nou in catalog</h2>
      <p className="crm-muted" style={{ marginBottom: '1.2rem' }}>
        Completeaza detaliile produsului. Toate campurile sunt obligatorii.
      </p>

      <form className="crm-product-form" onSubmit={formik.handleSubmit} noValidate>
        <div className="grid-2">
          <div>
            <label className="form-label">Brand</label>
            <input
              name="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="ex: Michelin"
            />
            {formik.touched.brand && formik.errors.brand ? <p className="form-error">{formik.errors.brand}</p> : null}
          </div>
          <div>
            <label className="form-label">URL imagine</label>
            <input
              name="imageUrl"
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="ex: https://example.com/image.jpg"
            />
            {formik.touched.imageUrl && formik.errors.imageUrl ? <p className="form-error">{formik.errors.imageUrl}</p> : null}
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: '0.6rem' }}>
          <div>
            <label className="form-label">Latime</label>
            <input
              name="width"
              value={formik.values.width}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="ex: 185"
            />
            {formik.touched.width && formik.errors.width ? <p className="form-error">{formik.errors.width}</p> : null}
          </div>
          <div>
            <label className="form-label">Inaltime</label>
            <input
              name="height"
              value={formik.values.height}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="ex: 60"
            />
            {formik.touched.height && formik.errors.height ? <p className="form-error">{formik.errors.height}</p> : null}
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: '0.6rem' }}>
          <div>
            <label className="form-label">Diametru</label>
            <input
              name="diameter"
              value={formik.values.diameter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="ex: 14"
            />
            {formik.touched.diameter && formik.errors.diameter ? <p className="form-error">{formik.errors.diameter}</p> : null}
          </div>
          <div>
            <label className="form-label">Pret (RON)</label>
            <input
              name="price"
              type="number"
              min={0}
              step={0.01}
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="ex: 299.99"
            />
            {formik.touched.price && formik.errors.price ? <p className="form-error">{formik.errors.price}</p> : null}
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: '0.6rem' }}>
          <div>
            <label className="form-label">Categorie</label>
            <select
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Selecteaza categorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.touched.categoryId && formik.errors.categoryId ? <p className="form-error">{formik.errors.categoryId}</p> : null}
          </div>
          <div>
            <label className="form-label">Operator</label>
            <select
              name="addedById"
              value={formik.values.addedById}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Selecteaza operator</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
            {formik.touched.addedById && formik.errors.addedById ? <p className="form-error">{formik.errors.addedById}</p> : null}
          </div>
        </div>

        <div style={{ marginTop: '0.6rem' }}>
          <label className="form-label">Descriere produs</label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Adauga o descriere detaliata a produsului..."
            rows={5}
          />
          {formik.touched.description && formik.errors.description ? <p className="form-error">{formik.errors.description}</p> : null}
        </div>

        <div className="crm-form-actions" style={{ marginTop: '1.2rem' }}>
          <button type="submit" className="button button-primary" disabled={formik.isSubmitting || loading}>
            {formik.isSubmitting ? 'Se adauga...' : 'Adauga produs in catalog'}
          </button>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => formik.resetForm()}
            disabled={formik.isSubmitting}
          >
            Clearare formular
          </button>
        </div>
      </form>
    </article>
  );
}
