import { Grid, ImageList, ImageListItem, List, ListItem, Menu, MenuItem, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ServiceConfig from "../Commons/ServiceConfig";
import { Autorenew, CenterFocusStrong, Router } from "@material-ui/icons";
import { Item } from "@syncfusion/ej2-navigations";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Button from "@restart/ui/esm/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: '#282c34',
    },
    div: {
        //padding: theme.spacing(2),
        height: 600,
        overflowY: "scroll",
        color: '#fff',
    },
    imageList: {
        //marginLeft: 300,
        //width: 700,
        height: 600,
    },
}));


export function OverView(props) {
    const [list, setList] = useState([]);
    useEffect(() => {
        axios({
            url: props.ligaTipos,
        })
            .then((response) => {
                let pokemones = {};
                let listaPokemones = [];
                response.data.pokemon.map(pokemon => {
                    pokemones = pokemon;
                    let url = pokemon.pokemon.url.substring(0, pokemon.pokemon.url.length - 1);
                    const index = url.lastIndexOf("/");
                    url = url.slice(index);
                    pokemones.route = url;
                    listaPokemones.push(pokemones);
                })
                setList(listaPokemones);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setList]);
    const classes = useStyles();
    const [image, setImage] = useState();
    const [route, setRoute] = useState();
    const selected = (event) => {
        let url = event.target.id.substring(0, event.target.id.length - 1);
        const index = url.lastIndexOf("/");
        url = url.slice(index + 1);
        setRoute('/' + url);
        url = ServiceConfig.getImage + url + '.png';
        setImage(url);
    }

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    return (
        <div>
            <div className={classes.root}>
                <Grid container spacing={12}>
                    <BrowserRouter>
                    <div className={classes.div}>
                        <Grid xl={5} >
                            <List
                            >
                                {
                                    list.map(list => {
                                        return (
                                            <Link to={list.route}>
                                                <ListItem id={list.pokemon.url} key={list.pokemon.url} button value={list.pokemon.url} onClick={selected}>{list.pokemon.name}</ListItem>
                                            </Link>
                                        );
                                    })
                                }
                            </List>
                        </Grid>
                    </div>
                    <Grid xl={7}>
                            <div>
                                {image && <Switch>
                                    <Route path={route}>
                                        <ImageList rowHeight={460} className={classes.imageList} cols={460}>
                                            <ImageListItem key={"item.img"} cols={"item.cols" || 1}>
                                                {image && <img src={image} alt={"item.title"} />}
                                            </ImageListItem>
                                        </ImageList>
                                    </Route>
                                </Switch>}
                            </div>
                        
                    </Grid>
                    </BrowserRouter>
                </Grid>

            </div>
                                
        </div>
    );
}
const Picture = (props) => {
    const classes = useStyles();
    return (
        <ImageList rowHeight={460} className={classes.imageList} cols={460}>
            <ImageListItem key={"item.img"} cols={"item.cols" || 1}>
                {props.image && <img src={props.image} alt={"item.title"} />}
            </ImageListItem>
        </ImageList>
    );
}
