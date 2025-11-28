import axios from "axios";
import Swal from "sweetalert2"



const serverURL='http://localhost:5000'

function getDate()
{
    var cd=new Date()
    return(`${cd.getFullYear()}/${cd.getMonth()+1}/${cd.getDate()}`)
}

function getTime()
{
    var cd=new Date()
    return(`${cd.getHours()}:${cd.getMinutes()}:${cd.getSeconds()}`)
}

async function postData(url,body)
{
  try
  { // alert (localStorage.getItem('Token'))

    const config={

      headers:{
        'Authorization':localStorage.getItem('Token')
      }
    }


    var response=await axios.post(`${serverURL}/${url}`,body,config)
    var data=response.data
    return(data)
  }
  catch(e)
  {  // alert(JSON.stringify(e.response))
   if(e.response.status===401)
    {
      Swal.fire('Your session is expired....pls login')
    }
    else
    {
      Swal.fire("Site is not working properly...pls wait for sometime")
    }
    return([])
  }
}



async function getData(url)
{  
  try
  {
    //alert (localStorage.getItem('Token'))

    const config={

      headers:{
        'Content-Type':'application/json',
        'Authorization':localStorage.getItem('Token')
      }
    }

    var response=await axios.get(`${serverURL}/${url}`,config)
    var data=response.data
    return(data)
  }
  catch(e)
  { // alert(JSON.stringify(e.response))
   if(e.response.status===401)
    {
      Swal.fire('Your session is expired....pls login')
    }
    else
    {
      Swal.fire("Site is not working properly...pls wait for sometime")
    }
    return([])
  }
}



export {postData,serverURL,getDate,getTime,getData}