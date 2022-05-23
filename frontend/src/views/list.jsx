import { AppBar } from '../components/AppBar';
import { Loading, LoadingRefresh } from '../components/Loading';
import { BaseError } from '../components/Error';
import { List } from '../components/List';
import { useData } from '../context';
import {PullDownContent, PullToRefresh, ReleaseContent} from "react-js-pull-to-refresh";
import {  useRef } from 'react';


export const ListPerson=()=> {
  const {hasMore,fetchMore,data,error,reset,isLoading}=useData()
  const scrollRef=useRef()

  const onScroll=(response)=>{
    const { scrollTop, scrollHeight, clientHeight } = response
    if (scrollTop + clientHeight === scrollHeight) {
      if(hasMore){fetchMore()}
    }
  }

  
  const onRefresh=()=>{
    return new Promise((resolve,reject)=>{
      // add some timeout here to give the waiting effect, the api is too fast
      setTimeout(()=>{
        reset(resolve,reject);
      },1500)
      
    })
  }


  

  return (
    <>
    <AppBar title='People of Star Wars' />
    <PullToRefresh
       pullDownContent={<PullDownContent />}
       releaseContent={<ReleaseContent />}
       refreshContent={<LoadingRefresh />}
       pullDownThreshold={200}
       onRefresh={onRefresh}
       triggerHeight={30}
       backgroundColor='white'
       startInvisible={true}
    >
    <div>
        <BaseError error={error}/>
        <List scrollRef={scrollRef}  people={data} onScroll={onScroll}></List>
        <Loading loading={isLoading}></Loading>
    </div>
  </PullToRefresh>
  </>
  );
}


