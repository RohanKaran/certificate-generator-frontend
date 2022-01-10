import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Modal, Nav, Navbar, Row} from "react-bootstrap";
import {FaEnvelope, FaGithub, FaLinkedinIn} from "react-icons/fa";
import {useState} from "react";
import Home from "./components/Home";

function App() {
  const [show, setShow] = useState(false);
  const [navbar, setNavbar] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const navShrink = () => {
    if (window.scrollY >= 80){
      setNavbar(true)
    }
    else {
      setNavbar(false)
    }
  }

  window.addEventListener('scroll', navShrink);

  return (
      <>
     <Navbar collapseOnSelect expand="lg"
             className={navbar ? 'active text-uppercase text-white navbar-expand-lg navbar-light'
         : "text-uppercase text-white navbar-expand-lg navbar-light"}
             id={"mainNav"} variant={"dark"} fixed={'top'}>
        <Container>
          <Navbar.Brand className={navbar ? 'active' : ""}>Certificate Generator</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">

              <Nav.Link href="#home" className={"navItem mx-0 mx-lg-1"}>Home</Nav.Link>
              <Nav.Link href="#link" className={"navItem mx-0 mx-lg-1"} onClick={handleShow}>Login</Nav.Link>
              <Nav.Link href="#about" className={"navItem mx-0 mx-lg-1"}>About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Modal id={"modal"} show={show} onHide={handleClose} align={"center"} centered size="lg"
             style={{fontFamily: "Montserrat"}}>
        <Modal.Header closeButton>
          <Modal.Title>CLUB LOGIN</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className={"text-danger card-text"}> Under Development!</div> </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            LOGIN
          </Button>
        </Modal.Footer>
      </Modal>




        <Home/>




        <footer className="text-center footer" id={"about"}>
          <Container>
            <Row>
              <Col className="col-md-4 mb-4 mb-lg-0">
                <h4 className="text-uppercase mb-3">About</h4>
                <p>Certificate Generator website created using FastAPI and React and deployed on Heroku.
                  <br/>( It uses
                  Heroku's free tier, so it might take some time to add the first certificate.{' '}
                  <a href={'https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping'}
                     style={{
                       color:'#808080',
                       textDecoration: "none"
                     }}
                     target={"_blank"}
                     rel="noreferrer"
                  >
                     Learn more
                  </a>
                  {" "})
                </p>
              </Col>

              <Col className="col-md-4 mb-4 mb-lg-0">
                <h4 className="text-uppercase mb-3">CONTACT</h4>
                <ul className="list-inline">
                  <li className="list-inline-item"><Button
                      variant="outline-light btn-social rounded-circle" role="button"
                      target={"_blank"}
                      href="https://linkedin.com/in/rohankaran001">
                    <FaLinkedinIn size={'inherit'}/>
                  </Button></li>
                  <li className="list-inline-item"><Button
                      variant="outline-light btn-social rounded-circle" role="button"
                      href="https://github.com/rohankaran"
                      target={"_blank"}
                  >
                    <FaGithub size={'inherit'}/>
                  </Button></li>
                  <li className="list-inline-item"><Button
                      variant="outline-light btn-social rounded-circle" role="button"
                      href="mailto:rohankaran001@gmail.com"
                      target={"_blank"}
                  >
                    <FaEnvelope size={'inherit'}/>
                  </Button></li>
                </ul>
              </Col>

              <Col className="col-md-4">
                <h4 className="text-uppercase mb-3">MORE</h4>
                <div className={'mb-2'}>
                <a href={"https://github.com/RohanKaran/certificate-generator/discussions/new?category=feedback"}
                     target={"_blank"}
                     rel="noreferrer"
                     className={"text-white text-decoration-none"}>
                    Feedback
                  </a>
                  </div>


                <div className={'mb-2'}>
                  <a href={"https://github.com/rohankaran/certificate-generator/issues/new/choose"}
                     target={"_blank"}
                     rel="noreferrer"
                     className={"text-white text-decoration-none"}>
                    Report a bug
                  </a>
                </div>

                <div>
                  <a href={"https://github.com/rohankaran/certificate-generator"}
                     target={"_blank"}
                     rel="noreferrer"
                        className={"text-white text-decoration-none"}>
                      View app source
                  </a>
                </div>

              </Col>

            </Row>
          </Container>

        </footer>
        <div className="text-center text-white copyright card-text py-4" style={{background:"#283848"}}>
          <Container>
            <small>© 1.1.0</small>
          </Container>
        </div>
        </>
  );
}

export default App;
