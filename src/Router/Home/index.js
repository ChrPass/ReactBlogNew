import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {GET_ARTICLES} from '../../api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = () => {
          setError(false);
          setIsLoading(true);

          axios.get(GET_ARTICLES)
            .then(response => {
                setArticles(response.data);
                setIsLoading(false);
            })
            .catch(error => {
              setError(error);
              setIsLoading(false);
            });
        };

        fetchArticles();
      }, []);

    if (error) {
        return <Alert severity="error">{error.message}</Alert>
    }

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <div>
          <List>
            {articles.map((article) =>
                <ListItem>
                    <ListItemText primary={article.title} />
                </ListItem>
            )}
          </List>
        </div>
      );
}

export default Home;