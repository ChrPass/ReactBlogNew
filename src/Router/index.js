import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/index";
import Navbar from "../common/Navigation/Navbar";
import {CustomTheme} from "../common/Themes";
import { ThemeProvider } from "@material-ui/styles";

const Router = () => {
    return (
        <BrowserRouter>
        <ThemeProvider theme={CustomTheme}>
        <Navbar/>
            <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Home" component={Home} />
            </Switch>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default Router;