import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import { UserContext } from "./context/userContext";

const UpdateProduct = ({ modalUpdate, setModalUpdate, save, getProduct }) => {
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading]= useState(false)
  

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  console.log(form);

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const id = save.id
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0].name);
      }
      formData.set("name", form.name);
      formData.set("pricegoods", form.pricegoods);
      formData.set("sellingprice", form.sellingprice);
      formData.set("stock", form.stock);

      const data = await API.patch(`/product/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
        
      });

      console.log("data editt product mana niiii", data);
      navigate("/form");
      getProduct()
      setIsLoading(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        show={modalUpdate}
        onHide={() => setModalUpdate(false)}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <Modal.Header
        // closeButton
        >
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => handleUpdate(e)}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="name"
                placeholder={save?.name}
                className="bg-grayinput rounded-0"
                // value=
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                placeholder={save?.pricegoods}
                className="bg-grayinput rounded-0"
                name="pricegoods"
                // value={form.pricegoods}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                placeholder={save?.sellingprice}
                className="bg-grayinput rounded-0"
                // value=
                name="sellingprice"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="number"
                placeholder={save?.stock}
                className="bg-grayinput rounded-0"
                // value={form.stock}
                name="stock"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="file"
                placeholder="File"
                name="image"
                className="bg-grayinput rounded-0"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="dark" 
            type="submit"
            onClick={() => setModalUpdate(false)}
            >
              Update Product
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateProduct;
