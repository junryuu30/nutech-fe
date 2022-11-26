import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import gambar1 from "../assets/gambar1.jpg"
import gambar2 from "../assets/gambar2.jpg"
import gambar3 from "../assets/gambar3.jpg"
import gambar4 from "../assets/gambar4.jpg"
import gambar5 from "../assets/gambar5.jpg"
import gambar6 from "../assets/gambar6.jpg"

const Landing = () => {
    const[modalLogin, setModalLogin]= useState(false)
    const[modalRegister, setModalRegister] = useState(false)

    

  return (
    <div className="bg-green h-page d-flex justify-content-center align-item-center">
      <Container className="">
        <Row className="d-flex justify-content-center mt-5">
          <Col className="" lg={4}>
            <h1 className="text-white mt-3 my-5">Add Your Product Now</h1>

            <Button className="btn bg-gray text-dark fw-bold me-3 px-5" 
              onClick={() => setModalRegister(true)}
              >
                Sign Up
            </Button>
            
            <Button className="btn bg-gray text-dark fw-bold me-3 px-5" 
              onClick={() => setModalLogin(true)}
              >
                Sign In
              </Button>
          </Col>
          <Col lg={8}>
            <Row className="my-5">
              <Col className="me-5 mb-5" lg={3}>
                <img src={gambar1} alt="" style={{width:"200px", borderRadius:"10px"}}/>
              </Col>
              <Col lg={3} className="me-5 mb-5">
                <img src={gambar2} alt="" style={{width:"200px", borderRadius:"10px"}}/>
              </Col>
              <Col lg={3} className="me-5">
                <img src={gambar3} alt="" style={{width:"200px",borderRadius:"10px"}}/>
              </Col>
            </Row>
            <Row>
              <Col className="me-5 mb-5" lg={3}>
                <img src={gambar4} alt="" style={{width:"200px", borderRadius:"10px"}}/>
              </Col>
              <Col lg={3} className="me-5 mb-5">
                <img src={gambar5} alt="" style={{width:"200px", borderRadius:"10px"}}/>
              </Col>
              <Col lg={3} className="me-5 mb-5">
                <img src={gambar6} alt="" style={{width:"200px",borderRadius:"10px"}}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Login modalLogin={modalLogin} setModalLogin={setModalLogin} setModalRegister={setModalRegister}/>
      <Register modalRegister={modalRegister} setModalRegister={setModalRegister} setModalLogin={setModalLogin}/>
    </div>
  );
};

export default Landing;
