import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  phone: "",
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const phone = values.phone.trim();
  if (phone && !/^\+?[\d\s()-]{7,20}$/.test(phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  return errors;
}

function useContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };

    setValues(nextValues);
    if (touched[name]) {
      setErrors(validate(nextValues));
    }
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((currentTouched) => ({ ...currentTouched, [name]: true }));
    setErrors(validate(values));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true });
    return Object.keys(nextErrors).length === 0;
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}

export default useContactForm;
