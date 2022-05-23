import {AppBar as BaseAppBar} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ArrowBack } from '@mui/icons-material';
import { useStyles } from '../styles/appBar';


export const AppBar=({title,onPrevClick}:{title:string,onPrevClick?:Function})=>{
    const handlePrevClick=()=>onPrevClick&&onPrevClick();
    const classes=useStyles();
    
    return (
        <BaseAppBar position="sticky" >
        <Toolbar>
            {onPrevClick?<IconButton 
                edge="start" 
                color="inherit"
                onClick={handlePrevClick}>
                <ArrowBack />
            </IconButton>:null}
            <Typography variant={"h3"} className={classes.typo}>{title}</Typography>
        </Toolbar>
        </BaseAppBar>
    );
}

