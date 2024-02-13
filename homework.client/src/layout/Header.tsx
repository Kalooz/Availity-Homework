import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Homepage</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link href="/registration">Registration Form</Nav.Link>
          <Nav.Link href="/lisp">LISP Checker</Nav.Link>
          <Nav.Link href="/sql">SQL</Nav.Link>
          <Nav.Link href="/edi">EDI Formatter</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
