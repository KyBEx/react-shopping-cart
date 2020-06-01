import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
export default function formUtils(
  validFormFields = [],
  defaultValues = {},
  dynamicFormFields = {},
  updateUseEffect = []
) {
  const [isVisible, setIsVisible] = useState(dynamicFormFields);
  const [showPassword, setShowPassword] = useState(false);
  const [formFieldValues, setFormFieldValues] = useState(defaultValues);
  const {
    register,
    unregister,
    handleSubmit,
    errors,
    setValue,
    clearError,
    getValues,
    triggerValidation,
    control,
    reset,
    formState,
    setError,
  } = useForm(defaultValues);

  const registerWrapper = {
    email: () => {
      register(
        { name: "email" },
        {
          required: {
            value: true,
            message: "Please enter an email address",
          },
          pattern: {
            value: /^(?:(?:[\w.\-_]+@[\w\d]+(?:\.[\w]{2,6})+)[,;]?\s?)+$/,
            message: "Please enter a valid email address",
          },
        }
      );
    },
    password: () => {
      register(
        { name: "password" },
        {
          required: { value: true, message: "Please enter a password" },
          pattern: {
            // eslint-disable-next-line no-control-regex
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/,
            message:
              "Please enter a password at least 8 characters long and contains at least one lowercase, uppercase, and special character",
          },
        }
      );
    },
    firstName: () => {
      register(
        { name: "firstName" },
        {
          required: { value: true, message: "Please enter a first name" },
        }
      );
    },
    lastName: () => {
      register(
        { name: "lastName" },
        {
          required: { value: true, message: "Please enter a last name" },
        }
      );
    },
  };

  useEffect(() => {
    if (!validFormFields.length) return;
    reset();
    if (Object.keys(dynamicFormFields).length) {
      validFormFields.forEach((key) => {
        dynamicFormFields[key] === false ? null : registerWrapper[key]();
      });
    } else {
      validFormFields.forEach((key) => {
        registerWrapper[key]();
      });
    }
    return () => {
      unregister(validFormFields);
    };
  }, updateUseEffect);

  // need to do work on validation, making the correct icons appear
  function onChange(event, { name, value }) {
    // const { target } = event;
    // if (target.parentNode.childNodes[1]) {
    //   target.parentNode.childNodes[1].style = "visibility: hidden";
    // }
    // target.parentNode.childeNodes[2].style = "visibility: hidden";
    setValue(name, value);
    //triggering clearError on countryOfResidence to get component to re-render and state field to update
    if (errors[name] || name === "countryOfResidence") {
      clearError(name);
    }
  }

  async function validate(event) {
    const { name } = event.target;
    const valid = await triggerValidation(name);
    if (valid && formState.submitCount > 0) {
      //this is to trigger re-render on subsequent uses of form
      clearError(name);
    }
  }

  //fix this, or get rid of it
  function onNumberChange(name, values) {
    if (name === "phone") {
      setValue(name, values);
    } else {
      setValue(name, values.floatValue);
    }
    if (errors[name]) {
      clearError(name);
    }
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return {
    isVisible,
    formFieldValues,
    setFormFieldValues,
    setIsVisible,
    onChange,
    togglePassword,
    showPassword,
    onNumberChange,
    register,
    unregister,
    handleSubmit,
    errors,
    setValue,
    clearError,
    getValues,
    triggerValidation,
    validate,
    reset,
    setError,
    control,
    formState,
  };
}
