import axios from "axios";
import MediaDetails from "../../components/MediaDetails/MediaDetails";
import Person from "../../components/Person/Person";
import Custom404 from "../404";

export const getServerSideProps = async ({ params }) => {
  if (
    params.media !== "movie" &&
    params.media !== "tv" &&
    params.media !== "person"
  ) {
    return { props: { paramsError: true } };
  }
  try {
    const url = `https://api.themoviedb.org/3/${params.media}/${
      params.id
    }?api_key=be4df36e59b67942bd7a12d9ac6f38d8&append_to_response=images,credits${
      params.media === "person" ? "" : ",recommendations,videos"
    }`;
    const response = await axios.get(url);
    const result = await response.data;

    return {
      props: {
        data: result,
        media: params.media,
        id: params.id,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Request failed. Please try again later.",
      },
    };
  }
};

const Details = ({ data, media, id, paramsError, error }) => {
  if (paramsError) return <Custom404 message="Wrong Params" />;
  if (error) return <Custom404 message={error} />;
  if (media === "person") return <Person {...{ data, id }} />;
  return <MediaDetails {...{ data, media, id }} />;
};

export default Details;
