
import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";                  //api se jo date milti h wo dd-mm-yyyy format me hoti h hme use english words format me laana hai

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
const Carousel = ({data, loading, endpoint, title}) => {
    // console.log("data: ", data,"loading", loading);
    const carouselContainer = useRef();
    const {url} = useSelector( (state) => state.home )
    const navigate = useNavigate()
  
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton">
                    <div className="textBlock">
                        <div className="title skeleton"></div>
                        <div className="date skeleton"></div>
                    </div>
                </div>
            </div>
        )
    }
    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount = dir === "left" ?
            container.scrollLeft - (container.offsetWidth + 20) :            //padding ki wjh se add krna pd rha h 20
            container.scrollLeft + (container.offsetWidth + 20)
        
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        });
    }
  return (
    <div className="carousel">
        <ContentWrapper>
            {
                title && <div className="carouselTitle">{title} </div>
            }
            <BsFillArrowLeftCircleFill
            className="carouselLeftNav arrow"
            onClick={ () => navigation("left")}
            />
            <BsFillArrowRightCircleFill
            className="carouselRightNav arrow"
            onClick={ () => navigation("right")}
            />
            { !(loading) ? (
                <div className="carouselItems" ref={carouselContainer}>
                    {data?.map( (item) => {
                        const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                        // console.log(posterUrl);
                        // console.log(item)
                        return (
                            <div 
                            key={item?.id} 
                            className="carouselItem" onClick={ () => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                <div className="posterBlock">
                                    <Img src={`${posterUrl}`} />               {/* toString krna h ya nhi dekhlo */}
                                    <CircleRating rating={item?.vote_average.toFixed(1)}/>
                                    <Genres data={item?.genre_ids[0]} />         {/* sirf do hi genre bhejne h ek film k */}
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {item.title || item.name}               {/* movies k andr title key hoti h and web series k andr name */}
                                    </span>
                                    <span className="date">
                                        {dayjs(item.release_Date).format("MMM D, YYYY")}               {/* using of dayjs library iski documentation pd lena if want ki kaise use hota h */}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>

            ) : (
                <div className="loadingSkeleton">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                </div>
            )}
        </ContentWrapper>

    </div>
  )
}

export default Carousel