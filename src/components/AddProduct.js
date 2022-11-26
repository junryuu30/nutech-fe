import React, { useState } from "react"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import { useMutation } from "react-query"
import { API } from "../config/api"

const AddProduct =({ modalAddProduct, setModalAddProduct, getProduct})=>{

    const[message, setMessage] = useState(null)

    const [form, setForm] = useState({
        name: "",
        pricegoods:"",
        sellingprice: "",
        image: "",
        stock:"",
    })

    const handleChange = (e) => {
        // if(e.target.files[0].size > 100000){
        //     alert("max 100kb")
        //     return
        // }
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value
        })

        if(e.target.files[0].size>= 100000){
            alert("file harus kurang 100kb");
            setForm({
                ...form,
                image:"",
            })
        }
        console.log(e.target.files)
    }
    console.log(form)

    const handleSubmit = useMutation(async(e)=>{
        try {
            e.preventDefault()

            const formData = new FormData()
            formData.set("name", form.name)
            formData.set("pricegoods", form.pricegoods)
            formData.set("sellingprice", form.sellingprice)
            formData.set("stock", form.stock)
            formData.set("image", form.image[0], form.image[0].name)

            const data = await API.post("/product", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            });
            setModalAddProduct(false)
            getProduct()

        } catch (err) {
            const alert = (
                <Alert variant="danger">Gagal Menambahkan Product</Alert>
            );
            setMessage(alert);
            console.log(err)
        }
    })
    return(
        <div>
            <Modal 
            show={modalAddProduct} onHide={() => setModalAddProduct(false)}
                className="d-flex flex-column justify-content-center align-items-center"
            >
                <Modal.Header>
                <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {message && message}
                <Form
                onSubmit={(e) => handleSubmit.mutate(e)}
                >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control 
                        type="title" placeholder="Nama Barang" 
                        className="bg-grayinput rounded-0"
                        onChange={handleChange} name="name"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="number" placeholder="Harga Barang" className="bg-grayinput rounded-0"
                        onChange={handleChange} name="pricegoods"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="number" placeholder="Harga Jual"
                        className="bg-grayinput rounded-0"
                        onChange={handleChange} name="sellingprice"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="number" placeholder="Stock"
                        className="bg-grayinput rounded-0"
                        onChange={handleChange} name="stock"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="file" 
                                        placeholder="File"
                                        name="image"
                                        onChange={handleChange}
                                        className="bg-grayinput rounded-0" />
                    </Form.Group>
                        <Button variant="secondary" 
                            type="submit"
                            >
                            Add Product
                        </Button>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddProduct