import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {GET_ARTICLES} from '../../api';
import { LoaderContext } from "../../hoc/LoaderProvider";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';
import PopularPosts from '../../components/PopularPosts';
import TaggedArticles from '../../components/TaggedArticles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const setLoader = useContext(LoaderContext);

    let history = useHistory();

    useEffect(() => {
        const fetchArticles = async () => {
          setError(false);
          setLoader(true);

          axios.get(GET_ARTICLES)
            .then(response => {
                setArticles(response.data);
            })
            .catch(error => {
              setError(error);
            })
            .finally(() => setLoader(false));
        };

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
                <List>
                  {articles.map((article) =>
                      <ListItem onClick={() => {history.push(`/Article/${article.id}`)}}>
                          <ListItemText primary={article.title} secondary={article.public_reactions_count}/>
                      </ListItem>
                 )}
                </List>
              </Paper>
            </Grid>
            <Grid item xs="4">
              <Paper>
                <PopularPosts articles={articles} displayItemsNum="3" />
              </Paper>
            </Grid>
        </Grid>
      );
}

export default Home;