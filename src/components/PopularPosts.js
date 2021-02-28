import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ArticleTooltip from './ArticleTooltip';

const PopularPosts = ({articles, displayItemsNum}) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '100ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        margin: theme.spacing(1)
      },
  }));

  const classes = useStyles();

  const [popularArticles, setPopularArticles] = useState([]);

  useEffect(() => {
        const filterPopular = () => {
          // Order articles by reactions count descending
          let sorted = articles.sort((a1,a2) =>
                (a1.public_reactions_count > a2.public_reactions_count) ? 1 :
                    ((a1.public_reactions_count < a2.public_reactions_count) ? -1 : 0)).reverse();
          // ... and get the first N of them
          setPopularArticles(sorted.slice(0,displayItemsNum))
        };

        filterPopular();
      }, []);

  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom color="primary">
         POPULAR POSTS
        </Typography>
        <Divider component="li"/>
        <List className={classes.root}>
            {popularArticles.map((popularArticle, i) =>
                <React.Fragment>
                    <ListItem alignItems="center" key={popularArticle.id}>
                        <ListItemAvatar key={popularArticle.id}>
                          <Avatar variant="square" src={popularArticle.social_image} className={classes.large} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={popularArticle.title}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary">
                              </Typography>
                              <ArticleTooltip article={popularArticle}/>
                            </React.Fragment>
                          }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" key={i}/>
                </React.Fragment>
            )}
        </List>
    </React.Fragment>
  );
};

export default PopularPosts;