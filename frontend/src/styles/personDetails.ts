import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme:any) => ({
    title:{
      color:theme.palette.info.main,
    },
    subtitle:{
      color:theme.palette.primary.main,
    },
    rowContainer:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
    },
    header:{
      color:theme.palette.primary.main,
      marginTop:theme.spacing(4),
      marginBottom:theme.spacing(1),
      marginLeft:"1rem !important"
    },
    box:{
      marginTop:"2rem"
    }
  }));
