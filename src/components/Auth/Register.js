import React, { useState } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../../config/api";

const Register = ({modalRegister, setModalRegister, setModalLogin}) => {

  const [message, setMessage] = useState(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
});

const { name, email, password } = form;

const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,

    });
};

const handleSubmit = useMutation(async (e) => {
    try {
        e.preventDefault();

        // Configuration Content-type
        const response = await API.post("/register", form)
        const alert = (
            <Alert variant="success">Registration Succeeded</Alert>
        )
        setModalLogin(true);
        setModalRegister(false);
        setMessage(alert);
    } catch (err) {
        console.log(err);
        const alert = (
            <Alert variant="danger">Registration Failed</Alert>
        );
        setMessage(alert);
    }
});

  return (
    <>
      <Modal
        show={modalRegister}
        onHide={() => setModalRegister(false)}
        size="md"
        aria-labelledby="d-flex flex-column justify-content-center align-items-centerr"
        centered
      >
        <Modal.Body className="modal-body">
          <h2 className="text-darkblue mb-4">Register</h2>
          {message && message}
          <form
            onSubmit={(e) => handleSubmit.mutate(e)}
          >
            <div className="mb-3">
              <input type="text" 
              className="form-control" 
              aria-describedby="emailHelp" 
              placeholder="Full Name" 
              onChange={handleChange} 
              name="name"
              value={name}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Email"
                name="email"
                  value={form.email}
                  onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                aria-describedby="emailHelp"
                placeholder="Password"
                name="password"
                  value={form.password}
                  onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="btn bg-cream text-light fw-bold w-100 mb-4"
              // onClick={() => navigate("/search")}
            >
              Sign Up
            </Button>
          </form>
          <p className="text-center">
            Have an account ? Click{" "}
            <span
              className="click-here fw-bold"
              onClick={() => {
                setModalRegister(false);
                setModalLogin(true);
              }}
              style={{ cursor: "pointer" }}
            >
              Here
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Register;
