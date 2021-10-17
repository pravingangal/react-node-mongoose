const UserSession = (
     ()=>
    {
        sessionStorage.setItem("userSession", "");

         const getSessionVar = (key) => {            
             return sessionStorage.getItem(key);
         }
         
          const setSessionVar = (key,val, addTimeStamp=true) => addTimeStamp? sessionStorage.setItem(key, val+"_"+new Date().getTime()):sessionStorage.setItem(key, val);		  
		  const reSetSessionVar = (key,val) => sessionStorage.setItem(key, val);

        return { getSessionVar: getSessionVar, setSessionVar: setSessionVar , reSetSessionVar:reSetSessionVar};
    }
)();

export default UserSession;
