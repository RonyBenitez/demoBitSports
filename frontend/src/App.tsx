import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';
import { ListPerson } from './views/list';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import { DetailPerson } from './views/details';
import { DataProvider } from './context';


const AppBase=():JSX.Element=> {
  


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/:personId"element={<DetailPerson />}/>
      <Route path="/" element={<ListPerson />}/>
    </Routes>
  </BrowserRouter>
  );
}


const App=()=>{
  return (
    <ThemeProvider theme={theme}>
      <DataProvider>
        <AppBase />
      </DataProvider>
        
    </ThemeProvider>
  );
};

export default App;
