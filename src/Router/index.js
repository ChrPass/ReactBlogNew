import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/index";
import Navbar from "../common/Navigation/Navbar";
import Footer from "../common/Navigation/Footer";
import { CustomTheme } from "../common/Themes";
import { ThemeProvider } from "@material-ui/styles";
import LoaderProvider from "../hoc/LoaderProvider";
import ArticleDetails from "./Article/index";

const Router = () => {
  return (
    <BrowserRouter>
      <LoaderProvider>
        <ThemeProvider theme={CustomTheme}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Home" component={Home} />
            <Route path="/WebDev" component={Home} />
            <Route path="/Beginners" component={Home} />
            <Route path="/Article/:articleId" component={ArticleDetails} />
          </Switch>
          <Footer/>
        </ThemeProvider>
      </LoaderProvider>
    </BrowserRouter>
  );
};

export default Router;
