import React from 'react';
import classes from './ScreenCover.module.css';

const screenCover = (props) => (
    props.displayScreenCover ? <div className={classes.displayScreenCover} onClick={props.onClick}></div> : null
);

export default screenCover;
