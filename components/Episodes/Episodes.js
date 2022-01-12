import React, { useState, useEffect } from "react";
import useSWR from "swr";
import styles from "./Episodes.module.css";
import axios from "axios";
import ImageLink from "../ImageLink/ImageLink";
import Custom404 from "../../pages/404";
import Loader from "../Loader/Loader";
const Episodes = ({ numOfSeasons, id }) => {
  const [season, setSeason] = useState(1);
  const onChangeHandler = (e) => {
    setSeason(e.target.value);
  };
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=be4df36e59b67942bd7a12d9ac6f38d8&language=en-US`,
    fetcher
  );
  console.log(data, error);
  if (error)
    return <Custom404 message="Request failed. Please try again later." />;
  if (!data) {
    return <Loader />;
  }
  const content = (
    <div className={styles.episodes}>
      {data.episodes.map((episode) => {
        return (
          <div className={styles.episode} key={episode.name}>
            <ImageLink
              path={episode.still_path}
              src={`https://image.tmdb.org/t/p/w500_and_h282_bestv2/${episode.still_path}`}
              width="500"
              height="282"
              alt={episode.name}
            />
            <h2 className={styles.episodeName}>
              <span>E{episode.episode_number}</span> {episode.name}
            </h2>
            <p className={styles.overview}>{episode.overview}</p>
            <p className={styles.date}>{episode.air_date}</p>
          </div>
        );
      })}
    </div>
  );
  return (
    <div className={styles.episodesContainer}>
      <div className={styles.dropdown}>
        <select value={season} onChange={onChangeHandler}>
          {new Array(numOfSeasons)
            .fill(0)
            .map((ele, idx) => {
              return idx + 1;
            })
            .map((ele) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
        </select>
        {content}
      </div>
    </div>
  );
};

export default Episodes;
