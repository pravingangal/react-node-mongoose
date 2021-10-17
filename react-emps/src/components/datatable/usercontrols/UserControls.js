import React,{useState,useEffect} from "react";

  export const InputControl= ({elemID,onChangeSel,selCheckedFlag})=>{
   
  const [isSelChecked,setIsSelChecked]=useState(false);
 
  const onChange=(event)=>{           
    setIsSelChecked(curr=>!curr);  
    onChangeSel(event);
    
  }

   useEffect(()=>{

     if(selCheckedFlag)
     {
      setIsSelChecked(selCheckedFlag);      
     }
    
   },[selCheckedFlag]
   );

        return (<input 
          type="checkbox"
          className={"custom-control-input"}  
          id={elemID}           
          checked={isSelChecked}
          name={elemID} 
          onChange={onChange}                                                                                                                          
           />);     
};

export const LabelControl=({lblText,lblFor,classNames})=>{  

                          return  (
                                      <label 
                                              htmlFor={lblFor} 
                                              className={"custom-control-label " + classNames}
                                      >
                                      {lblText}
                                      </label>
                                  );           
};


export const IconControl=({iconId,iconText,classNames})=>{
   
  return (<i 
            name={iconId} 
            id={iconId} 
            title={iconText} 
            className={"fa fa-exclamation-triangle " + classNames}>              
            </i>
            );
};

export const ButtonControl=({btnText,classNames,onClick})=>{
  return  (   <button  
                  className={"btn btn-primary " + classNames} 
                  onClick= {onClick}               
              >
                  {btnText}
              </button>
          );
};

export const LinkCtrl=({valText,classNames,onClick})=>{
  return  (   <a 
                  href={onClick} 
                  className={"btn btn-primary"+classNames}                               
              >
                  {valText}
              </a>
          );
};
