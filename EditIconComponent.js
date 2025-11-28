import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { serverURL } from '../services/FetchNodeServices';


export default function EditIconComponent({image})
{
    const [iconState,setIconState]=useState(false)

    const IconComponent=()=>{
        return(
             <div style={{position:'absolute', top:'20px', left:'25px'}} >
                                        <EditIcon style={{color:'#fff', width:'15px'}} />
                                       </div>
        )
    }


    return(


        <div style={{position:'relative'}} >
                                {iconState?<IconComponent/>:<></>}
                                
                                    <img style={{width:'40px', height:'40px', borderRadius:'5px'}} src={`${serverURL}/images/${image}`} alt="Category Icon"  onMouseOver={()=>setIconState(true)} onMouseLeave={()=>setIconState(false)} /> 
                               </div>

    )
}