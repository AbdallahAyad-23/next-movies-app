import React from "react";
import Trailer from "../../components/Trailer/Trailer";
import ImageLink from "../ImageLink/ImageLink";
import styles from "./Videos.module.css";
import { MdPlayCircleOutline } from "react-icons/md";
const Videos = (props) => {
  return (
    <div className={styles.videos}>
      {props.videos.results.map((video) => {
        return (
          <div className={styles.video} key={video.key}>
            <div className={styles.imgContainer}>
              <ImageLink
                path={video.key}
                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                width="480"
                height="360"
                alt={video.name}
              />
              <MdPlayCircleOutline
                className={styles.playButton}
                onClick={() => props.playHandler(video.key)}
              />
            </div>

            <h2 className={styles.videoName}>{video.name}</h2>
            <h2 className={styles.videoType}>{video.type}</h2>
          </div>
        );
      })}
      {props.play.play && (
        <Trailer close={props.setPlay} video_key={props.play.key} />
      )}
    </div>
  );
};

export default Videos;
