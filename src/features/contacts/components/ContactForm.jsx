import { useState } from "react";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import useContactForm from "../hooks/useContactForm";

function ContactForm({ onContactAdded }) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useContactForm();

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function submitForm(e) {
    const isValid = handleSubmit(e);

    if (!isValid) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add contact");
      }

      resetForm();
      onContactAdded();
    } catch {
      setSubmitError("Failed to add contact. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submitForm} className="space-y-4">
      <Input
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name ? errors.name : ""}
        placeholder="Enter name"
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : ""}
        placeholder="Enter email"
      />

      <Input
        label="Phone"
        name="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.phone ? errors.phone : ""}
        placeholder="Enter phone number"
      />

      {submitError && (
        <p className="text-sm text-red-600">
          {submitError}
        </p>
      )}

      <Button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Contact"}
      </Button>
    </form>
  );
}

export default ContactForm;