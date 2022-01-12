import styles from "./Card.module.css";
import StarRatings from "react-star-ratings";
import ImageLink from "../ImageLink/ImageLink";

const Card = ({
  name,
  vote_average = 0,
  media_type,
  original_title,
  poster_path,
  profile_path,
  id,
  cast,
}) => {
  let result = null;
  if (media_type === "movie") {
    result = (
      <div className={styles.container}>
        <ImageLink
          path={poster_path}
          width="370"
          height="556"
          src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${poster_path}`}
          href={`/movie/${id}`}
          alt={original_title}
        />
        <div className={styles.details}>
          <h2 className={styles.title}>{original_title}</h2>
          <div className={styles.rating}>
            <StarRatings
              rating={vote_average / 2.0}
              numberOfStars={5}
              starDimension="14px"
              starRatedColor="rgb(34, 150, 243)"
              starSpacing="2px"
              starEmptyColor="rgb(91, 89, 89)"
            />
            <span className={styles.avgRate}>{vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    );
  } else if (media_type === "person") {
    result = (
      <div className={`${styles.container} ${cast && styles.person}`}>
        <ImageLink
          path={profile_path}
          width="370"
          height="556"
          src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${profile_path}`}
          href={`/person/${id}`}
          alt={name}
        />
        <div className={styles.details}>
          <h2>{name}</h2>
        </div>
      </div>
    );
  } else if (media_type === "tv") {
    result = (
      <div className={styles.container}>
        <ImageLink
          path={poster_path}
          width="370"
          height="556"
          src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${poster_path}`}
          href={`/tv/${id}`}
          alt={name}
        />

        <div className={styles.details}>
          <h2>{name}</h2>
          <div className={styles.rating}>
            <StarRatings
              rating={vote_average / 2.0}
              numberOfStars={5}
              starDimension="14px"
              starRatedColor="rgb(34, 150, 243)"
              starSpacing="2px"
              starEmptyColor="rgb(91, 89, 89)"
            />

            <span className={styles.avgRate}>{vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    );
  }
  return result;
};

export default Card;
