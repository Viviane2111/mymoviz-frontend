import { useState, useEffect } from "react";
import { Popover, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Movie from "./Movie";
import "antd/dist/antd.css";
import styles from "../styles/Home.module.css";

function Home() {
  // Movies list
  // const movieData = [
  //   {
  //     title: "Forrest Gump",
  //     poster: "forrestgump.jpg",
  //     voteAverage: 9.2,
  //     voteCount: 22_705,
  //     overview:
  //       "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case.",
  //   },
  //   {
  //     title: "The Dark Knight",
  //     poster: "thedarkknight.jpg",
  //     voteAverage: 8.5,
  //     voteCount: 27_547,
  //     overview:
  //       "Batman raises the stakes in his war on crime and sets out to dismantle the remaining criminal organizations that plague the streets.",
  //   },
  //   {
  //     title: "Your name",
  //     poster: "yourname.jpg",
  //     voteAverage: 8.5,
  //     voteCount: 8_691,
  //     overview:
  //       "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places.",
  //   },
  //   {
  //     title: "Iron Man",
  //     poster: "ironman.jpg",
  //     voteAverage: 7.6,
  //     voteCount: 22_7726,
  //     overview:
  //       "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
  //   },
  //   {
  //     title: "Inception",
  //     poster: "inception.jpg",
  //     voteAverage: 8.4,
  //     voteCount: 31_546,
  //     overview:
  //       "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.",
  //   },
  // ];

  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((data) => {
        setMoviesData(data.movies);
      });
  }, []);

  const [likedMovies, setLikedMovies] = useState([]);

  // Liked movies (inverse data flow)
  const updateLikedMovies = (movieTitle) => {
    if (likedMovies.find((movie) => movie === movieTitle)) {
      setLikedMovies(likedMovies.filter((movie) => movie !== movieTitle));
    } else {
      setLikedMovies([...likedMovies, movieTitle]);
    }
  };

  const likedMoviesPopover = likedMovies.map((data, i) => {
    return (
      <div key={i} className={styles.likedMoviesContainer}>
        <span className="likedMovie">{data}</span>
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => updateLikedMovies(data)}
          className={styles.crossIcon}
        />
      </div>
    );
  });

  // Cut overview
  // const overview = data.movies.map((movie) => {
  //   let overview = data.overview;
  //   if (data.overview.length > 250) {
  //     data.overview = data.overview.substring(0, 250) + "...";
  //   }
  // });

  const popoverContent = (
    <div className={styles.popoverContent}>{likedMoviesPopover}</div>
  );

  const movies = moviesData.map((data, i) => {
    const isLiked = likedMovies.some((movie) => movie === data.title);
    return (
      <Movie
        key={i}
        updateLikedMovies={updateLikedMovies}
        isLiked={isLiked}
        title={data.title}
        overview={data.overview}
        poster={data.poster_path}
        voteAverage={data.vote_average}
        voteCount={data.vote_count}
      />
    );
  });

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocontainer}>
          <img src="logo.png" alt="Logo" />
          <img className={styles.logo} src="logoletter.png" alt="Letter logo" />
        </div>
        <Popover
          title="Liked movies"
          content={popoverContent}
          className={styles.popover}
          trigger="click"
        >
          <Button>♥ {likedMovies.length} movie(s)</Button>
        </Popover>
      </div>
      <div className={styles.title}>LAST RELEASES</div>
      <div className={styles.moviesContainer}>{movies}</div>
    </div>
  );
}

export default Home;
