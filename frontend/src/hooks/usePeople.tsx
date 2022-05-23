import { useEffect, useRef, useState } from 'react';
import { Person } from '../models/person';
import { getPersonResponse } from '../services/swapi';


export const usePeople=(startPage=0)=> {
  const pageBase=useRef(startPage)
  const [people,setPeople]=useState<Array<Person>>([]);
  const [errorMessage,setErrorMessage]=useState<Object|null>();
  const [hasNext,setHasNext]=useState<boolean>(true);
  const [hasPrev,setHasPrev]=useState<boolean>(false);
  const [isLoading,setIsLoading]=useState<boolean>(false);
  const handlePage=(nPage:number,resolve?:Function,reject?:Function):void=>{
    pageBase.current=nPage
    setIsLoading(true);
    getPersonResponse(nPage)
    .then(response=>{
      setPeople(response.people);
      setHasNext(response.next?true:false);
      setHasPrev(response.prev?true:false);
      setErrorMessage(null);
      setIsLoading(false);
      resolve&&resolve(response)
    })
    .catch((error)=>{
      setErrorMessage(error.getStrError());
      console.log(error);
      setPeople([]);
      setIsLoading(false);
      reject&&reject(error);
    }) 
  }

  const handleStep=(step:number,resolve?:Function,reject?:Function)=>{
    const nPage=pageBase.current+step
    handlePage(nPage,resolve,reject)
  }

  useEffect(()=>{handlePage(startPage)},[startPage])

  const reset=(resolve?:Function,reject?:Function)=>{
    handlePage(startPage,resolve,reject)
  }

  return {
    fetchNextPage:(resolve?:Function,reject?:Function)=>handleStep(1,resolve,reject),
    fetchPrevPage:(resolve?:Function,reject?:Function)=>handleStep(-1,resolve,reject),
    people,
    hasNext,
    hasPrev,
    error:errorMessage,
    isLoading,
    reset
  }
}

export const usePeopleWithCache=()=> {
  const [data,setData]=useState<Array<Person>>([]);
  const {hasNext,fetchNextPage,people,error,isLoading,reset:resetB}=usePeople(1)

  const reset=(resolve?:Function,reject?:Function)=>{setData([]);resetB(resolve,reject)}
  const mergeHandler=(prev:Array<Person>,now:Array<Person>):void=>{
    if(prev.length===0){setData(now);}
    else{
      const prevObject=prev.map(person=>({[person.id]:person}));
      const nowObject=now.map(person=>({[person.id]:person}));
      const mergedObject=Object.assign({},...prevObject,...nowObject);
      const mergedArray:Array<Person>=Object.values(mergedObject);
      setData(mergedArray);
    }
  }

  useEffect(()=>{mergeHandler(data,people);},[people])

  const fetchMore=(resolve?:Function,reject?:Function):void=>{if(hasNext){fetchNextPage(resolve,reject);}}

  return {
    data,
    fetchMore,
    isLoading,
    hasMore:hasNext,
    error,
    reset
  }
}