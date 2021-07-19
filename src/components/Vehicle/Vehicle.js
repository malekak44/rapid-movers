import React from 'react';
import './Vehicle.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 190,
    },
});

const Vehicle = (props) => {
    const { data } = props;
    const classes = useStyles();

    return (
        <Link to="/destination" style={{ textDecoration: "none" }}>
            <Card className={classes.root} id="card">
                <CardActionArea>
                    <CardMedia style={{ backgroundSize: "80%" }} id="img"
                        className={classes.media}
                        image={data.image}
                        title={data.name}
                    ></CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <strong>{data.name}</strong>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
};

export default Vehicle;