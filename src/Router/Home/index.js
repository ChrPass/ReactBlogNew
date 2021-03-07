import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GET_ARTICLES } from '../../api';
import { LoaderContext } from "../../hoc/LoaderProvider";
import { Alert } from '@material-ui/lab';
import PopularPosts from '../../components/PopularPosts';
import TaggedArticles from '../../components/TaggedArticles';
import RandomPost from '../../components/RandomPost';
import MainArticles from '../../components/MainArticles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getArticles } from "../../api/index";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const setLoader = useContext(LoaderContext);

  const fetchArticles = async () => {
    setError(false);
    setLoader(true);
    const res = await getArticles();

    if (res.error) {
      setError(res.error);
      setLoader(false)
      return;
    }
    setArticles(res.details.data);
    setLoader(false)
  };

  useEffect(() => {

    fetchArticles();
  }, []);

  if (error) {
    return <Alert severity="error">{error.message}</Alert>
  }

  return (
    <Grid container>
      <Grid item >
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
  );
}

export default Home;
