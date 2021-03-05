import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ArticleTooltip from './ArticleTooltip';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const MainArticles = ({articles, tagName, displayItemsNum}) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.dark,
    },
    titleBar: {
      cursor: 'pointer',
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    tagImage: {
        width: "auto",
        maxHeight: "150px"
    }
  }));

  const classes = useStyles();

  let history = useHistory();

  const filterByTag = (articles, tag) => {
      // if tag is specified, filter articles accordingly
      let mainArticles = tag ? articles.filter(article => article.tag_list.includes(tag)) : articles;
      // ... and get the first N of them
      return mainArticles.slice(0,displayItemsNum);
  };

  return (
    <React.Fragment>
        <List className={classes.root}>
            {filterByTag(articles, tagName).map((article, i) =>
                <React.Fragment>
                    <ListItem button={true} onClick={() => {history.push(`/Article/${article.id}`)}} alignItems="center" key={article.id}>
                        <Card className={classes.root}>
                          <CardActionArea>
                          <CardMedia
                              component="img"
                              className={classes.media}
                              image={article.social_image}
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                {article.title}
                              </Typography>
                              <ArticleTooltip userName={article.user.name} creationDate={article.created_at}
                                commentsCount={article.comments_count} reactionsCount={article.public_reactions_count} />
                              <Typography variant="body2" color="textSecondary" component="p">
                                {article.description}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Button size="small" color="primary" align="right" endIcon={<ChevronRightIcon/>}>
                              Read More
                            </Button>
                          </CardActions>
                        </Card>
                    </ListItem>
                    <Divider variant="inset" component="li" key={i}/>
                </React.Fragment>
            )}
        </List>
    </React.Fragment>
  );
};

export default MainArticles;
