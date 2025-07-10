import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";       //these are for icons...this is for search icon
import { SlMenu } from "react-icons/sl";                //this is for  hamburger menu icon
import { VscChromeClose } from "react-icons/vsc";       //this is for close icon
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    useEffect( () => {
      window.scrollTo(0, 0);            //locationsets to current location whenever we go to another page so it make to start the new page from the top 
    },[location])
    const controlNavbar = () => {
      if( window.scrollY === 0 ){
        setShow("top")
      }
      if( window.scrollY > 200 ){
        if( window.scrollY > lastScrollY && !mobileMenu){
          setShow("hide");          //neeche jate hue navbar hide and upr aate hue black bg k saath show
        }else{
          setShow("show")
        }
        setLastScrollY(window.scrollY)
      }
    }
    useEffect( () => {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      }
    },[lastScrollY])
    const searchQueryHandler = (event) => {
      if( event.key === "Enter" && query.length > 0 ){
        navigate(`/search/${query}`);         //router k path me : ye lgaya hua h query ki jgh isliye kyuki wo user se input hoga

        // search krne k baad search bar apne aap bnd ho jana chahiye uske liye:
        setTimeout( () => {
          setShowSearch(false)
        }, 1000)
      }
    }
    const openSearch = () => {
      setMobileMenu(false)
      setShowSearch(true)
    }
    const openMobileMenu = () => {
      console.log("hii");
      setMobileMenu(true)
      setShowSearch(false)
    }

    const navigationHandler = (type) => {
      if( type === "movie" )
      {
        navigate("/explore/movie")
      }else {
        navigate("/explore/tv")
      }
      setMobileMenu(false)
    }
    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>       {/* conditionally add ki h class for working of menu button tbhi uski css show hogi */}
          <ContentWrapper>
            <div className="logo" onClick={() => navigate("/")}>
              <img src={logo} alt="" />
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick={() => {navigationHandler("movie")}}>Movies</li>
              <li className="menuItem" onClick={() => {navigationHandler("tv")}}>TV Shows</li>
              <li className="menuItem">
                <HiOutlineSearch onClick={openSearch}/>
              </li>
            </ul>

            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch}/>
              { mobileMenu ? 
              <VscChromeClose onClick={() => setMobileMenu(false)}/>      //close krne k liye manually close krna pdega
              : 
              <SlMenu onClick={openMobileMenu}/>}
            </div>
          </ContentWrapper>
          {showSearch &&
          <div className="searchBar">
            <ContentWrapper>
                <div className="searchInput">
                <input 
                  type="text"
                  placeholder='Search for a movie or TV show...' 
                  onChange={(e) => (setQuery(e.target.value))}
                  onKeyUp={searchQueryHandler}
                />
                <VscChromeClose onClick={() => setShowSearch(false)}/>
              </div>
            </ContentWrapper>
          </div>}
        </header>
    );
};

export default Header;
