import * as React from 'react';

export const useIsOverflow = (ref:React.MutableRefObject<any>, callback:Function) => {
  const [isOverflow, setIsOverflow] = React.useState(false);
  const r=React.useRef(null)

  React.useLayoutEffect(() => {
    const { current } = ref;
    const trigger = () => {
      if(current){
        const hasOverflow = current.scrollHeight > current.clientHeight;
        setIsOverflow(hasOverflow);
        if (callback) callback(hasOverflow);
      }
    };
    trigger();
  }, [callback, ref]);

  return isOverflow;
};