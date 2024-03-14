import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import Detail from "./Detail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trendings = [];

  // useEffect(() => {
  //   db.collection("movies").onSnapshot((snapshot) => {
  //     snapshot.docs.map((doc) => {
  //       switch (doc.data().type) {
  //         case "recommend":
  //           // recommends.push({ id: doc.id, ...doc.data() });
  //           recommends = [...recommends, { id: doc.id, ...doc.data() }];
  //           break;

  //         case "original":
  //           // newDisneys.push({ id: doc.id, ...doc.data() });
  //           originals = [...originals, { id: doc.id, ...doc.data() }];
  //           break;

  //         case "new":
  //           // originals.push({ id: doc.id, ...doc.data() });
  //           newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
  //           break;

  //         case "trending":
  //           // trending.push({ id: doc.id, ...doc.data() });
  //           trending = [...trending, { id: doc.id, ...doc.data() }];
  //           break;
  //       }
  //     });
  //   });

  //   dispatch(
  //     setMovies({
  //       recommend: recommends,
  //       newDisney: newDisneys,
  //       original: originals,
  //       trending: trending,
  //     })
  //   );
  // }, [userName]);

  useEffect(() => {
    const moviesCollection = collection(db, "movies");
    const unsubscribe = onSnapshot(moviesCollection, (snapshot) => {
      
      snapshot.docs.forEach((doc) => {
        const movieData = doc.data();

        switch (movieData.type) {
          case "recommend":
            //  recommends.push({ id: doc.id, ...movieData });
            recommends = [...recommends, { id: doc.id, ...movieData }];
            break;

          case "original":
            //  newDisneys.push({ id: doc.id, ...movieData });
            originals = [...originals, { id: doc.id, ...movieData }];
            break;

          case "new":
            //  originals.push({ id: doc.id, ...movieData });
            newDisneys = [...newDisneys, { id: doc.id, ...movieData }];
            break;

          case "trending":
            //  trending.push({ id: doc.id, ...movieData });
            trendings = [...trendings, { id: doc.id, ...movieData }];
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trendings,
        })
      );
    });

    // Cleanup function to unsubscribe from the snapshot listener
    return () => unsubscribe();
  }, [userName, dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
      <Detail/>
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  // background: url("/images/home-background.png");
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
