import React from "react";
import { useState } from "react";
import Checker from "../Checker/Checker";
import Hero from "../Hero/Hero";
import Carousel from "../Carousel/Carousel";
import Overview from "../Overview/Overview";
import Photos from "../Photos/Photos";
import Videos from "../Videos/Videos";
import Episodes from "../Episodes/Episodes";
import Head from "next/head";
import Routes from "../Routes/Routes";
const MediaDetails = ({ data, media, id }) => {
  const [selectedRoute, setSelectedRoute] = useState("overview");
  const [play, setPlay] = useState({ play: false, key: "" });

  const selectFilterHandler = (e) => {
    const ele = e.target;
    const selectedRoute = ele.textContent.toLowerCase();
    setSelectedRoute(selectedRoute);
  };
  const playHandler = (key) => {
    setPlay({ play: true, key });
  };

  let result;
  if (data) {
    const heroObj = { ...data, video: data.videos.results[0] };
    result = (
      <>
        <Hero {...heroObj} />
        <div className="spacer">
          <Routes>
            <button
              className={selectedRoute === "overview" ? "selected" : null}
              onClick={(e) => selectFilterHandler(e)}
            >
              OVERVIEW
            </button>
            {media === "tv" && (
              <Checker data={data.number_of_seasons}>
                <button
                  className={selectedRoute === "episodes" ? "selected" : null}
                  onClick={(e) => selectFilterHandler(e)}
                >
                  EPISODES
                </button>
              </Checker>
            )}
            <Checker data={data.videos.results.length}>
              <button
                className={selectedRoute === "videos" ? "selected" : null}
                onClick={(e) => selectFilterHandler(e)}
              >
                VIDEOS
              </button>
            </Checker>
            <Checker
              data={data.images.posters.concat(data.images.backdrops).length}
            >
              <button
                className={selectedRoute === "photos" ? "selected" : null}
                onClick={(e) => selectFilterHandler(e)}
              >
                PHOTOS
              </button>
            </Checker>
          </Routes>
          {selectedRoute === "overview" && <Overview {...data} media={media} />}

          {selectedRoute === "episodes" && (
            <Episodes numOfSeasons={data.number_of_seasons} id={id} />
          )}

          {selectedRoute === "videos" && (
            <Videos
              videos={data.videos}
              playHandler={playHandler}
              setPlay={setPlay}
              play={play}
            />
          )}
          {selectedRoute === "photos" && (
            <Photos
              posters={data.images.posters}
              backdrops={data.images.backdrops}
            />
          )}
          <Checker data={data.recommendations.results.length}>
            <div>
              <Carousel
                media={media}
                title="More Like This"
                arr={data.recommendations.results}
              />
            </div>
          </Checker>
        </div>
      </>
    );
  }
  return (
    <div>
      <>
        <Head>
          <title>{data.name || data.original_title}</title>
        </Head>
        {result}
      </>
    </div>
  );
};

export default MediaDetails;
