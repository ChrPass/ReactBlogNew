import axios from "axios";
import {useEffect} from "react";

const ArticleDetails = () => {

    useEffect(() => {
        axios({
            method:"get",
            url: `${process.env.REACT_APP_API_PATH}/articles/150589`
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })

    }, [])

    return <p>aaaaa</p>
}

export default ArticleDetails;