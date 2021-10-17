async function checkAPIServerConnection(url)  {
  let data = null;
  await fetch(url).then((response)=>{	  
	                                    response.status===200?data=response:response.json();}).catch((err)=>{		  
		                                });  
  return  new Promise((resolve, reject) => {

if(data)
{  
  resolve(data);
}
else
{
  reject({empsError:"Internal Server Error"})
}
  });
};

export default checkAPIServerConnection;
