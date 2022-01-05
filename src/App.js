import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Modal, Nav, Navbar, Row} from "react-bootstrap";
import {FaEnvelope, FaGithub, FaLinkedinIn} from "react-icons/fa";
import {useState} from "react";
import Home from "./components/Home";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <>
     <Navbar bg="primary" expand="lg" className={"text-uppercase navbar-expand-lg navbar-light fixed-top"} id={"mainNav"} variant={"dark"}>
  <Container>
    <Navbar.Brand href="#home">Certificate Generator</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link href="#home" className={"navItem mx-0 mx-lg-1"}>Home</Nav.Link>
        <Nav.Link href="#link" className={"navItem mx-0 mx-lg-1"} onClick={handleShow}>Link</Nav.Link>
         <Nav.Link href="#about" className={"navItem mx-0 mx-lg-1"}>About</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


      <Modal show={show} onHide={handleClose} align={"center"} centered size="lg" style={{"font-family": "Montserrat"}}>
        <Modal.Header closeButton>
          <Modal.Title>Club login</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>



        <Home/>




        <footer className="text-center footer" id={"about"}>
          <Container>
            <Row>
              <Col className="col-md-4 mb-5 mb-lg-0">
                <h4 className="text-uppercase mb-4">MORE</h4>

                  <a href={"https://github.com/RohanKaran/certificate-generator/issues/new/choose"}
                     className={"text-white text-decoration-none"}>
                    <p>Report a bug</p>
                  </a>

                  <a href={"https://github.com/RohanKaran/certificate-generator"}
                        className={"text-white text-decoration-none"}>
                    <p>
                      View app source
                    </p>
                  </a>

              </Col>
              <Col className="col-md-4 mb-5 mb-lg-0">
                <h4 className="text-uppercase mb-4">CONTACT</h4>
                <ul className="list-inline">
                  <li className="list-inline-item"><Button
                      variant="outline-light rounded-circle" role="button" href="https://linkedin.com/in/rohankaran001">
                    <FaLinkedinIn className={"mb-1"}/>
                  </Button></li>
                  <li className="list-inline-item"><Button
                      variant="outline-light rounded-circle" role="button"
                      href="https://github.com/rohankaran">
                    <FaGithub className={"mb-1"}/>
                  </Button></li>
                  <li className="list-inline-item"><Button
                      variant="outline-light rounded-circle" role="button"
                      href="mailto:rohankaran001@gmail.com">
                    <FaEnvelope className={"mb-1"}/>
                  </Button></li>
                </ul>
              </Col>
              <Col className="col-md-4 mb-5 mb-lg-0">
                <h4 className="text-uppercase mb-4">About</h4>
                <p>Certificate Generator web site created using FastAPI and React</p>
              </Col>
            </Row>
          </Container>
        </footer>
        </>
  );
}

export default App;
