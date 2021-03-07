import axios from "axios";
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
import ArticleTooltip from "../../components/ArticleTooltip";

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
          <Box
            style={{
              height: "500px",
              width: "100%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${article.cover_image})`,
            }}
          ></Box>
          <Container>
            <Grid container spacing="1">
              <Grid item xs="8">
                <Paper>
                  <Box m={6}>
                    <Grid container spacing="2">
                      <Grid item xs="12" zeroMinWidth>
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
                        <Typography className={classes.breakWord}>
                          <ReactMarkdown
                            source={article.body_markdown}
                            plugins={[gfm]}
                            renderers={{ image: MyImage, code: CodeBlock }}
                            className={classes.breakWord}
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs="4">
                <RandomPost articles={allArticles} />
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
};

export default ArticleDetails;
