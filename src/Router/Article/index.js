import axios from "axios";
import { useState, useEffect, dangerouslySetInnerHTML } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ArticleTooltip from "../../components/ArticleTooltip";
import Divider from "@material-ui/core/Divider";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { MyImage, CodeBlock } from "../../common/MarkDownRenderer";

const ArticleDetails = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  }));

  const classes = useStyles();

  const { articleId } = useParams();
  const [article, setArticle] = useState([]);
  const [articleTags, setArticleTags] = useState([]);
  const [articleUser, setArticleUser] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_PATH}/articles/${articleId}`,
    })
      .then((res) => {
        debugger;
        setArticle(res.data);
        setArticleTags(res.data.tags);
        setArticleUser(res.data.user.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Box
        style={{
          height: "400px",
          width: "100%",
          backgroundImage: `url(${article.cover_image})`,
        }}
      ></Box>
      <Grid container spacing="1">
        <Grid item xs="8">
          <Paper>
            <Box m={6}>
              <Grid container spacing="2">
                <Grid item xs="12" zeroMinWidth>
                  <div className={classes.root}>
                    {Object.values(articleTags).map((tag, index) => (
                      <Chip size="small" label={tag} color="primary" />
                    ))}
                  </div>

                  {/* {article.title} */}
                  {/* <div> dangerouslySetInnerHTML={{__html: article.title}}</div> */}
                  <Typography
                    style={{
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                  >
                    <ReactMarkdown
                      source={article.body_markdown}
                      plugins={[gfm]}
                      renderers={{ image: MyImage, code: CodeBlock }}
                      className={{
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                      }}
                    />

                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs="4">
          <Paper>TODO RANDOM POST</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ArticleDetails;
