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
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
