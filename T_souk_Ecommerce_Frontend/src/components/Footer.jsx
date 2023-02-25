import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import {BsWhatsapp, BsTwitter, BsLinkedin, BsFacebook, BsGithub } from "react-icons/bs";
import ph1 from "../img/result (1).png"
export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Contactez nous à travers les réseaux sociaux:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <BsFacebook />
          </a>
          &nbsp;
          &nbsp;

          <a href='' className='me-4 text-reset'>
            <BsLinkedin />
            &nbsp;
            &nbsp;
          </a>
          <a href='' className='me-4 text-reset'>
            <BsTwitter />
            &nbsp;
            &nbsp;
          </a>
          <a href='' className='me-4 text-reset'>
            <BsWhatsapp/>
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>

                <img src={ph1} style={{width:"60%", height:"45%"}}/>
              <p>
                L'authenticité, la confiance et la qualité de service sont les valeurs sur lesquelles nous nous appuyons.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Produits</h6>
              <p className='text-reset'>
                  Bois
              </p>
              <p className='text-reset'>
                  Argile
              </p>
              <p className='text-reset'>
                  Textile
              </p>
              <p className='text-reset'>
                  Cuir
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Autre</h6>
              <p>
                <a href='#!' className='text-reset'>
                  A propos
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Produits
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Connexion
                </a>
              </p>
              <p>
                  Support
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Nos contactes</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Technopole ghazela, Ariana
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@T-sook.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +216 *** *** ***
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> +216 *** *** ***
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright: T-Sook.com
      </div>
    </MDBFooter>
  );
}
