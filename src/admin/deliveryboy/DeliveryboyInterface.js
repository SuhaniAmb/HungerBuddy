import { Grid, TextField, Select, FormControl, InputLabel, MenuItem, IconButton, Radio, FormControlLabel, FormLabel, RadioGroup } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { getDate,getTime,postData,getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useEffect } from "react";
import delivery from '../../assets/delivery.png'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';



const useStyle=makeStyles((theme)=>({

     root:
    {
        display:'flex',
        justifyContent:'center',
        width:'100%',
        height:'auto'
    },
    box:
    {
        width:'80%',
        height:'auto',
        border:'0.7px solid hsla(321, 41%, 24%, 1)',
        borderRadius:'5px',
        margin:'10px',
        overflow: 'hidden'
    },
    heading:
    {
        width:'100%',
        height:'50px',
        background:"linear-gradient(90deg, hsla(321, 41%, 24%, 1)0%, hsla(330, 53%, 77%, 1)100%)",
        borderTopLeftRadius:'5px',
        borderTopRightRadius:'5px'
    },
    titleStyle:
    {
        fontWeight:'bold',
        fontSize:'24px',
        color:'#fff',
     
    },
    subTitleStyle:
    {
        fontWeight:'700',
        fontSize:'16px',
        color:'#fff',
       
    },
    titleBox:
    {
        display:'flex',
        justifyContent:'center', 
        flexDirection:'column', 
        width:'40%', 
        padding:'10px'
    }
}))





