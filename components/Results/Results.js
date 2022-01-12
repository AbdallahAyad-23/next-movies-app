import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/Results.module.css";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import Spinner from "../Spinner/Spinner";
import Custom404 from "../../pages/404";

const Results = () => {
  const { query, type, media } = useRouter().query;
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && pageIndex + 1 > previousPageData.total_pages) {
      return null;
    }
    return returnUrl(type, pageIndex + 1);
  };
  const returnUrl = (type, pageIndex) => {
    if (type) {
      if (type === "trending") {
        return `https://api.themoviedb.org/3/${type}/${media}/day?api_key=be4df36e59b67942bd7a12d9ac6f38d8&page=${pageIndex}`;
      } else if (type === "currently_airing") {
        return `https://api.themoviedb.org/3/${media}/${"on_the_air"}?api_key=be4df36e59b67942bd7a12d9ac6f38d8&page=${pageIndex}`;
      } else {
        return `https://api.themoviedb.org/3/${media}/${type}?api_key=be4df36e59b67942bd7a12d9ac6f38d8&page=${pageIndex}`;
      }
    } else {
      return `https://api.themoviedb.org/3/search/multi?api_key=be4df36e59b67942bd7a12d9ac6f38d8&query=${query}&page=${pageIndex}`;
    }
  };
  const { data, size, setSize, error } = useSWRInfinite(getKey, fetcher);
  if (error)
    return <Custom404 message="Request failed. Please try again later." />;
  if (!data) {
    return <Loader />;
  }
  console.log("data", data);
  let title;
  if (type) {
    title =
      type === "trending"
        ? `Trending ${media === "tv" ? "Shows" : "Movies"}`
        : `${type
            .split("_")
            .map((v) => v[0].toUpperCase() + v.slice(1))
            .join(" ")} ${media === "tv" ? "TV Shows" : "Movies"}`;
  }
  return (
    <div className="spacer">
      <Head>
        <title>{query ? "Search" : title}</title>
      </Head>
      <h1 className={styles.resultsTitle}>
        {query ? `Results For: ${query}` : title}
      </h1>
      {
        <InfiniteScroll
          className={styles.results}
          dataLength={data.length}
          next={() => setSize(size + 1)}
          hasMore={true}
          loader={<Spinner />}
        >
          {data.map((results) => {
            return results.results.map((result) => {
              if (result.media_type) {
                return <Card {...result} key={result.id} />;
              }
              const newObj = { ...result, media_type: media };
              return <Card {...newObj} key={result.id} />;
            });
          })}
        </InfiniteScroll>
      }
    </div>
  );
};

export default Results;
