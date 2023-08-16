import {FaTwitter, FaInstagram, FaYoutube, FaGoogle} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <>
    <div className="footer-container">
      <ul className="footer-container">
        <li className="icon-button">
          <FaGoogle />
        </li>
        <li className="icon-button">
          <FaTwitter />
        </li>
        <li className="icon-button">
          <FaInstagram />
        </li>
        <li className="icon-button">
          <FaYoutube />
        </li>
      </ul>
    </div>
    <p className="contact-us-footer">Contact us </p>
  </>
)
export default Footer
