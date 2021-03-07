import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        background: theme.palette.primary.footer,
        width: "100%",
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <AppBar position="relative" color="primary" className={classes.appBar}>
            <Toolbar>
                <Typography color="textSecondary" variant="caption" display="block" gutterBottom>
                  Christos Pasiopoulos DG-8, Dimitris Glikiotis DG-11, Evgenia Maniati DG-1
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Footer;