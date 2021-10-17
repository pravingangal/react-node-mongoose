export const getUniqueKey=()=>{        
    return +new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random();
}

  export default getUniqueKey;
