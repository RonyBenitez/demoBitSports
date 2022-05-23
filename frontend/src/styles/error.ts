import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme:any) => ({
    container:{
      textAlign: "center",
      justifyContent:"center",
      display:"flex",
      marginTop:theme.spacing(2),
    },
    label:{
      color:theme.palette.error.main,
    },
    spinner: {
      marginRight: theme.spacing(2),
      marginTop: "2px",
    }
  }));
