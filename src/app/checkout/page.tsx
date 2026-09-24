"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { createOrder } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

function formatPrice(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  }).format(value);
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  county: string;
  notes?: string;
};

const checkoutValidationSchema = Yup.object({
  firstName: Yup.string().trim().required("Prenumele este obligatoriu"),
  lastName: Yup.string().trim().required("Numele este obligatoriu"),
  email: Yup.string()
    .trim()
    .email("Email invalid")
    .required("Emailul este obligatoriu"),
  phone: Yup.string()
    .trim()
    .matches(/^[0-9+\-()\s]{8,20}$/, "Numar de telefon invalid")
    .required("Telefonul este obligatoriu"),
  address: Yup.string().trim().required("Adresa este obligatorie"),
  city: Yup.string().trim().required("Orasul este obligatoriu"),
  zipCode: Yup.string()
    .trim()
    .matches(/^\d{4,10}$/, "Cod postal invalid")
    .required("Codul postal este obligatoriu"),
  county: Yup.string().trim().required("Judetul este obligatoriu"),
  notes: Yup.string().trim().max(1500, "Maxim 1500 caractere"),
});

const fieldErrorStyle = {
  color: "#962f2f",
  fontSize: "0.82rem",
  marginTop: "0.35rem",
};

const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [error, setError] = useState("");

  const initialValues: FormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    county: "",
    notes: "",
  };

  if (cart.length === 0) {
    return (
      <div className="page-block reveal-up">
        <h1 style={{ marginTop: 0 }}>Checkout</h1>
        <p>
          Cosul tau este gol. <Link href="/magazin">Mergi la magazin</Link>
        </p>
      </div>
    );
  }

  const handleSubmit = async (
    values: FormData,
    { setSubmitting }: FormikHelpers<FormData>,
  ) => {
    setError("");

    try {
      const orderData = {
        ...values,
        items: cart.map((item) => ({
          tireId: item.tireId,
          diameter: item.diameter,
          width: item.width,
          height: item.height,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),
      };

      const order = await createOrder(orderData);
      clearCart();
      router.push(`/success/${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setSubmitting(false);
    }
  };

  return (
    <div className="stack-lg reveal-up">
      <h1 style={{ margin: 0 }}>Completeaza detaliile comenzii</h1>

      <div className="grid-2">
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="checkout-form" noValidate>
              <div className="form-group">
                <label htmlFor="firstName">Prenume *</label>
                <Field id="firstName" name="firstName" type="text" />
                <ErrorMessage name="firstName">
                  {(message) => <div style={fieldErrorStyle}>{message}</div>}
                </ErrorMessage>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Nume *</label>
                <Field id="lastName" name="lastName" type="text" />
                <ErrorMessage name="lastName">
                  {(message) => <div style={fieldErrorStyle}>{message}</div>}
                </ErrorMessage>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <Field id="email" name="email" type="email" />
                <ErrorMessage name="email">
                  {(message) => <div style={fieldErrorStyle}>{message}</div>}
                </ErrorMessage>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefon *</label>
                <Field id="phone" name="phone" type="tel" />
                <ErrorMessage name="phone">
                  {(message) => <div style={fieldErrorStyle}>{message}</div>}
                </ErrorMessage>
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">Adresa *</label>
                <Field
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Strada, numar"
                />
                <ErrorMessage name="address">
                  {(message) => <div style={fieldErrorStyle}>{message}</div>}
                </ErrorMessage>
              </div>

              <div className="form-group">
                <label htmlFor="city">Oras *</label>
                <Field id="city" name="city" type="text" />
                <ErrorMessage name="city">
                  {(message) => <div style={fieldErrorStyle}>{message}</div>}
                </ErrorMessage>
              </div>

              <div className="form-group">
                <label htmlFor="county">Judet *</label>
                <Field id="county" name="county" type="text" />
                <ErrorMessage name="county">
                  {(message) => <div style={fieldErrorStyle}>{message}</div>}
                </ErrorMessage>
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">Cod Postal *</label>
                <Field id="zipCode" name="zipCode" type="text" />
                <ErrorMessage name="zipCode">
                  {(message) => <div style={fieldErrorStyle}>{message}</div>}
                </ErrorMessage>
              </div>

              <div className="form-group full-width">
                <label htmlFor="notes">Note suplimentare</label>
                <Field
                  id="notes"
                  name="notes"
                  as="textarea"
                  placeholder="Orice informatii suplimentare pentru comanda..."
                />
                <ErrorMessage name="notes">
                  {(message) => <div style={fieldErrorStyle}>{message}</div>}
                </ErrorMessage>
              </div>

              {error && (
                <div
                  className="full-width"
                  style={{
                    background: "#fef4f4",
                    color: "#962f2f",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                >
                  {error}
                </div>
              )}

              <div className="full-width">
                <button
                  className="button button-primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ width: "100%" }}
                >
                  {isSubmitting ? "Se proceseaza..." : "Confirma comanda"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="page-block">
          <h3 style={{ marginTop: 0 }}>Rezumat comanda</h3>
          <div className="summary-row">
            <span>Total:</span>
            <span style={{ fontWeight: "bold", color: "var(--brand-strong)" }}>
              {formatPrice(getTotalPrice())}
            </span>
          </div>
          <hr style={{ border: "none", borderTop: "1px solid var(--line)" }} />
          <h4>Articole ({cart.length}):</h4>
          {cart.map((item) => (
            <div
              key={item.tireId}
              style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}
            >
              <div>
                {item.width}/{item.height}R{item.diameter} {item.brand}
              </div>
              <div style={{ color: "var(--ink-soft)" }}>
                x{item.quantity} = {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
