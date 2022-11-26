import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Modal,
  Navbar,
  Table,
} from "react-bootstrap";
import makanan9 from "../assets/makanan9.jpg";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import logoNutech from "../assets/LogoNutech.png";
import { UserContext } from "../components/context/userContext";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { numberWithCommas } from '../utils/utils'
import PaginationComponent from "../components/PaginationComponent";

const Formnutech = () => {
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setmodalDelete] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [product, setProduct] = useState();
  const [save, setSave] = useState();
  const [query, setQuery] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState();
  const ITEM_PER_PAGE = 5;

  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.token,
    },
  };

  const getProduct = async () => {
    try {
      const response = await API.get("/products", config);

      console.log("response produk", response);

      setProduct(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const id = save.id;
    try {
      await API.delete(`/product/${id}`);
      setmodalDelete(false);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const productsData = useMemo(()=>{
    let computedComments = product;

    // setTotalItems(computedComments.length);

    // return computedComments.slice(
    //   ( currentPage - 1) * ITEM_PER_PAGE,
    //   ( currentPage - 1 ) * ITEM_PER_PAGE + ITEM_PER_PAGE
    // );
  }, [product]);

  return (
    <div>
      <Navbar className="bg-cream nav" variant="dark">
        <Container>
          <Navbar.Brand>
            <img src={logoNutech} alt="" style={{ width: "100px" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbar-scroll" className="justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="bg-yellow" id="dropdown-basic">
                <img
                  src={makanan9}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-circle"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  href="#/action-3"
                  // onClick={()=> navigate('/')}
                  onClick={handleLogout}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <div class="row ">
          <div class="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form class="form-inline">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Product"
                  aria-label="Search"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div
            class="col-sm-3 offset-sm-2 mt-5 mb-4 text-dark"
            style={{ color: "green" }}
          >
            <h2>
              <b>Stock Product</b>
            </h2>
          </div>
          <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="success"
            className="btn bg-greeny text-black fw-bold me-2 px-5"
             onClick={() => setModalAddProduct(true)}>
              Add Product
            </Button>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr className="bg-creamtable">
              <th>No</th>
              <th>Foto Barang</th>
              <th>Nama Barang</th>
              <th>Harga Beli</th>
              <th>Harga Jual</th>
              <th>Stok</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product
              ?.filter((item) => {
                return query.toLocaleLowerCase() === ""
                  ? item
                  : item.name.toLocaleLowerCase().includes(query);
              })
              .map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="d-flex justify-content-center">
                    <div style={{ width: "120px" }}>
                      <img
                        src={item.image}
                        alt="makanan"
                        style={{ width: "100%", borderRadius: "10px" }}
                      />
                    </div>
                  </td>
                  <td>{item?.name}</td>
                  <td>Rp. {numberWithCommas(item.pricegoods)}</td>
                  <td>Rp. {numberWithCommas(item.sellingprice)}</td>
                  <td>{item.stock}</td>
                  <td>
                    <Button
                      className="btn bg-pink text-white fw-bold me-2 px-5"
                      onClick={() => {
                        setmodalDelete(true);
                        setSave(item);
                      }}
                    >
                      Delete
                    </Button>
                    <Button className="btn bg-blackgreen text-white fw-bold me-2 px-5"
                      // onClick={() => setModalUpdate(true)}
                      onClick={() => {
                        setModalUpdate(true);
                        setSave(item);
                      }}
                    >
                      Update
                    </Button>
                  </td>
                  <Modal
                    show={modalDelete}
                    onHide={() => setmodalDelete(false)}
                    animation={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        Are You sure Delete {item.name} ?
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        // onClick={() => {setmodalDelete(false); handleDelete}}
                        onClick={handleDelete}
                      >
                        Yes delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </tr>
              ))}
          </tbody>
        </Table>

        <PaginationComponent
          total={totalItems}
          itemsPerPage={ITEM_PER_PAGE}
          currentPage={currentPage}
          onPageChange={ page => setCurrentPage(page) }
        />
      </Container>

      <AddProduct
        modalAddProduct={modalAddProduct}
        setModalAddProduct={setModalAddProduct}
        getProduct={getProduct}
      />
      <UpdateProduct
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        save={save}
        getProduct={getProduct}
      />
    </div>
  );
};

export default Formnutech;
