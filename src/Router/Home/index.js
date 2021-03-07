import React, { useState, useEffect, useContext } from "react";
import { LoaderContext } from "../../hoc/LoaderProvider";
import { Alert } from "@material-ui/lab";
import PopularPosts from "../../components/PopularPosts";
import TaggedArticles from "../../components/TaggedArticles";
import RandomPost from "../../components/RandomPost";
import MainArticles from "../../components/MainArticles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { getArticles } from "../../api/index";
import { useLocation } from "react-router-dom";
import { Container } from "@material-ui/core";

const navigationTags = {
  "/Beginners": ["beginners", "tutorial"],
  "/WebDev": ["webdev", "css", "react", "angular"],
};

const filterByTag = (data, selectedTag) => {
  const filterTagArray = navigationTags[selectedTag];
  if (!filterTagArray) return data;

  let filteredData = [];

  data.map((item) => {
    let foundTag = null;
    for (let tag of item.tag_list) {
      foundTag = filterTagArray.find((x) => x === tag);
      if (foundTag) break;
    }
    if (foundTag) filteredData.push(item);
  });

  return filteredData;
};

const Home = () => {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const setLoader = useContext(LoaderContext);

  const fetchArticles = async () => {
    setError(false);
    setLoader(true);
    const res = await getArticles();

    if (res.error) {
      setError(res.error);
      setLoader(false);
      return;
    }
    const filteredData = filterByTag(res.details.data, location.pathname);

    setArticles(filteredData);
    setLoader(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [location.pathname]);

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <Container>
      <Grid container>
        <Grid item>
          <TaggedArticles articles={articles} displayItemsNum="3" />
        </Grid>
        <Grid item xs="8">
          <Paper>
            <MainArticles articles={articles} startFromItem="4" />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Paper>
              <Grid item xs>
                <PopularPosts articles={articles} displayItemsNum="3" />
              </Grid>
              <Grid item xs>
                <Paper>
                  <RandomPost articles={articles} />
                </Paper>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
