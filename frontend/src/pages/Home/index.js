import React from 'react';
import './home.css'
import Carousel  from 'react-bootstrap/Carousel';

export default function App() {
  return (
          <div> 
                <h1 className='texr-'> Seja Bem vindo A Clinica Sem Futuro </h1>
    <div className='carousel'>
       <Carousel>
        <Carousel.Item>
          <img
            src="https://lh3.googleusercontent.com/p/AF1QipObIpjMmcOiAwP75bFrahCeUyAU0uve1i51TWN7=w1080-h608-p-no-v0"
            alt="Image One" height="400" align="right"/>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://img.freepik.com/vetores-premium/teste-on-line-do-conceito-e-learning-exame-no-computador-ou-telefone-ilustracao-vetorial-plano_186332-966.jpg"
            alt="Image Two"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGCewf60wxyH9yll8jWePvdiocFbtjnfulgZD9sxwt&s"
            alt="Image three"
          />
        </Carousel.Item>
      </Carousel>
      </div>
    </div>
  );
}