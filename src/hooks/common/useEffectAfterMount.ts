import { useEffect, useRef } from "react"

export const useEffectAfterMount = (cb:Function,arrdeps:Array<any>) => {
    const isComponentJustMounted = useRef(true)
    useEffect(()=>{
        if(!isComponentJustMounted.current){
            return cb();
        }
        isComponentJustMounted.current = false;
        //eslint-disable-next line react-hooks/exhasutive-deps
    },[...arrdeps,cb]) 

}