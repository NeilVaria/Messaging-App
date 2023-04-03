import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { FormikValues } from "formik/dist/types";
import { registerValidate } from "../lib/validate";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Button, ThemeProvider, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

interface Values {
  email: string;
  name: string;
  username: string;
  role: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const router = useRouter();

  const [show, setShow] = useState({ password: false, confirmPassword: false });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      role: "user",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: registerValidate,
    onSubmit,
  });

  function handleClick() {
    router.push("/landingpage");
  }

  async function onSubmit(values: Values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch("/api/auth/signup", options);

    if (response.ok) {
      const data = await response.json();
      // Handle a successful response
      if (data.message === "User created successfully") {
        // Call the handleOpen function
        handleOpen();
      }
    } else if (response.status === 404) {
      const data = await response.json();
      // Handle a "not found" error
      toast.error(data.error);
    } else if (response.status === 409) {
      const data = await response.json();
      // Handle a conflict error
      toast.error(data.error);
    } else if (response.status === 500) {
      const data = await response.json();
      // Handle a server error
      toast.error(data.message);
    } else {
      // Handle other errors
      toast.error("Unknown error");
    }
  }
  return (
    <>
      <ThemeProvider>
        <Head>
          <title>Register</title>
        </Head>
        <div>
          <Toaster reverseOrder={true} />
        </div>
        <div className="flex h-screen w-full justify-center items-center bg-gradient-to-tr from-gray-400 to-gray-700">
          <div className="flex flex-col md:flex-row">
            <div>
              <form className="flex flex-col bg-white shadow-lg p-8 w-80 md:w-96 rounded-md" onSubmit={formik.handleSubmit} noValidate autoComplete="false">
                <h1 className="text-3xl font-bold text-center mb-6 md:mt-0 mt-2">Register</h1>
                <div className="mb-6">
                  <label htmlFor="name">Full Name</label>
                  <div className="border-b-2 border-gray-400 focus:border-none p-3">
                    <FontAwesomeIcon icon={faUser} color="grey" />
                    <input placeholder="Type your full name" id="name" className="focus:outline-none ml-2" type="name" {...formik.getFieldProps("name")} />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="username">Username</label>
                  <div className="border-b-2 border-gray-400 focus:border-none p-3">
                    <FontAwesomeIcon icon={faUser} color="grey" />
                    <input
                      placeholder="Type your username"
                      id="username"
                      className="focus:outline-none ml-2"
                      type="username"
                      {...formik.getFieldProps("username")}
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label htmlFor="role">Role</label>
                  <div className="border rounded-md border-gray-400 p-2 mt-1">
                    <select id="role" className="focus:outline-none w-full" {...formik.getFieldProps("role")}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="email">Email</label>
                  <div className="border-b-2 border-gray-400 focus:border-none p-3">
                    <FontAwesomeIcon icon={faEnvelope} color="grey" />
                    <input placeholder="Type your email" id="email" className="focus:outline-none ml-2" type="email" {...formik.getFieldProps("email")} />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="password">Password</label>
                  <div className="border-b-2 border-gray-400 focus:border-none p-3">
                    <FontAwesomeIcon icon={faLock} color="grey" />
                    <input
                      placeholder="Type your password"
                      id="password"
                      className="focus:outline-none ml-2"
                      type="password"
                      {...formik.getFieldProps("password")}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="border-b-2 border-gray-400 focus:border-none p-3">
                    <FontAwesomeIcon icon={faLock} color="grey" />
                    <input
                      placeholder="Confirm your password"
                      id="confirmPassword"
                      className="focus:outline-none ml-2"
                      type="password"
                      {...formik.getFieldProps("confirmPassword")}
                    />
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    className="transition-all bg-gradient-to-tr from-blue-300 to-blue-700 w-full rounded-md hover:shadow-lg hover:bg-blue-300 text-white font-bold py-2 px-4 border-2 border-blue-300 shadow-blue-500/20 hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    data-ripple-light="true"
                  >
                    Register
                  </Button>
                  <Fragment>
                    <Dialog open={open} handler={handleOpen}>
                      <DialogHeader>
                        <div className="text-center text-3xl font-bold  w-full">Registration Succesful</div>
                      </DialogHeader>
                      <DialogBody>
                        <div className="px-2">Your account has been registered, you may now log in</div>
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          className="transition-all bg-gradient-to-tr to-yellow-600 from-amber-700 w-2/5 rounded-full hover:shadow-lg hover:bg-amber-300 text-white font-bold py-2 px-4 border-2 border-yellow-700 shadow-yellow-500/20 hover:shadow-yellow-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          onClick={handleClick}
                        >
                          <span>Confirm</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                  </Fragment>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
