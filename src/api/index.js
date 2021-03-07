import Axios from "axios";
const API_BASE_URL = "https://dev.to/api";

export const GET_ARTICLES = `${API_BASE_URL}/articles`;

export const getArticles = () => {
    return Axios({
        method: "get",
        url: `${process.env.REACT_APP_API_PATH}/articles`,
    })
    .then(res => {
        return {res: true, details: res};
    })
    .catch(err => {
        return {error: err};
    })
}

export const getArticle = (articleId) => {
    return Axios({
        method: "get",
        url: `${process.env.REACT_APP_API_PATH}/articles/${articleId}`,
    })
    .then(res => {
        return {res: true, details: res};
    })
    .catch(err => {
        return {error: err};
    })
}