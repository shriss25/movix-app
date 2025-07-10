import React ,{useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import InfiniteScroll from "react-infinite-scroll-component"
import {fetchDataFromApi} from "../../utils/api.js"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"

import noResults from "../../assets/no-results.png"

import "./style.scss"
import Spinner from '../../components/spinner/Spinner.jsx'
import MovieCard from '../../components/movieCard/MovieCard.jsx'

function SearchResult() {
  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const {query} = useParams();

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res)
        setPageNum( (prev) => prev+1)
        setLoading(false)
      }
    )

  }
  useEffect( () => {
    console.log(query);
    setPageNum(1)
    fetchInitialData();
  },[query])
  // console.log(data);
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        //purane page k data pr overwrite nhi krna h uske saath merge krna h
        if(data?.results){
          setData({
            ...data, results: [...data?.results, ...res.results]
          })
        }
        else{
          setData(res)
        }
        setPageNum( (prev) => prev+1)
      }
    )
  }
  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}/>}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1 ? "results" : "result"} of ${query}`}
              </div>
              <InfiniteScroll
              className='content'
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner/>}
              >
              
                {data?.results?.map( (item, index) => {
                  if(item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  )
                })}
              </InfiniteScroll>
            </>
          ) : 
          (
            
            <span className="resultNotFound">
              Sorry, Results Not Found !!
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult