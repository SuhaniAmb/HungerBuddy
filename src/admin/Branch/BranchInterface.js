import { Grid, TextField, Select, FormControl, InputLabel, MenuItem,IconButton } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { getDate,getTime,postData,getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useEffect } from "react";
import SaveIcon from '@mui/icons-material/Save'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'


const useStyle=makeStyles((theme)=>({

     root:
    {
        display:'flex',
        justifyContent:'center',
        width:'100%',
        height:'100%'
    },
    box:
    {
        width:'80%',
        height:'auto',
        border:'0.7px solid hsla(321, 41%, 24%, 1)',
        borderRadius:'5px',
        margin:'10px',
    },
    heading:
    {
        width:'100%',
        height:'auto',
        borderTopLeftRadius:'5px',
        borderTopRightRadius:'5px'
    },
    titleStyle:
    {
        fontWeight:'bold',
        fontSize:'24px',
        color:'#000',
     
    },
    subTitleStyle:
    {
        fontWeight:'700',
        fontSize:'16px',
        color:'#000',
       
    },
    titleBox:
    {
        display:'flex',
        justifyContent:'center', 
        flexDirection:'column', 
        width:'30%', 
        padding:'10px'
    }
}))

export default function BranchInterface({refresh,setRefresh})
{

        var classes=useStyle()

        const [branchName,setBranchName]=useState('')
        const [address,setAddress]=useState('')
        const [latLong,setLatlong]=useState('')
        const [stateId,setStateId]=useState('')
        const [cityId,setCityId]=useState('')
        const [stateIdList,setStateIdList]=useState([])
        const [cityIdList,setCityIdList]=useState([])
        const [emailId,setEmailId]=useState('')
        const [contactNumber,setContactNumber]=useState('')
        const [contactPerson,setContactPerson]=useState('')


        const [error,setError]=useState({})




        const fetchAllCities=async(sid)=>{
            var res=await postData('statecity/fetch_cities',{stateid:sid})
            setCityIdList(res.data)
        }

        const fillCities=()=>{
            return cityIdList.map((item)=>{
                return(<MenuItem value={item.cityid} > {item.cityname} </MenuItem>)
            })
        }



        const fetchAllStates=async()=>{
            var res=await getData('statecity/fetch_states')
            setStateIdList(res.data)
        }

        useEffect(function(){
            fetchAllStates()
        },[])



        const fillStates=()=>{
            return stateIdList.map((item)=>{
                return(<MenuItem value={item.stateid} >{item.statename}</MenuItem>)
            })
        }



          const handleStateChange=(e)=>{
            setStateId(e.target.value)
            fetchAllCities(e.target.value)
        }



        const handleError=(label,message)=>{

            setError((prev)=>({...prev,[label]:message}))

        }

        const validation=()=>{

            var isError=false

            if(branchName.length===0)
            {
                setError((prev)=>({...prev,'branchName':'Pls Input Branch Name.'}))
                isError=true
            }
            if(address.length===0)
            {
                setError((prev)=>({...prev,'address':'Pls Input Address.'}))
                isError=true
            }if(latLong.length===0)
            {
                setError((prev)=>({...prev,'latLong':'Pls Input LatLong.'}))
                isError=true
            }if(cityId.length===0)
            {
                setError((prev)=>({...prev,'cityId':'Pls Input City Id.'}))
                isError=true
            }if(stateId.length===0)
            {
                setError((prev)=>({...prev,'stateId':'Pls Input State Id.'}))
                isError=true
            }if(emailId.length===0)
            {
                setError((prev)=>({...prev,'emailId':'Pls Input Email Id.'}))
                isError=true
            }if(contactNumber.length===0)
            {
                setError((prev)=>({...prev,'contactNumber':'Pls Input Contact Number.'}))
                isError=true
            }
            if(contactPerson.length===0)
            {
                setError((prev)=>({...prev,'contactPerson':'Pls Input Contact Person.'}))
                isError=true
            }
            return isError
        }


        const generatePassword=()=>{
            
            var sp=['@','#','$','!','&','1','2','3','4','5','6','7','8','9','0']
            var pwd=''
            var i=''
            for(i=1;i<=8;i++)
            {   //alert(parseInt(Math.random()*14))
                var j=sp[parseInt(Math.random()*14)]
                pwd+=j
            }
            return pwd

        }




        const  handleClick=async()=>{

            var err=validation()
            if(err===false)
            {

                var body={branchname:branchName,address:address,latlong:latLong,stateid:stateId,cityid:cityId,emailid:emailId,contactnumber:contactNumber,contactperson:contactPerson,createddate:getDate(),createdtime:getTime(),userid:'xxxx',password:generatePassword()}

                var response=await postData('branch/submit_branch',body)
                if(response.status)
                {
                    Swal.fire({
                                position: "center",
                                icon: "success",
                                title: response.message,
                                showConfirmButton: false,
                                timer: 2000,
                                toast:true
                               });
                }
                else
                {
                    Swal.fire({
                            position: "center",
                            icon: "error",
                            title: response.message,
                            showConfirmButton: false,
                            timer: 2000,
                            toast:true
                           });
                }

            }
            setRefresh(!refresh)
        }



      
    return(

        <div className={classes.root} >
            <div className={classes.box} >
                <div className={classes.heading} >
                    <div className={classes.titleBox} >
                    <div className={classes.subTitleStyle} >Add New Branch</div>
                    </div>
                </div>
                <Grid container spacing={1}>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setBranchName(e.target.value)} fullWidth size="small" label='Branch Name' helperText={error?.branchName} error={error?.branchName} onFocus={()=>handleError('branchName',null)} />
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setAddress(e.target.value)} fullWidth size="small" label='Address' helperText={error?.address} error={error?.address} onFocus={()=>handleError('address',null)} />
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setLatlong(e.target.value)} fullWidth size="small" label='Latlong' helperText={error?.latLong} error={error?.latLong} onFocus={()=>handleError('latLong',null)} />
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 0px 5px'}}> 
                        {/*<TextField onChange={(e)=>setStateId(e.target.value)} fullWidth size="small" label='State' helperText={error?.stateId} error={error?.stateId} onFocus={()=>handleError('stateId',null)} />*/}
                        <FormControl size="small" fullWidth >
                            <InputLabel>State</InputLabel>
                            <Select label="State" value={stateId} onChange={handleStateChange} >
                                <MenuItem>-Select State-</MenuItem>
                                {fillStates()}
                            </Select>
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        {/*<TextField onChange={(e)=>setCityId(e.target.value)} fullWidth size="small" label='City' helperText={error?.cityId} error={error?.cityId} onFocus={()=>handleError('cityId',null)} />*/}
                        <FormControl size="small" fullWidth >
                            <InputLabel>City</InputLabel>
                            <Select label="City" value={cityId} onChange={(e)=>setCityId(e.target.value)} >
                                <MenuItem>-Select City-</MenuItem>
                                {fillCities()}
                            </Select>
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setEmailId(e.target.value)} fullWidth size="small" label='Email Id' helperText={error?.emailId} error={error?.emailId} onFocus={()=>handleError('emailId',null)} />
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setContactNumber(e.target.value)} fullWidth size="small" label='Contact Number' helperText={error?.contactNumber} error={error?.contactNumber} onFocus={()=>handleError('contactNumber',null)} />
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setContactPerson(e.target.value)} fullWidth size="small" label='Contact Person' helperText={error?.contactPerson} error={error?.contactPerson} onFocus={()=>handleError('contactPerson',null)} />
                        </div>
                    </Grid>  
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px',display:'flex',justifyContent:'center'}}>
                        <IconButton onClick={handleClick} style={{color:'hsla(321, 32%, 37%, 1.00', display:'flex',flexDirection:'column'}} >
                            <SaveIcon style={{fontSize:34}} />
                            <div style={{fontSize:12}}>Save</div>
                        </IconButton>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px',display:'flex',justifyContent:'center'}}>
                        <IconButton style={{color:'hsla(321, 32%, 37%, 1.00', display:'flex', flexDirection:'column'}} >
                            <DeleteForeverIcon style={{fontSize:34}} />
                            <div style={{fontSize:12}}>Clear</div>
                        </IconButton>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}