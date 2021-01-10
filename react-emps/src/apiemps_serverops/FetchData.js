
 export  async function checkAPIServerConnection(url)  {

  let data = null;
  await fetch(url).then((response)=>{
	  
	  response.status===200?data=response:response.json();}).catch((err)=>{console.log("err.....",err);});
  
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


async function FetchData  (url)  {

  const response = await fetch(url);
  const data = await response.json();

 return  new Promise((resolve, reject) => {

if(data)
{
  resolve(data);
}
else
{ 
  reject({errs:"Error fetching data"})
}


  });

};
export default FetchData;
