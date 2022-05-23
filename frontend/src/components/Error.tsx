import { useStyles } from '../styles/error';
import Typography from '@mui/material/Typography';



const label="Failed to load data";
export const BaseError=({error}:{error:any}):JSX.Element|null=>{
    const classes=useStyles();
    return (
        error?<div className={classes.container}>
            <Typography variant={"h3"} className={classes.label}>{label}</Typography>
        </div>:null
    );
}



