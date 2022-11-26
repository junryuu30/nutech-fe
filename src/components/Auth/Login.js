import React, { useContext, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../context/userContext";

const Login = ({modalLogin, setModalLogin, setModalRegister}) => {
    const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext);
    const [message, setMessage] = useState(null)

    const [form, setForm] = useState({
        email:'',
        password:'',
    })
    const { email, password } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        const data = await API.post("/login", form);
  
        const alert = (
          <Alert variant="success" className="py-2">
            Login Success!
          </Alert>
        );
  
        setMessage(alert);
  
        let payload = data.data.data;
        dispatch({
          type: "LOGIN_SUCCESS",
          payload,
        });
        navigate("/form");
      } catch (error) {
        const alert = (
          <Alert variant="danger" className="py-2">
            Wrong Email or Password!
          </Alert>
        );
  
        setMessage(alert);
      }
    });

  return (
    <>
      <Modal
        show={modalLogin}
        onHide={() => setModalLogin(false)}
        size="md"
        aria-labelledby="d-flex flex-column justify-content-center align-items-centerr"
        centered
      >
        <Modal.Body className="modal-body">
          <h2 className="text-darkblue mb-4">Sign In</h2>
          {/* {message && message} */}
          <form 
          onSubmit={(e) => handleOnSubmit.mutate(e)}
          >
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
            >
              Sign In
            </Button>
          </form>
          <p className="text-center">
            Don't have an account ? Click{" "}
            <span
              className="click-here fw-bold"
              onClick={() => {
                setModalRegister(true);
                setModalLogin(false);
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

export default Login;
