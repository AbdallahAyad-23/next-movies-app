import React from "react";
// import axios from "axios";
import Carousel from "../components/Carousel/Carousel";
import Hero from "../components/Hero/Hero";
import axios from "axios";
import Head from "next/head";
import Custom404 from "./404";
export const getServerSideProps = async () => {
  try {
    const trendingMoviesURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    const trendingShowsURL = `https://api.themoviedb.org/3/trending/tv/day?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    const requestOne = axios.get(trendingMoviesURL);
    const requestTwo = axios.get(trendingShowsURL);
    const responses = await Promise.all([requestOne, requestTwo]);
    const [response1, response2] = responses;
    var trending = {
      trendingMovies: response1.data.results,
      trendingShows: response2.data.results,
      hero: [...response1.data.results, response2.data.results][
        Math.floor(Math.random() * 19)
      ],
    };
  } catch (error) {
    return {
      props: {
        error: "Request failed. Please try again later.",
      },
    };
  }
  try {
    const { data } = await axios.get(
      `http://api.themoviedb.org/3/${trending.hero.media_type}/${trending.hero.id}/videos?api_key=be4df36e59b67942bd7a12d9ac6f38d8`
    );
    const results = await data;
    var video = results.results[0] || null;
  } catch (error) {
    video = null;
  }

  const hero = { ...trending.hero, video };
  trending.hero = hero;
  return {
    props: { trending },
  };
};
const Landing = ({ trending, error }) => {
  if (error) return <Custom404 message={error} />;
  return (
    <>
      <Head>
        <title>Browse Movies, TV Shows and People</title>
      </Head>
      <Hero {...trending.hero} />
      <div className="spacer">
        <Carousel
          media="movie"
          title="Trending Movies"
          arr={trending.trendingMovies}
          explore="trending"
        />
        <Carousel
          media="tv"
          title="Trending Shows"
          arr={trending.trendingShows}
          explore="trending"
        />
      </div>
    </>
  );
};

export default Landing;
