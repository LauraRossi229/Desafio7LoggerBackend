import React, { useContext, useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
  FaBagShopping,
} from "react-icons/fa6";
import "./NavBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { LogContext } from "../LogContext";

const NavBar = () => {
  const { isLogeado, setIsLogeado } = useContext(LogContext);
  const navigate = useNavigate(null);

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8080/api/sessions/logout", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 200) {
      setIsLogeado(false);
      navigate("/");
    } else {
      console.error(
        "Error al cerrar sesión. Código de estado:",
        response.status
      );
    }
  };

  return (
    <>
      {["md"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="/">PlanetPro Digital</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link to="" className="shoppingBag">
                    <button data-quantity="0" className="btn-cart">
                      <FaBagShopping className="bolsa" />
                      <span className="quantity"></span>
                    </button>
                  </Link>
                  {isLogeado ? (
                    <Link>
                      <button className="Boton" onClick={handleLogout}>
                        <div className="sign">
                          <FaArrowRightFromBracket className="path" />
                        </div>
                        <div className="text">Logout</div>
                      </button>
                    </Link>
                  ) : (
                    <Link to="/usuario">
                      <button className="Boton">
                        <div className="sign">
                          <FaArrowRightToBracket className="path" />
                        </div>
                        <div className="text">Login</div>
                      </button>
                    </Link>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default NavBar;
