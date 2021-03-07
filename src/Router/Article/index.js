import { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { LoaderContext } from "../../hoc/LoaderProvider";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { MyImage, CodeBlock } from "../../common/MarkDownRenderer";
import { getArticles, getArticle } from "../../api/index";
import RandomPost from "../../components/RandomPost";
import PopularPosts from "../../components/PopularPosts";
import ArticleTooltip from "../../components/ArticleTooltip";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  articleInfo: {
    paddingBottom: 2,
  },
  breakWord: {
    overflowWrap: "break-word",
    wordBreak: "break-word",
  },
  imageTitle: {
    background: "#666666",
    position: "absolute",
    color: "#ffffff",
    top: "50%",
    left: "20%",
    transform: "translateX(-50%)",
    maxWidth: "400px",
    overflowWrap: "break-word",
    wordBreak: "break-word",
  },
  card: {
    boxShadow: 0,
  },
  cardContent: {
    padding: 0,
    paddingBottom: 0,
  },
}));

const ArticleDetails = () => {
  const classes = useStyles();
  const { articleId } = useParams();
  const [article, setArticle] = useState();
  const [allArticles, setAllArticles] = useState([]);
  const [articleTags, setArticleTags] = useState([]);
  const setLoader = useContext(LoaderContext);

  const fetchArticles = async () => {
    setLoader(true);
    const allArticlesRes = await getArticles();

    const articleRes = await getArticle(articleId);

    if (articleRes.error) {
      setLoader(false);
      return;
    }

    setArticle(articleRes.details.data);
    setArticleTags(articleRes.details.data.tags);
    setAllArticles(allArticlesRes.error ? [] : allArticlesRes.details.data);
    setLoader(false);
  };

  useEffect(() => {
    setLoader(true);

    fetchArticles();
  }, [articleId]);

  return (
    <div>
      {article && (
        <>
          <Card elevation={0} classes={{ root: classes.card }}>
            <CardContent classes={{ root: classes.cardContent }}>
              <CardMedia
                component="img"
                className={classes.media}
                image={
                  article.cover_image
                    ? article.cover_image
                    : article.social_image
                }
                // title={article.title}
              />
            </CardContent>
          </Card>
          <Container>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <Paper>
                  <Box m={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} zeroMinWidth>
                        <Grid
                          container
                          direction="column"
                          justify="center"
                          alignItems="center"
                          spacing={2}
                        >
                          <Grid item xs>
                            <Typography
                              className={classes.breakWord}
                              variant="h4"
                            >
                              <Box fontWeight="fontWeightBold">
                                {article.title}
                              </Box>
                            </Typography>
                          </Grid>

                          <Grid item xs>
                            <div className={classes.root}>
                              {Object.values(articleTags).map((tag, index) => (
                                <Chip
                                  key={index}
                                  size="small"
                                  label={tag}
                                  color="primary"
                                />
                              ))}
                            </div>
                          </Grid>
                          <Grid item xs>
                            <ArticleTooltip
                              userName={article.user.name}
                              creationDate={article.created_at}
                              commentsCount={article.comments_count}
                              reactionsCount={article.public_reactions_count}
                            />
                          </Grid>
                        </Grid>
                        <ReactMarkdown
                          source={article.body_markdown}
                          plugins={[gfm]}
                          renderers={{ image: MyImage, code: CodeBlock }}
                          className={classes.breakWord}
                        />
                      </Grid>
                    </Grid>
                  </Box>
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
                      <PopularPosts
                        articles={allArticles}
                        displayItemsNum={3}
                      />
                    </Grid>
                    <Grid item xs>
                      <Paper>
                        <RandomPost articles={allArticles} />
                      </Paper>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
};

export default ArticleDetails;
