import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';

const TaggedArticles = ({articles, tagName, displayItemsNum}) => {

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
      let taggedArticles = tag ? articles.filter(article => article.tag_list.includes(tag)) : articles;
      // ... and get the first N of them
      return taggedArticles.slice(0,displayItemsNum);
  };

  return (
    <React.Fragment>
        <GridList className={classes.gridList}>
            {filterByTag(articles, tagName).map((article, i) =>
                <React.Fragment>
                    <GridListTile key={article.id}>
                        <img  src={article.social_image} alt={article.title} className={classes.tagImage}/>
                        <GridListTileBar
                          title={article.title}
                          onClick={() => {history.push(`/Article/${article.id}`)}}
                          classes={{
                            root: classes.titleBar,
                          }}
                        />
                    </GridListTile>
                </React.Fragment>
            )}
        </GridList>
    </React.Fragment>
  );
};

export default TaggedArticles;