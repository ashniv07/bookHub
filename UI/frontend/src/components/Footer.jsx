import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
  return (
    <footer className="text-center text-white" style={{ backgroundColor: '#f1f1f1' }}>
      <Container className="pt-4">
        <section className="mb-4">
          <Button
            variant="link"
            size="lg"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <FaFacebookF />
          </Button>

          <Button
            variant="link"
            size="lg"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <FaTwitter />
          </Button>

          <Button
            variant="link"
            size="lg"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <FaGoogle />
          </Button>

          <Button
            variant="link"
            size="lg"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <FaInstagram />
          </Button>

          <Button
            variant="link"
            size="lg"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <FaLinkedin />
          </Button>

          <Button
            variant="link"
            size="lg"
            className="text-dark m-1"
            href="#!"
            role="button"
          >
            <FaGithub />
          </Button>
        </section>
      </Container>

      <div className="text-center text-dark p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        
        <a className="text-dark" href="/">
          BookHub.com
        </a>
      </div>
    </footer>
  );
}
