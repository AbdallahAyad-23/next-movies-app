import React from "react";
import styles from "./Photos.module.css";
import ImageLink from "../ImageLink/ImageLink";
const Photos = ({ posters, backdrops }) => {
  return (
    <div className={styles.photosContainer}>
      {backdrops && (
        <div className={styles.backdropsContainer}>
          <h1 className={styles.title}>
            Backdrops <span>{backdrops.length} Images</span>
          </h1>
          <div className={styles.backdrops}>
            {backdrops.map((img) => {
              return (
                <ImageLink
                  path={img.file_path}
                  width="533"
                  height="300"
                  key={img.file_path}
                  src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2//${img.file_path}`}
                  alt="backdrop"
                />
              );
            })}
          </div>
        </div>
      )}
      {posters && (
        <div className={styles.postersContainer}>
          <h1 className={styles.title}>
            Posters <span>{posters.length} Images</span>
          </h1>
          <div className={styles.photos}>
            {posters.map((img) => {
              return (
                <ImageLink
                  path={img.file_path}
                  width="370"
                  height="556"
                  key={img.file_path}
                  src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2//${img.file_path}`}
                  alt="poster"
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
