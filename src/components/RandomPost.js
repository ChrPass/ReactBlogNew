import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ArticleTooltip from './ArticleTooltip';
import { useHistory } from "react-router-dom";

const RandomPost = ({articles, displayItemsNum}) => {

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
    small: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        margin: theme.spacing(1)
      },
  }));

  const classes = useStyles();

   let history = useHistory();

  const findRandom = () => {
      // Order articles by reactions count descending
      let size = articles.length;
      let randomNum = Math.floor((Math.random() * size) + 1);
      let randomArt = size > 0 ? [articles[randomNum]] : [];
      return randomArt;
  };

  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom color="primary">
         Random Post
        </Typography>
        <Divider component="li"/>
        <List className={classes.root}>
            {findRandom(articles).map((randomArticle, i) =>
                <React.Fragment>
                    <ListItem button={true} onClick={() => {history.push(`/Article/${randomArticle.id}`)}} alignItems="center" key={randomArticle.id}>
                        <ListItemAvatar key={randomArticle.id}>
                          <Avatar variant="square" src={randomArticle.social_image} className={classes.small} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={randomArticle.title}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary">
                              </Typography>
                              <ArticleTooltip article={randomArticle}/>
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

export default RandomPost;
