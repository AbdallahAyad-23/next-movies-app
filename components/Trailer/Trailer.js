import React from "react";
import styles from "./Trailer.module.css";
import { MdClose } from "react-icons/md";
const Trailer = ({ video_key, close }) => {
  return (
    <div className={styles.trailer}>
      <button className={styles.closeTrailer} onClick={() => close(false)}>
        <MdClose size={30} />
      </button>
      <iframe
        width="1000"
        height="480"
        src={`https://www.youtube.com/embed/${video_key}?&autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Trailer;
