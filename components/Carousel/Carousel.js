import React, { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import Link from "next/link";
import styles from "./Carousel.module.css";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
const Carousel = (props) => {
  let scrollAmount = useRef();
  const [forwardVisible, setForwardVisible] = useState(true);
  const [backwardVisible, setBackwardVisible] = useState(false);
  let sliders = useRef(null);

  const scrollHandler = (e) => {
    scrollAmount.current = sliders.current.scrollLeft;
    if (sliders.current.scrollLeft > 0 && !backwardVisible) {
      setBackwardVisible(true);
    }
    if (
      sliders.current.scrollLeft + e.target.offsetWidth + 50 >=
        e.target.scrollWidth &&
      forwardVisible
    ) {
      setForwardVisible(false);
    }
    if (sliders.current.scrollLeft === 0 && backwardVisible) {
      setBackwardVisible(false);
    }
    if (
      sliders.current.scrollLeft + e.target.offsetWidth + 50 <
        e.target.scrollWidth &&
      !forwardVisible
    ) {
      setForwardVisible(true);
    }
  };
  const forwardHandler = (e) => {
    let scrollPerClick = sliders.current.offsetWidth;

    if (
      scrollAmount.current <=
      sliders.current.scrollWidth - sliders.current.offsetWidth
    ) {
      sliders.current.scrollTo({
        top: 0,
        left: (scrollAmount.current += scrollPerClick),
      });
    }
  };
  const backwardHandler = (e) => {
    let scrollPerClick = sliders.current.offsetWidth;
    sliders.current.scrollTo({
      top: 0,
      left: (scrollAmount.current -= scrollPerClick),
    });
  };
  useEffect(() => {
    scrollAmount.current = 0;
    sliders.current.scrollLeft = 0;
    if (
      sliders.current.scrollLeft + sliders.current.offsetWidth + 50 >=
        sliders.current.scrollWidth &&
      forwardVisible
    ) {
      setForwardVisible(false);
    } else if (
      sliders.current.scrollLeft + sliders.current.offsetWidth + 50 <
        sliders.current.scrollWidth &&
      !forwardVisible
    ) {
      setForwardVisible(true);
    }
  }, [props.arr]);
  return (
    <div className={styles.carousel}>
      <h1 className={styles.title}>
        {props.title}{" "}
        {props.explore && (
          <span>
            <Link href={`/${props.media}/category/${props.explore}`}>
              <a className={styles.explore}> Explore All</a>
            </Link>
          </span>
        )}
      </h1>
      <div className={styles.wrapper}>
        <div
          className={`${styles.carouselbox} ${props.cast && styles.cast}`}
          ref={sliders}
          onScroll={(e) => scrollHandler(e)}
        >
          {!props.cast
            ? props.arr.map((obj) => {
                return <Card {...obj} key={obj.id} media_type={props.media} />;
              })
            : props.arr.map((obj) => {
                return <Card {...obj} key={obj.id} media_type="person" cast />;
              })}
        </div>
        {backwardVisible && (
          <button
            className={`${styles.switchLeft} ${
              props.cast && styles.castBackward
            }`}
            onClick={backwardHandler}
          >
            <MdArrowBackIos />
          </button>
        )}
        {forwardVisible && (
          <button
            className={`${styles.switchRight} ${
              props.cast && styles.castForward
            }`}
            onClick={forwardHandler}
          >
            <MdArrowForwardIos />
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
