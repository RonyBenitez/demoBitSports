import {Person} from '../models/person'
import Box from '@mui/material/Box';
import { ListItemButton, ListItemText, Typography, List as BaseList} from '@mui/material';
import Divider from '@mui/material/Divider';
import { useStyles } from '../styles/personDetails';
import { Vehicle } from '../models/vehicle';


export const Row=({label,value}:{label:String,value:String}):JSX.Element=> {
    const classes=useStyles();
    return (
        <>
        <ListItemButton >
            <ListItemText 
                primary={ 
                <div className={classes.rowContainer}>
                    <Typography variant="h3" className={classes.title}>{label}</Typography>
                    <Typography variant="h3" className={classes.subtitle}>{value}</Typography>
                </div>} 
            />
        </ListItemButton>
        <Divider />
        </>
    );
}

export const PersonDetails=({person}:{person:Person}):JSX.Element=> {
    const classes=useStyles();
    return (
        <Box className={classes.box}>
            <Typography variant="h3" className={classes.header}>{"General Information"}</Typography>
            <BaseList >
            <Row label={"Eye Color"} value={person.eye_color} />
            <Row label={"Hair Color"} value={person.hair_color} />
            <Row label={"Skin Color"} value={person.skin_color} />
            <Row label={"Birth Year"} value={person.birth_year} />
            </BaseList>
        </Box>
    );
}

export const VehiclesDetail=({vehicles}:{vehicles:Array<Vehicle>})=>{
    const classes=useStyles();
    return (
        <Box className={classes.box}>
            <Typography variant="h3" className={classes.header}>{"Vehicles"}</Typography>
            <BaseList >
            {vehicles.map(vehicle=>(
                <Row label={vehicle.name||""} value={""} key={vehicle.id}/>
            ))}
            </BaseList >

        </Box>
    );
}

