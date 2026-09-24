"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  adminLogin,
  AdminOrderResponse,
  AdminUser,
  getCategories,
  adminGetUsers,
  adminGetProducts,
  adminGetOrders,
} from "@/lib/api";
import { Category, Tire } from "@/lib/types";

const ADMIN_TOKEN_KEY = "agromir-admin-token";

const loginSchema = Yup.object({
  username: Yup.string().trim().required("Utilizatorul este obligatoriu."),
  password: Yup.string().min(3, "Parola este prea scurta.").required("Parola este obligatorie."),
});

interface CrmContextValue {
  token: string;
  products: Tire[];
  orders: AdminOrderResponse[];
  users: AdminUser[];
  categories: Category[];
  loading: boolean;
  error: string;
  notice: string;
  clearSession: () => void;
  loadCrmData: (authToken: string) => Promise<void>;
  setError: (error: string) => void;
  setNotice: (notice: string) => void;
}

export const CrmContext = React.createContext<CrmContextValue | null>(null);

export function useCrm() {
  const context = React.useContext(CrmContext);
  if (!context) {
    throw new Error("useCrm must be used within CrmLayout");
  }
  return context;
}

import React from "react";

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }
    return window.localStorage.getItem(ADMIN_TOKEN_KEY) ?? "";
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [products, setProducts] = useState<Tire[]>([]);
  const [orders, setOrders] = useState<AdminOrderResponse[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const clearSession = useCallback(() => {
    setToken("");
    setProducts([]);
    setOrders([]);
    setUsers([]);
    setCategories([]);
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
  }, []);

  const loadCrmData = useCallback(
    async (authToken: string) => {
      setLoading(true);
      setError("");

      try {
        const [productsData, ordersData, usersData, categoriesData] =
          await Promise.all([
            adminGetProducts(authToken),
            adminGetOrders(authToken),
            adminGetUsers(authToken),
            getCategories(),
          ]);

        setProducts(productsData);
        setOrders(ordersData);
        setUsers(usersData);
        setCategories(categoriesData);
      } catch (fetchError) {
        const message =
          fetchError instanceof Error
            ? fetchError.message
            : "Nu am putut incarca datele CRM.";
        setError(message);

        if (message.toLowerCase().includes("token")) {
          clearSession();
        }
      } finally {
        setLoading(false);
      }
    },
    [clearSession],
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    const task = window.setTimeout(() => {
      void loadCrmData(token);
    }, 0);

    return () => window.clearTimeout(task);
  }, [loadCrmData, token]);

  const loginFormik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setError("");
      setNotice("");

      try {
        const response = await adminLogin({
          username: values.username.trim(),
          password: values.password,
        });
        setToken(response.accessToken);
        window.localStorage.setItem(ADMIN_TOKEN_KEY, response.accessToken);
        setNotice("Autentificare reusita.");
        resetForm();
      } catch (loginError) {
        setError(
          loginError instanceof Error
            ? loginError.message
            : "Autentificare esuata.",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!token) {
    return (
      <section className="crm-shell reveal-up">
        <article className="page-block crm-login-card">
          <p className="eyebrow" style={{ margin: 0 }}>
            CRM Admin
          </p>
          <h1 style={{ marginTop: "0.55rem", marginBottom: "0.7rem" }}>
            Autentificare administrator
          </h1>
          <p className="crm-login-copy">
            Accesul este permis doar utilizatorilor admin autentificati.
          </p>

          <form className="crm-login-form" onSubmit={loginFormik.handleSubmit} noValidate>
            <input
              name="username"
              value={loginFormik.values.username}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              placeholder="Utilizator admin"
              required
            />
            {loginFormik.touched.username && loginFormik.errors.username ? (
              <p className="form-error">{loginFormik.errors.username}</p>
            ) : null}
            <input
              name="password"
              type="password"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              placeholder="Parola"
              required
            />
            {loginFormik.touched.password && loginFormik.errors.password ? (
              <p className="form-error">{loginFormik.errors.password}</p>
            ) : null}
            <button
              type="submit"
              className="button button-primary"
              disabled={loginFormik.isSubmitting}
            >
              {loginFormik.isSubmitting ? "Se valideaza..." : "Intra in CRM"}
            </button>
          </form>

          {error ? <p className="crm-error">{error}</p> : null}
        </article>
      </section>
    );
  }

  const contextValue: CrmContextValue = {
    token,
    products,
    orders,
    users,
    categories,
    loading,
    error,
    notice,
    clearSession,
    loadCrmData,
    setError,
    setNotice,
  };

  return (
    <CrmContext.Provider value={contextValue}>
      <section className="crm-shell reveal-up">
        <article className="page-block crm-top-bar">
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>
              CRM Admin
            </p>
            <h1 style={{ marginTop: "0.45rem", marginBottom: "0.3rem" }}>
              Control catalog si comenzi
            </h1>
            <p className="crm-muted">
              Administreaza produse, verifica comenzi si actualizeaza livrarea.
            </p>
          </div>
          <button
            type="button"
            className="button button-secondary"
            onClick={clearSession}
          >
            Deconectare
          </button>
        </article>

        <nav className="crm-nav">
          <Link
            href="/crm/orders"
            className={`crm-nav-link${pathname === "/crm/orders" || pathname === "/crm" ? " is-active" : ""}`}
          >
            <span className="crm-nav-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 4H17M7 9H17M7 14H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M5 3.5H19C19.83 3.5 20.5 4.17 20.5 5V19C20.5 19.83 19.83 20.5 19 20.5H5C4.17 20.5 3.5 19.83 3.5 19V5C3.5 4.17 4.17 3.5 5 3.5Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </span>
            <span className="crm-nav-label">Verifica comenzi</span>
            <span className="crm-nav-meta">{orders.length}</span>
          </Link>
          <Link
            href="/crm/products"
            className={`crm-nav-link${pathname === "/crm/products" ? " is-active" : ""}`}
          >
            <span className="crm-nav-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7.5L12 3.5L20 7.5L12 11.5L4 7.5Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 7.5V16.5L12 20.5V11.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M20 7.5V16.5L12 20.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </span>
            <span className="crm-nav-label">Gestioneaza produse</span>
            <span className="crm-nav-meta">{products.length}</span>
          </Link>
          <Link
            href="/crm/add-product"
            className={`crm-nav-link${pathname === "/crm/add-product" ? " is-active" : ""}`}
          >
            <span className="crm-nav-icon" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"/>
                <path d="M4.5 4.5H19.5V19.5H4.5V4.5Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </span>
            <span className="crm-nav-label">Adauga produs nou</span>
            <span className="crm-nav-meta">nou</span>
          </Link>
        </nav>

        {error ? <p className="crm-error">{error}</p> : null}
        {notice ? <p className="crm-notice">{notice}</p> : null}

        {children}
      </section>
    </CrmContext.Provider>
  );
}
