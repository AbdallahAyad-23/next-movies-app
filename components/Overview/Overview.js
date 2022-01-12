import styles from "./Overview.module.css";
import Carousel from "../Carousel/Carousel";
import Checker from "../Checker/Checker";
import ListItem from "../ListItem/ListItem";
import ImageLink from "../ImageLink/ImageLink";
const Overview = (props) => {
  let director = null;
  let overview = null;
  if (props.media === "movie") {
    director = props.credits.crew.find((obj) => {
      if (obj.job === "Director") {
        return obj;
      }
    });
    overview = (
      <>
        <ul>
          <ListItem data={props.release_date} title="Released" />
          <ListItem data={director.name} title="Director" />
          <ListItem
            data={
              props.genres.length &&
              props.genres.map((obj, idx) => {
                if (idx === props.genres.length - 1) {
                  return (
                    <span className={styles.genre} key={obj.name}>
                      {obj.name}
                    </span>
                  );
                }
                return (
                  <span className={styles.genre} key={obj.name}>
                    {obj.name + ","}
                  </span>
                );
              })
            }
            title="Genre"
          />
          <ListItem
            data={
              props.spoken_languages.length && props.spoken_languages[0].name
            }
            title="Language"
          />
        </ul>
        <ul>
          <ListItem data={props.runtime} title="Runtime" />
          <ListItem data={props.budget} title="Budget" />
          <ListItem data={props.status} title="Status" />
          <ListItem
            data={
              props.production_companies.length &&
              props.production_companies.map((obj, idx) => {
                if (idx === props.production_companies.length - 1) {
                  return <span key={obj.name}>{obj.name}</span>;
                }
                return <span key={obj.name}>{obj.name}, </span>;
              })
            }
            title="Production"
          />
        </ul>
      </>
    );
  }

  if (props.media === "tv") {
    overview = (
      <>
        <ul className={styles.left}>
          <ListItem data={props.first_air_date} title="First Aired" />
          <ListItem data={props.episode_run_time} title="Runtime" />
          <ListItem
            data={
              props.genres.length &&
              props.genres.map((obj, idx) => {
                if (idx === props.genres.length - 1) {
                  return (
                    <span className={styles.genre} key={obj.name}>
                      {obj.name}
                    </span>
                  );
                }
                return (
                  <span className={styles.genre} key={obj.name}>
                    {obj.name + ","}
                  </span>
                );
              })
            }
            title="Genre"
          />
          <ListItem data={props.number_of_episodes} title="Episodes" />
          <ListItem
            data={
              props.spoken_languages.length && props.spoken_languages[0].name
            }
            title="Language"
          />
        </ul>
        <ul className={styles.right}>
          <ListItem data={props.last_air_date} title="Last Aired" />
          <ListItem
            data={props.created_by.length && props.created_by[0].name}
            title="Creator"
          />
          <ListItem data={props.number_of_seasons} title="Seasons" />
          <ListItem data={props.status} title="Status" />
          <ListItem
            data={props.networks.length && props.networks[0].name}
            title="Production"
          />
        </ul>
      </>
    );
  }

  return (
    <>
      <div className={styles.overview}>
        <div className={styles.overviewImg}>
          <ImageLink
            path={props.poster_path}
            src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${props.poster_path}`}
            width="370"
            height="556"
            alt=""
          />
        </div>
        <div className={styles.details}>
          <h2>Storyline</h2>
          <p>{props.overview}</p>
          <ul className={styles.list}>{overview}</ul>
        </div>
      </div>
      <Checker data={props.credits.cast.length}>
        <div>
          <Carousel media="movie" title="Cast" arr={props.credits.cast} cast />
        </div>
      </Checker>
    </>
  );
};

export default Overview;
