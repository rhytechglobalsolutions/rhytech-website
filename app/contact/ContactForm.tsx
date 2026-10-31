
"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  RotateCcw,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

const services = [
  "Software Development",
  "Website Design",
  "Mobile Applications",
  "Data Migration",
  "Motion Graphics",
  "Cloud Services",
  "SEO / GEO / AEO",
  "Digital Marketing",
  "UX/UI Design",
  "Graphic Design / Print",
  "Data Entry",
  "ERP Systems",
  "Product enquiry",
  "Other",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("company") || ""),
      phone: String(formData.get("phone") || ""),
      service: String(formData.get("service") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to send your enquiry. Please try again."
        );
      }

      form.reset();
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="contact-form-wrap">
      {sent ? (
        <div
          className="contact-form-success"
          role="status"
          aria-live="polite"
        >
          <span className="contact-success-icon">
            <CheckCircle2 size={30} aria-hidden="true" />
          </span>

          <span className="contact-mini-label">ENQUIRY SENT SUCCESSFULLY</span>

          <h4>Thank you for contacting Rhytech!</h4>

          <p>
            Your enquiry has been received. Our team will review your
            requirements and get back to you as soon as possible.
          </p>

          <div className="contact-success-actions">
            <button
              type="button"
              className="contact-reset-btn"
              onClick={() => {
                setSent(false);
                setError("");
              }}
            >
              <RotateCcw size={15} aria-hidden="true" />
              Send another enquiry
            </button>
          </div>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-grid">
            <label className="contact-field">
              <span>Full name <i>*</i></span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your full name"
                maxLength={100}
                required
              />
            </label>

            <label className="contact-field">
              <span>Work email <i>*</i></span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
                maxLength={254}
                required
              />
            </label>

            <label className="contact-field">
              <span>Company</span>
              <input
                type="text"
                name="company"
                autoComplete="organization"
                placeholder="Your company name"
                maxLength={150}
              />
            </label>

            <label className="contact-field">
              <span>Phone number</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="+1 (000) 000-0000"
                maxLength={50}
              />
            </label>

            <label className="contact-field contact-field-full">
              <span>What can we help you with? <i>*</i></span>
              <select name="service" defaultValue="" required>
                <option value="" disabled>
                  Choose a service
                </option>

                {services.map((service) => (
                  <option value={service} key={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>

            <label className="contact-field contact-field-full">
              <span>Project details <i>*</i></span>
              <textarea
                name="message"
                rows={5}
                minLength={10}
                maxLength={5000}
                placeholder="Tell us about your goals, challenges, timeline or the result you want to achieve..."
                required
              />
              <small>
                A short overview is enough to get the conversation started.
              </small>
            </label>

            {/* Honeypot field for basic bot protection */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-10000px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              <label>
                Leave this field empty
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>
          </div>

          {error && (
            <div className="contact-form-error" role="alert">
              <AlertCircle size={17} aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="contact-form-submit-row">
            <button
              type="submit"
              className="contact-btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  Sending enquiry
                  <LoaderCircle
                    size={17}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                </>
              ) : (
                <>
                  Send enquiry
                  <ArrowUpRight size={17} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
