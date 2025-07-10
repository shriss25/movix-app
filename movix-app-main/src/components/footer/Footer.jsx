import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const goToLinkedIn = () => {
  window.open("https://www.linkedin.com/in/shayan-aatif-48b90b229/", '_blank')
}

const goToInsta = () => {
  window.open("https://www.instagram.com/__shayan_aatif__/", '_blank')
}
const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                 Here, you'll find all the essential links and information to enhance your browsing experience.
                 Explore our vast collection of movies by browsing through genres, release dates, or popularity. 
                 Stay updated with the latest movie releases, trailers, and news by subscribing to our newsletter. 
                 Connect with us on social media platforms to engage with fellow movie enthusiasts and participate 
                 in exciting discussions. For any inquiries or feedback, don't hesitate to reach out to our customer 
                 support team. Thank you for visiting our movie website, and we hope you enjoy discovering your next 
                 cinematic adventure!
                </div>
                <div className="socialIcons">
                    <span className="icon">
                        <FaFacebookF />
                    </span>
                    <span onClick={goToInsta} title="https://www.instagram.com/__shayan_aatif__/" className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaTwitter />
                    </span>
                    <span onClick={goToLinkedIn} title="https://www.linkedin.com/in/shayan-aatif-48b90b229/" className="icon">
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;