export default function DeliveryboyInterface()
{


    const classes=useStyle()

    const [branchIdList,setBranchIdList]=useState([])
    const [cityList,setCityList]=useState([])
    const [stateList,setStateList]=useState([])

    const [branchId,setBranchId]=useState('')
    const [deliveryName,setDeliveryName]=useState('')
    const [dob,setDob]=useState(null)
    const [gender,setGender]=useState('')
    const [mobileNo,setMobileNo]=useState('')
    const [emailId,setEmailId]=useState('')
    const [address,setAddress]=useState('')
    const [city,setCity]=useState('')
    const [state,setState]=useState('')
    const [aadharNo,setAadharNo]=useState('')
    const [status,setStatus]=useState('')
    const [vehicleNo,setVehicleNo]=useState('')
    const [photograph,setPhotograph]=useState({bytes:'',fileName:delivery})
    const [password,setPassword]=useState('')

    const[error,setError]=useState({fileError:null})



    const fetchBranch=async()=>{
        var response=await getData('branch/fetch_all_branch')
        setBranchIdList(response.data)

    }


    const fetchCity=async(sid)=>{
        var response=await postData('statecity/fetch_cities',{stateid:sid})
        setCityList(response.data)

    }


    const fetchState=async()=>{
        var response=await getData('statecity/fetch_states')
        setStateList(response.data)

    }


    useEffect(function(){
        fetchBranch()
        fetchState()
    },[])



    const fillBranch=()=>{
         return branchIdList.map((item)=>{
            return ( <MenuItem value={item.branchid}> {item.branchname} </MenuItem> )
         })
    }


    const fillState=()=>{
        return stateList.map((item)=>{
            return ( <MenuItem value={item.stateid}>{item.statename}</MenuItem> )
        })
    }


    const fillCity=()=>{
        return cityList.map((item)=>{
            return ( <MenuItem value={item.cityid}>{item.cityname}</MenuItem> )
        })
    }


    const handleError=(label,message)=>{
        setError((prev)=>({...prev,[label]:message}))
    }


    const handleStateChange=(e)=>{
        setState(e.target.value)
        fetchCity(e.target.value)
    }



    const clearValues=()=>{
            setBranchId('')
            setDeliveryName('')
            setDob('')
            setGender('')
            setMobileNo('')
            setEmailId('')
            setAddress('')
            setCity('')
            setState('')
            setAadharNo('')
            setStatus('')
            setVehicleNo('')
            setPhotograph({bytes:'',fileName:delivery})
            setPassword('')

        }
    




        const validation=()=>{
        var isError=false


        
        if(branchId.length===0)
        {
            setError((prev)=>({...prev,'branchId':'Branch Name is required.'}))
            isError=true
        }
        if(deliveryName.length===0)
        {
            setError((prev)=>({...prev,'deliveryName':'Delivery Name is required.'}))
            isError=true
        }if(!dob)
        {
            setError((prev)=>({...prev,'dob':'DOB is required.'}))
            isError=true
        }if(gender.length===0)
        {
            setError((prev)=>({...prev,'gender':'Gender is required.'}))
            isError=true
        }if(mobileNo.length===0)
        {
            setError((prev)=>({...prev,'mobileNo':'Mobile No. is required.'}))
            isError=true
        }if(emailId.length===0)
        {
            setError((prev)=>({...prev,'emailId':'Email Id is required.'}))
            isError=true
        }if(address.length===0)
        {
            setError((prev)=>({...prev,'address':'Address is required.'}))
            isError=true
        }
        if(city.length===0)
        {
            setError((prev)=>({...prev,'city':'City is required.'}))
            isError=true
        }if(state.length===0)
        {
            setError((prev)=>({...prev,'state':'State is required.'}))
            isError=true
        }
        if(aadharNo.length===0)
        {
            setError((prev)=>({...prev,'aadharNo':'Aadhar Number is required.'}))
            isError=true
        }
        if(status.length===0)
        {
            setError((prev)=>({...prev,'status':'Status is required.'}))
            isError=true
        }if(vehicleNo.length===0)
        {
            setError((prev)=>({...prev,'vehicleNo':'Vehicle No. is required.'}))
            isError=true
        }if(photograph.bytes.length===0)
        {
            setError((prev)=>({...prev,'photograph':'Photograph is required.'}))
            isError=true
        }
        if(password.length===0)
        {
            setError((prev)=>({...prev,'password':'Password is required.'}))
            isError=true
        }
        return isError
    }



    const handleClick=async()=>{
        var err=validation()

        if(err===false)
        {
            var formData=new FormData()
            formData.append('branchid',branchId)
            formData.append('deliveryname',deliveryName)
            formData.append('dob',dob ? dob.toISOString().split('T')[0] : '');
            formData.append('gender',gender)
            formData.append('mobileno',mobileNo)
            formData.append('emailid',emailId)
            formData.append('address',address)
            formData.append('city',city)
            formData.append('state',state)
            formData.append('aadharno',aadharNo)
            formData.append('status',status)
            formData.append('vehicleno',vehicleNo)
            formData.append('photograph',photograph.bytes)
            formData.append('password',password)
            formData.append('createddate',getDate())
            formData.append('createdtime',getTime())
            formData.append('userid','xxxx')
 
            var response=await postData('deliveryboy/submit_deliveryboy',formData)

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

        
    }



    const handleChange=(e)=>{
        setPhotograph({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
        setError((prev)=>({...prev,'fileError':null}))
    }


    return(
        <div className={classes.root} >
            <div className={classes.box} >
                <Grid container spacing={1} >
                    <Grid size={12} >
                        <div className={classes.heading} >
                            <div className={classes.titleBox}>
                                <div className={classes.subTitleStyle} >Add New Deliveryboy</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 0px 5px'}}>
                        <FormControl fullWidth  >
                            <InputLabel>Branch Name</InputLabel>
                                <Select label="Branch Name" value={branchId} onChange={(e)=>setBranchId(e.target.value)} >
                                    <MenuItem>-Select Branch-</MenuItem>
                                    {fillBranch()}
                                </Select> 
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setDeliveryName(e.target.value)} label='Delivery Name' value={deliveryName} fullWidth helperText={error?.deliveryName} error={error?.deliveryName} onFocus={()=>handleError('deliveryName',null)} />
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 0px 5px'}}>
                            <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker label="Date of Birth" value={dob} onChange={(newValue)=>{setDob(newValue)}} renderInput={(params) => (
                                             <TextField {...params} error={Boolean(error?.dob)} helperText={error?.dob} onFocus={() => handleError('dob', null)} /> )} />
                                        </LocalizationProvider>
                                    </FormControl>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 0px 5px'}}>
                            {/*<TextField onChange={(e)=>setGender(e.target.value)} fullWidth size="small" label='Gender' helperText={error?.gender} error={error?.gender} onFocus={()=>handleError('gender',null)} />*/}
                            <FormControl fullWidth>
                                <FormLabel>Gender</FormLabel>
                                    <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)} >
                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setMobileNo(e.target.value)} label='Mobile Number' value={mobileNo} fullWidth helperText={error?.mobileNo} error={error?.mobileNo} onFocus={()=>handleError('mobileNo',null)} />
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setEmailId(e.target.value)} label='Email ID' value={emailId} fullWidth helperText={error?.emailId} error={error?.emailId} onFocus={()=>handleError('emailId',null)} />
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <FormControl fullWidth  >
                            <InputLabel>State</InputLabel>
                                <Select label="State" value={state} onChange={handleStateChange} >
                                    <MenuItem>-Select State-</MenuItem>
                                    {fillState()}
                                </Select> 
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <FormControl fullWidth  >
                            <InputLabel>City</InputLabel>
                                <Select label="City" value={city} onChange={(e)=>setCity(e.target.value)} >
                                    <MenuItem>-Select City-</MenuItem>
                                    {fillCity()}
                                </Select> 
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setAddress(e.target.value)} label='Address' value={address} fullWidth helperText={error?.address} error={error?.address} onFocus={()=>handleError('address',null)} />
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setAadharNo(e.target.value)} label='Aadhar Number' value={aadharNo} fullWidth helperText={error?.aadharNo} error={error?.aadharNo} onFocus={()=>handleError('aadharNo',null)} />
                        </div>
                    </Grid>
                     <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                    <Select label="Status" value={status} onChange={(e)=>setStatus(e.target.value)} >
                                        <MenuItem>-Select Food Status-</MenuItem>
                                        <MenuItem value="Available" >Available</MenuItem>
                                        <MenuItem value="Unavailable" >Unavailable</MenuItem>
                                    </Select>
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setVehicleNo(e.target.value)} label='Vehicle Number' value={vehicleNo} fullWidth helperText={error?.vehicleNo} error={error?.vehicleNo} onFocus={()=>handleError('vehicleNo',null)} />
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setPassword(e.target.value)} label='Password' value={password} fullWidth helperText={error?.password} error={error?.password} onFocus={()=>handleError('password',null)} />
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 0px 5px',display:'flex', justifyContent:'center'}}>
                        <img src={photograph.fileName} alt="photograph"  style={{width:'40px'}} />
                        </div>
                        <div style={{color:'#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif",fontWeight: '400',fontSize: '0.75rem',lineHight: '1.66'}} >{error?.fileError==null?'':error.fileError}</div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <IconButton style={{color:'hsla(321, 32%, 37%, 1.00)', display:'flex', flexDirection:'column', alignItems:'center'}} component='label'>
                            <CloudUploadIcon style={{fontSize:34}} />
                            <div style={{fontSize:12}} >Upload</div>
                        <input onChange={handleChange} type="file" hidden multiple />
                        </IconButton>
                        </div>
                    </Grid>
                    <Grid size={1.5}>
                        <div style={{padding:'0px 5px 0px 5px',display:'flex',justifyContent:'center'}}>
                        <IconButton onClick={handleClick} style={{color:'hsla(321, 32%, 37%, 1.00', display:'flex',flexDirection:'column'}} >
                            <SaveIcon style={{fontSize:34}} />
                            <div style={{fontSize:12}}>Save</div>
                        </IconButton>
                        </div>
                    </Grid>
                    <Grid size={1.5}>
                        <div style={{padding:'0px 5px 0px 5px',display:'flex',justifyContent:'center'}}>
                        <IconButton style={{color:'hsla(321, 32%, 37%, 1.00', display:'flex', flexDirection:'column'}} onClick={clearValues}>
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