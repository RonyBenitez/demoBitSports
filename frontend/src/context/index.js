import { usePeopleWithCache } from './../hooks/usePeople';
import { createContext, useContext } from "react";


const initialState={
    data:[],
    fetchMore:(resolve=()=>{},reject=()=>{})=>{},
    isLoading:false,
    hasMore:true,
    error:null,
    reset:(resolve=()=>{},reject=()=>{})=>{}
}

const context=createContext(initialState);

const BaseProvider=context.Provider

export const DataProvider=({children})=>{
    const {data,fetchMore,isLoading,hasMore,error,reset}=usePeopleWithCache();
    return <BaseProvider value={{data,fetchMore,isLoading,hasMore,error,reset}}>{children}</BaseProvider>
}

export const useData=()=>useContext(context);




