import { FormikErrors } from "formik";
import { toast } from "react-hot-toast";

interface loginValues {
  email: string;
  password: string;
}

interface registerValues {
  email: string;
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

function containsUppercase(str: string) {
  return /[A-Z]/.test(str);
}

function containsNumbers(str: string) {
  return /\d/.test(str);
}

export default function loginValidate(values: loginValues) {
  toast.dismiss();
  let errors: FormikErrors<loginValues> = {};

  if (!values.email) {
    errors.email = "Email Required";
    toast.error("Email Required");
  }

  if (!values.password) {
    errors.password = "Password Required";
    toast.error("Password Required");
  }

  return errors;
}

// Validation files that check user inputs in registration form

export function registerValidate(values: registerValues) {
  toast.dismiss();
  let errors: FormikErrors<registerValues> = {};

  if (!values.email) {
    errors.email = "Required";
    toast.error("Email Required");
  }
  //  else if (!/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(make-it-all)\.co.uk ?$/i.test(values.email)) {
  //   errors.email = "Invalid Email Address";
  //   toast.error("Invalid Email Address\nMust Contain @make-it-all.co.uk Suffix");
  // }

  if (!values.name) {
    errors.name = "Required";
    toast.error("Full Name Required");
  }

  if (!values.username) {
    errors.username = "Required";
    toast.error("Username Required");
  } else if (values.username.includes(" ")) {
    errors.username = "Username Must Not Contain Any Spaces";
    toast.error("Username Must Not Contain Any Spaces");
  }

  if (!values.password) {
    errors.password = "Password Required";
    toast.error("Password Required");
  } else if (values.password.length < 8) {
    errors.password = "Password Must Be Greater Than 8 Characters";
    toast.error("Password Must Be Greater Than 8 Characters");
  } else if (values.password.includes(" ")) {
    errors.password = "Password Must Not Contain Any Spaces";
    toast.error("Password Must Not Contain Any Spaces");
  } else if (!containsUppercase(values.password)) {
    errors.password = "Password Must Contain At Least One Captial Letter";
    toast.error("Password Must Contain At Least One Captial Letter");
  } else if (!containsNumbers(values.password)) {
    errors.password = "Password Must Contain At Least One Number";
    toast.error("Password Must Contain At Least One Number");
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "You Must Confirm Your Password";
    toast.error("You Must Confirm Your Password");
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords Do Not Match";
    toast.error("Passwords Do Not Match");
  }

  return errors;
}
