const getUniqueId = () => { 
    return Date.now()+Math.random();
  }


 export const GetUniqueKey=()=>{        
    return +new Date().getHours()+"-"+new Date().getMinutes()+"-"+new Date().getSeconds()+"-"+Math.random();
}

  export default getUniqueId;