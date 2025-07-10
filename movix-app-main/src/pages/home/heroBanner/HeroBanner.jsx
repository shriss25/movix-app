import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./style.scss"
import useFetch from '../../../hooks/useFetch'

import {useSelector} from 'react-redux'

import Img from "../../../components/lazyLoadImage/Img"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
const HeroBanner = () => {

  const [background, setBackground] = useState("")
  const [query, setQuery] = useState("")

  const navigate = useNavigate();

  const {data, loading} = useFetch("/movie/upcoming")

  const {url} = useSelector( (state) => state.home )

  useEffect( () => {
    
    const bg = url?.backdrop ? url.backdrop + data?.results[Math.floor(Math.random()*20)].backdrop_path : "https://image.tmdb.org/t/p/original/3IoSYT0gnuImnZ73rqYySJnmefA.jpg" ;      //backdrop add kr diya isi me wo sb cheeze h jo documentation me likhi thi
    setBackground(bg);
  },[data])

  const searchQueryHandler = (event) => {
    if( event.key === "Enter" && query.length > 0 ){
      navigate(`/search/${query}`);         //router k path me : ye lgaya hua h query ki jgh isliye kyuki wo user se input hoga
    }

  }
  return (
    <div className="heroBanner">
      { !loading && <div className="backdrop-img">      {/* //loading false hogi tbhi ye call kro that means successfully data aa gya */}
        <Img src={background}></Img>
      </div>}

      <div className="opacity-layer">

      </div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">Millions of movies, TV shows and people to discover. Explore Now.</span>
          <div className="searchInput">
            <input 
              type="text"
              placeholder='Search for a movie or TV show...' 
              onChange={(e) => (setQuery(e.target.value))}
              onKeyUp={searchQueryHandler}
            />
            <button
            onClick={searchQueryHandler}
            >Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner