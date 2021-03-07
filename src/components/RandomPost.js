import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

const RandomPost = ({articles = []}) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "80% !important",
      width: "80% !important",
      textAlign: "center",
      alignItems:"center",
      justify:"center"

    },
     media: {
      height: "100% !important",
      width: "100% !important",
    }
  }));

  const classes = useStyles();

   let history = useHistory();

  const findRandom = () => {
      let size = articles.length;
      let randomNum = Math.floor((Math.random() * size));
      let randomArt = size > 0 ? [articles[randomNum]] : [];
      return randomArt;
  };

  return (
      <React.Fragment>
          <Typography variant="h6" gutterBottom color="primary">
           Random Post
           <Divider component="li"/>
          </Typography>
              {findRandom(articles).map((randomArticle, index) =>
              <Grid
              container
                key={index}
                spacing={0}
                alignItems="center"
                justify="center">
                   <Card className={classes.root} onClick={() => {history.push(`/Article/${randomArticle.id}`)}} className={classes.media}>
                     <CardActionArea>
                       <CardMedia
                         component="img"
                         alt={randomArticle.title}
                         className={classes.media}
                         title={randomArticle.title}
                         image={randomArticle.social_image}
                       />
                       <CardContent>
                         <Typography gutterBottom variant="h6" component="h3" style={{textAlign: "center"}}>
                           {randomArticle.title}
                         </Typography>
                       </CardContent>
                     </CardActionArea>
                   </Card>
              </Grid>
        )}
      </React.Fragment>
  );
};

export default RandomPost;
