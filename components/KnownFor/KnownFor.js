import useSWR from "swr";
import Loader from "../Loader/Loader";
import Custom404 from "../../pages/404";
import axios from "axios";
import styles from "./KnownFor.module.css";
import Card from "../Card/Card";
const KnownFor = ({ id }) => {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=be4df36e59b67942bd7a12d9ac6f38d8
    `,
    fetcher
  );
  if (error)
    return <Custom404 message="Request failed. Please try again later." />;
  if (!data) {
    return <Loader />;
  }
  return (
    <div className={styles.knownFor}>
      {data.cast
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        .map((obj) => {
          return <Card {...obj} key={obj.credit_id} />;
        })}
    </div>
  );
};

export default KnownFor;
