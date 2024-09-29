import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <div className='social-icons'>
              <a
                href='https://www.instagram.com/mydewderm?utm_source=qr'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'
              >
                <FaInstagram size={30} />
              </a>
              <a
                href='https://www.facebook.com/share/n4WDmpiaepgRAYfY/?mibextid=LQQJ4d'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'
              >
                <FaFacebook size={30} />
              </a>
              <a
                href='https://www.youtube.com/@Dewderm-m4r'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='YouTube'
              >
                <FaYoutube size={30} />
              </a>
            </div>
            <p className='footer-text'>
              Copyright &copy; Skin Care
            </p>
          </Col>
        </Row>
      </Container>

      {/* Custom CSS */}
      <style jsx>{`
        .footer {
          background-color: #64B6AC; /* Primary background color */
          padding: 20px 0;
          color: white;
        }

        .social-icons a {
          margin: 0 15px;
          color: white; /* Icons color set to white */
          transition: color 0.3s;
        }

        .social-icons a:hover {
          color: #007bff; /* Hover effect for social media icons */
        }

        .footer-text {
          margin-top: 15px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
