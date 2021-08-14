import React, { Fragment } from 'react'

const Footer = () => {
  return (
    <Fragment>
      <footer className="py-1">
        <p className="text-center mt-1">
          Calle de Empresa 36, San Juan, Benito Juárez, 03730 San Juan, CDMX 03730 Ciudad de México, México
        </p>
        <p className="text-center mt-1">
          Teléfonos: 55 78 27 67 00 y 55 56 61 36 08
        </p>
        <div className="template-demo text-center">
          <button type="button" className="btn btn-social-icon btn-outline-facebook">
            <a href="https://www.facebook.com/CONVENIOCOM" target="_blank">
              <i className="fa fa-facebook" style={{color: "#3b5998", fontSize: 25}}></i>
            </a>
          </button>
          <button type="button" className="btn btn-social-icon btn-outline-twitter">
            <a href="https://twitter.com/conveniocom" target="_blank">
              <i className="fa fa-twitter" style={{color: "#55acee", fontSize: 25}}></i>
            </a>
          </button>
          <button type="button" className="btn btn-social-icon btn-outline-instagram">
            <a href="https://www.instagram.com/conveniocom/" target="_blank">
              <i className="fa fa-instagram" style={{color: "#813C0E", fontSize: 25}}></i>
            </a>
          </button>
        </div>
      </footer>
    </Fragment>
  )
}

export default Footer
