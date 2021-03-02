import axios from "axios";
import {useState, useEffect} from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ArticleTooltip from '../../components/ArticleTooltip';
import Divider from '@material-ui/core/Divider';

const ArticleDetails = () => {

    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
      },
    }));

    const classes = useStyles();

    const { articleId } = useParams()
    const [article, setArticle] = useState([]);
    const [articleTags, setArticleTags] = useState([]);
    const [articleUser, setArticleUser] = useState([]);

    useEffect(() => {
        axios({
            method:"get",
            url: `${process.env.REACT_APP_API_PATH}/articles/${articleId}`
        }).then((res) => {
            setArticle(res.data);
            setArticleTags(res.data.tags);
            setArticleUser(res.data.user.name);
        }).catch((err) => {
            console.log(err);
        })

    }, [])

    return (
            <Grid container spacing="1">
                <Grid item xs="8">
                  <Paper>
                    <Grid container spacing="2">
                        <Grid item xs="12">
                            <div className={classes.root}>
                                {Object.values(articleTags).map((tag, index) =>
                                  <Chip size="small" label={tag} color="primary"/>
                                )}
                            </div>
                            <Typography variant="h6" gutterBottom align="center">
                                  {article.title}
                            </Typography>
                            <Divider />
                            <ArticleTooltip userName={articleUser} creationDate={article.created_at}
                                commentsCount={article.comments_count} reactionsCount={article.public_reactions_count} />
                        </Grid>
                        <Grid item xs="12">
                            <Typography variant="body2" gutterBottom>
                                {article.body_html}
                            </Typography>
                        </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs="4">
                  <Paper>
                    TODO RANDOM POST
                  </Paper>
                </Grid>
            </Grid>
          );

}

export default ArticleDetails;