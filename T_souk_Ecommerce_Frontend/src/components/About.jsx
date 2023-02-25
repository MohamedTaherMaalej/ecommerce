import React from "react";
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import "./about.css"
function About() {
  return (
      <MDBCard className="about">
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
      <MDBCardBody style={{color: "white", fontFamily:"monospace"}}> Bienvenue sur notre plateforme dédiée aux artisans ! Nous sommes un groupe d'étudiants passionnés qui avons créé cette plateforme
pour encourager les artisans à développer leur productivité  et à atteindre un public plus large.
<br/>
<br/>
Notre équipe est composée d'étudiants en informatique qui ont travaillé ensemble pour créer une plateforme facile à utiliser et efficace pour les artisans.
Nous avons travaillé en étroite collaboration avec des artisans locaux pour comprendre leurs besoins et créer une plateforme qui répond à leurs besoins spécifiques.
<br/>
<br/>
Notre mission est d'aider les artisans à développer leur ventes en ligne en leur fournissant une plateforme simple et abordable pour vendre leurs produits et services. 
Nous sommes déterminés à fournir des outils de qualité pour aider les artisans à promouvoir leur produits et à atteindre un public plus large.
<br/>
<br/>
Si vous êtes un artisan et que vous souhaitez rejoindre notre plateforme, veuillez nous contacter pour plus d'informations sur la façon de vous inscrire. 
Nous sommes toujours heureux d'accueillir de nouveaux membres et de les aider à se familiariser avec notre plateforme.
     </MDBCardBody>
     </div>
    </MDBCard>
     
  );
}
export default About;
