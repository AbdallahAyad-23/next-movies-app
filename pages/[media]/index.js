import axios from "axios";
import Hero from "../../components/Hero/Hero";
import Carousel from "../../components/Carousel/Carousel";
import Head from "next/head";
import Custom404 from "../404";
const random = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const getServerSideProps = async ({ params }) => {
  if (params.media !== "movie" && params.media !== "tv") {
    return { props: { paramsError: true } };
  }
  try {
    let url1 = `https://api.themoviedb.org/3/movie/popular?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    let url2 = `https://api.themoviedb.org/3/movie/top_rated?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    let url3 = `https://api.themoviedb.org/3/movie/upcoming?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    let url4 = `https://api.themoviedb.org/3/movie/now_playing?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    if (params.media === "tv") {
      url1 = `https://api.themoviedb.org/3/tv/popular?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
      url2 = `https://api.themoviedb.org/3/tv/top_rated?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
      url3 = `https://api.themoviedb.org/3/tv/on_the_air?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
      url4 = `https://api.themoviedb.org/3/tv/airing_today?api_key=be4df36e59b67942bd7a12d9ac6f38d8`;
    }
    const requestOne = axios.get(url1);
    const requestTwo = axios.get(url2);
    const requestThree = axios.get(url3);
    const requestFour = axios.get(url4);
    const [res1, res2, res3, res4] = await Promise.all([
      requestOne,
      requestTwo,
      requestThree,
      requestFour,
    ]);
    var trending = {
      1: res1.data.results,
      2: res2.data.results,
      3: res3.data.results,
      4: res4.data.results,
      hero: [res1, res2, res3, res4][random(3)].data.results[random(20)],
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
      `http://api.themoviedb.org/3/${params.media}/${trending.hero.id}/videos?api_key=be4df36e59b67942bd7a12d9ac6f38d8`
    );
    var video = data.results[0] || null;
  } catch (error) {
    video = null;
  }

  const hero = { ...trending.hero, video };
  trending.hero = hero;
  return {
    props: { trending, media: params.media },
  };
};

const Movie = ({ trending, media, paramsError, error }) => {
  if (paramsError) return <Custom404 message="Wrong Params" />;
  if (error) return <Custom404 message={error} />;
  return (
    <>
      <Head>
        <title>{media.toUpperCase()}</title>
      </Head>
      <Hero {...trending.hero} />
      <div className="spacer">
        <Carousel
          media={media}
          title={media === "movie" ? "Popular Movies" : "Popular Shows"}
          arr={trending[1]}
          explore="popular"
        />
        <Carousel
          media={media}
          title={media === "movie" ? "Top Rated Movies" : "Top Rated Shows"}
          arr={trending[2]}
          explore="top_rated"
        />
        <Carousel
          media={media}
          title={
            media === "movie" ? "Upcoming Movies" : "Currently Airing TV Shows"
          }
          arr={trending[3]}
          explore={media === "movie" ? "upcoming" : "currently_airing"}
        />
        <Carousel
          media={media}
          title={
            media === "movie" ? "Now Playing Movies" : "TV Shows Airing Today"
          }
          arr={trending[4]}
          explore={media === "now_playing" ? "upcoming" : "airing_today"}
        />
      </div>
    </>
  );
};

export default Movie;
