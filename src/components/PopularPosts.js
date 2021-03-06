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
import { useHistory } from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';

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
    small: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        margin: theme.spacing(1)
      },
  }));

  const classes = useStyles();

   let history = useHistory();

  const filterPopular = (articles) => {
      // Order articles by reactions count descending
      let sorted = cloneDeep(articles).sort((a1,a2) =>
            (a1.public_reactions_count > a2.public_reactions_count) ? 1 :
                ((a1.public_reactions_count < a2.public_reactions_count) ? -1 : 0)).reverse();
      // ... and get the first N of them
      return sorted.slice(0,displayItemsNum);
  };

  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom color="primary">
         Popular Posts
        </Typography>
        <Divider component="li"/>
        <List className={classes.root}>
            {filterPopular(articles).map((popularArticle, i) =>
                <div key={popularArticle.id}>
                    <ListItem button={true} onClick={() => {history.push(`/Article/${popularArticle.id}`)}} alignItems="center" >
                        <ListItemAvatar >
                          <Avatar variant="square" src={popularArticle.social_image} className={classes.small} />
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
                              <ArticleTooltip userName={popularArticle.user.name} creationDate={popularArticle.created_at}
                                commentsCount={popularArticle.comments_count} reactionsCount={popularArticle.public_reactions_count} />
                            </React.Fragment>
                          }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" key={i}/>
                </div>
            )}
        </List>
    </React.Fragment>
  );
};

export default PopularPosts;