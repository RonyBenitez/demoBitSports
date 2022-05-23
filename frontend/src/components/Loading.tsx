import CircularProgress from '@mui/material/CircularProgress';
import { useStyles } from '../styles/loading';
import Typography from '@mui/material/Typography';




export const Loading=({loading}:{loading:boolean}):JSX.Element|null=>{
    const classes=useStyles();
    return (
        loading?<div className={classes.container}>
            <CircularProgress size={"1rem"} className={classes.spinner} color={"info"}  />
            <Typography variant={"h3"} className={classes.label}>{"Loading"}</Typography>
        </div>:null
    );
}

export const LoadingRefresh=()=>{
    const classes=useStyles();
    return (
        <div className={classes.containerRefresh}>
            <CircularProgress size={"3rem"} className={classes.spinner} color={"info"}  />
        </div>
    );
}

