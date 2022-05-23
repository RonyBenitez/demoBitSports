import {Person} from '../models/person'
import Box from '@mui/material/Box';
import {CssBaseline, List as BaseList, Typography} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useStyles } from '../styles/list';
import { useNavigate } from "react-router-dom";
import React from 'react';



export const ListItem=({person}:{person:Person}):JSX.Element=> {
    const classes=useStyles();
    const navigate=useNavigate();

    return (
        <Box>
        <CssBaseline />
        <ListItemButton onClick={()=>navigate(`/${person.id}`)}>
            <ListItemText 
                primary={<Typography variant="h3" className={classes.title}>{person.name}</Typography>} 
                secondary={<Typography variant={"h4"} className={classes.subtitle}>{person.descriptor}</Typography>}
            />
            <ListItemIcon>
                <ArrowForwardIosIcon />
            </ListItemIcon>
        </ListItemButton>
        <Divider />
        </Box>
    );
}

export const List=({people,onScroll,scrollRef}:{people:Array<Person>,onScroll:Function,scrollRef:React.MutableRefObject<null>}):JSX.Element=> {
    const classes=useStyles();

    const onScrollI=()=>{
        if(scrollRef.current){
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            onScroll&&onScroll({ scrollTop, scrollHeight, clientHeight } )
        }

    }
    
   
    return (
       <BaseList 
            onScroll={onScrollI}
            className={classes.container} 
            ref={scrollRef}
            sx={{
                width: '100%',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 500,
              }}
            >
            {people.map(person=>(
                <ListItem key={person.id} person={person}/>
            ))}
         </BaseList>
    );
}
