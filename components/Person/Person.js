import React, { useState } from "react";
import KnownFor from "../KnownFor/KnownFor";
import Credits from "../Credits/Credits";
import Loader from "../Loader/Loader";
import styles from "./Person.module.css";
import Photos from "../Photos/Photos";
import ImageLink from "../ImageLink/ImageLink";
import Head from "next/head";
import Routes from "../Routes/Routes";
import ListItem from "../ListItem/ListItem";
const Person = ({ data, id }) => {
  const [selectedRoute, setSelectedRoute] = useState("knownfor");
  const selectFilterHandler = (e) => {
    const ele = e.target;
    const selectedRoute = ele.textContent.replace(/ /g, "").toLowerCase();
    setSelectedRoute(selectedRoute);
  };
  let result = <Loader />;
  if (Object.keys(data).length) {
    result = (
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.profile}>
            <ImageLink
              path={data.profile_path}
              width="370"
              height="556"
              src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${data.profile_path}`}
              alt={data.name}
            />
          </div>

          <div className={styles.bio}>
            <h2 className={styles.name}>{data.name}</h2>
            <p className={styles.biography}>{data.biography}</p>
            <ul className={styles.list}>
              <ListItem data={data.known_for_department} title="Known For" />
              <ListItem data={data.place_of_birth} title="Place of Birth" />
              <ListItem data={data.birthday} title="Born" />
            </ul>
          </div>
        </div>
        <div className={styles.filter}>
          <Routes>
            <button
              className={selectedRoute === "knownfor" ? "selected" : null}
              onClick={(e) => selectFilterHandler(e)}
            >
              KNOWN FOR
            </button>

            <button
              className={selectedRoute === "credits" ? "selected" : null}
              onClick={(e) => selectFilterHandler(e)}
            >
              CREDITS
            </button>
            <button
              className={selectedRoute === "photos" ? "selected" : null}
              onClick={(e) => selectFilterHandler(e)}
            >
              PHOTOS
            </button>
          </Routes>
          {selectedRoute === "knownfor" && <KnownFor id={id} />}
          {selectedRoute === "credits" && <Credits credits={data.credits} />}
          {selectedRoute === "photos" && (
            <Photos posters={data.images.profiles} />
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="spacer">
      <Head>
        <title>{data.name}</title>
      </Head>
      {result}
    </div>
  );
};

export default Person;
