import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom"
import {useSelector, useDispatch } from "react-redux"
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { fetchDataFromApi } from './utils/api';      //export default nhi kiya hua tha isliye aise bracket me likhna pda

import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import Details from "./pages/details/Details"
import SearchResult from "./pages/searchResult/SearchResult"
import Explore from "./pages/explore/Explore"
import PageNotFound from "./pages/404/PageNotFound"

function App() {

  const dispatch = useDispatch();
  const {url} = useSelector( (state) => state.home )    //state.home ka access mil rha tha whi console krke check kiya tha
  useEffect( () => {
    fetchApiConfig();
    genresCall();
  }, [])
  const fetchApiConfig = () => {
        fetchDataFromApi("/configuration")      //ye documentation me likha h ki /configuration likhna h and usme steps bhi h ki kaise image ka url use krte h kya kya chahiye hota hai
        .then( (res) => {
          console.log(res);

          const url = {
            backdrop: res.images.secure_base_url + "original",      //original size hi use krege and usi ko css ki help se edit kr denge
            poster: res.images.secure_base_url + "original",      
            profile: res.images.secure_base_url + "original",      
            
          }
          dispatch(getApiConfiguration(url));     //yha se hmne wo image ka size wgera aur baki cheeze jo access krne k liye chahiye thi background image kisi random movie ki wo store me bheja hai
        });
      };

  /* generes ka API call krwa denge using promise.all method sikhne k liye ki kaise promise.all use krte h... */
  const genresCall = async () => {
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}
    endPoints.forEach( (url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))

    })
    // jb tk ye dono promises nhi aege complete hoke tb tk ye aage nhi bdega
    const data = await Promise.all(promises);
    data?.map(({genres}) => {                            //genres ko destructure kr liya data me hme do object milege
      return genres?.map((item) => (allGenres[item.id] = item))      //genres me do object the ek id and ek name us genre ka...to hmne id ko key bna diya and pura object uski value me save kra diya

    })
    console.log("all genres" , allGenres);

    // ab store me value save kr lenge...
    dispatch(getGenres(allGenres))
  }
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:mediaType/:id" element={<Details/>}/>
        <Route path="/search/:query" element={<SearchResult/>}/>      {/* : iske baad jo likha h wo user se input hoga and usko navigate krne wali line me wha pe variable aega ${} iske andr */}
        <Route path="/explore/:mediaType" element={<Explore/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
