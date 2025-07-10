import React from 'react'

import "./style.scss"
import useFetch from "../../hooks/useFetch"
import {useParams} from "react-router-dom"        //URL me se kuch fetch krne k liye useParams usehota h jaise yha hme dekhna h ki movie ka data dikhana h ya tv show ka
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videosSection/VideosSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'
function Details() {
  const {mediaType, id} = useParams();        //read documentation of useParams
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`)    //is movie ya tv show se related jitni bhi vdos h sb mil jaegi
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`)    //data ko credit bolege and loading ko crditsLoading

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />      {/* pehli vdo trailer h */}
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id}/>

    </div>

  )
}

export default Details