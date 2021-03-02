import axios from "axios";
import {useState, useEffect} from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const ArticleDetails = () => {

    const { articleId } = useParams()
    const [article, setArticle] = useState([]);

    useEffect(() => {
        axios({
            method:"get",
            url: `${process.env.REACT_APP_API_PATH}/articles/${articleId}`
        }).then((res) => {
            console.log(res);
            setArticle(res.data);
        }).catch((err) => {
            console.log(err);
        })

    }, [])

    return (
            <Grid container spacing="1">
                <Grid item xs="8">
                  <Paper>
                    <Typography variant="h6" gutterBottom align="center">
                          {article.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {article.body_html}
                    </Typography>
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