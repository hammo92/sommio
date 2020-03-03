import React from "react"
import {Link} from "gatsby"
import Logo from '../../images/logo.png'


const Footer = () =>{
return (
    <footer>
        <div className="footer-left">
            <img src={Logo} />
            <div className="content">
                <p>At Sommio we know that to live a happy and healthy life it is important to be able to relax, unwind and get a good night’s sleep. Modern life has made this harder than ever, with everyday anxiety, agitation and stress making it difficult to take time for yourself and detach.</p>
                <p>Our goal is to help redress the balance. Our weighted products are developed based on scientific studies into the calming effects of weight, and manufactured to the highest standards. We’re proud that out Sommio products are helping people around the world.</p>
            </div>
        </div>
        <div className="footer-right">
            <div className="newsletter-box">
                <h2>Let's stay in touch</h2>
                <input type="email" name="email" className="form-control" placeholder="Email" />
            </div>
            <ul className="menu-list">
                <li><Link to="#">Account</Link></li>
                <li><Link to="#">FAQ</Link></li>
                <li><Link to="#">Privacy Policy</Link></li>
                <li><Link to="#">Contact Us</Link></li>
                <li><Link to="#">Media</Link></li>
            </ul>
        </div>
    </footer>
)

}
export default Footer;