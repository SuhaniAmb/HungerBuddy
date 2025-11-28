import { Grid, Button, TextField, Select, FormControl, InputLabel, MenuItem, IconButton, Radio, FormControlLabel, FormLabel, RadioGroup, Dialog, DialogContent } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { getDate,getTime,postData,getData, serverURL } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useEffect } from "react";
import delivery from '../../assets/delivery.png'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MaterialTable from "@material-table/core";
import EditIconComponent from "../../components/EditIconComponent";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";




const useStyle=makeStyles((theme)=>({

    root:
    {
        display:'flex',
        justifyContent:'center',
        width:'auto',
        height:'100%'
    },
    box:
    {
        width:'80%',
        height:'auto',
        padding:10
    },
    heading:
    {
        width:'100%',
        height:'auto',
        background:"linear-gradient(90deg, hsla(321, 41%, 24%, 1)0%, hsla(330, 53%, 77%, 1)100%)",
        borderTopLeftRadius:'5px',
        borderTopRightRadius:'5px',
        display:'flex',
        flexDirection:'row'
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
        width:'30%', 
        padding:'10px'
    }
}))






export default function DisplayDeliveryboy()
{
 
    const classes=useStyle('')
    const [deliveryboyList,setDeliveryList]=useState([])
    const [open,setOpen]=useState('')
    const navigate=useNavigate()



    /*********************Edit************************************************/




    const [branchIdList,setBranchIdList]=useState([])
    const [cityList,setCityList]=useState([])
    const [stateList,setStateList]=useState([])

    const [deliveryId,setDeliveryId]=useState('')
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

    const [error,setError]=useState({fileError:null})

    const [dialogState,setDialogState]=useState('') 
    const [statusButton,setStatusButton]=useState(false) 
    const [tempImage,setTempImage]=useState('') 




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
            var body={
                'branchid':branchId, 
                'deliveryname':deliveryName, 
                'dob':dob ? dob.toISOString().split('T')[0] : '',
                'gender':gender,
                'mobileno':mobileNo,
                'emailid':emailId,
                'address':address,
                'city':city,
                'state':state,
                'aadharno':aadharNo,
                'status':status,
                'vehicleno':vehicleNo,
                'password':password,
                'createddate':getDate(),
                'createdtime':getTime(),
                'userid':'xxxx',
                'delivery_id':deliveryId
            }
 
            var response=await postData('deliveryboy/edit_deliveryboy',body)

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
                           setOpen(false)
                           FetchAllDelivery()
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
        setStatusButton(true)
    }





    const showPictureInterface=()=>{
            return(
                
                <div style={{display:'flex',justifyContent:'center', padding:'20px'}} >
                    <Grid container spacing={2} >
                        <Grid size={12} >
                            <div className={classes.heading} >
                                <div className={classes.titleBox}>
                                    <div className={classes.titleStyle} >HungerBuddy</div>
                                    <div className={classes.subTitleStyle} >Edit Picture</div>
                                </div>  
                                <div style={{marginLeft:'auto'}} >
                                    <IconButton onClick={handleCloseDialog}>
                                        <CloseIcon style={{color:'#fff'}} />
                                    </IconButton>
                                </div>
                            </div>
                        </Grid>
                        <Grid size={6}>
                            <img src={photograph.fileName} alt="Category Icon"  style={{width:100,borderRadius:'10px'}} />
                        </Grid>
                        <Grid size={6} style={{display:'flex',alignItems:'center'}} >
                            { statusButton?saveCancelButton():<></> }
                        </Grid>
                        <Grid size={12}>
                            <div style={{padding:'0px 5px 0px 5px'}}>
                                <Button style={{background:'hsla(321, 32%, 37%, 1.00)'}} endIcon={<CloudUploadIcon />} component='label' variant="contained" fullWidth>
                                    Change Image
                                <input onChange={handleChange} type="file" hidden multiple />
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
        }
    


    const showDeliveryInterface=()=>{
    return(
        
                <Grid container spacing={1} >
                    <Grid size={12} >
                        <div className={classes.heading} >
                            <div className={classes.titleBox}>
                                    <div className={classes.titleStyle} >HungerBuddy</div>
                                <div className={classes.subTitleStyle} >Edit Deliveryboy</div>
                            </div>
                            <div style={{marginLeft:'auto'}} >
                                <IconButton onClick={handleCloseDialog}>
                                    <CloseIcon style={{color:'#fff'}} />
                                </IconButton>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={6}>
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
                    <Grid size={6}>
                        <div style={{padding:'10px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setDeliveryName(e.target.value)} label='Delivery Name' value={deliveryName} fullWidth helperText={error?.deliveryName} error={error?.deliveryName} onFocus={()=>handleError('deliveryName',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker label="Date of Birth" value={dob} onChange={(newValue)=>{setDob(newValue)}} renderInput={(params) => (
                                    <TextField {...params} error={Boolean(error?.dob)} helperText={error?.dob} onFocus={() => handleError('dob', null)} /> )} />
                                 </LocalizationProvider>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
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
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setMobileNo(e.target.value)} label='Mobile Number' value={mobileNo} fullWidth helperText={error?.mobileNo} error={error?.mobileNo} onFocus={()=>handleError('mobileNo',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setEmailId(e.target.value)} label='Email ID' value={emailId} fullWidth helperText={error?.emailId} error={error?.emailId} onFocus={()=>handleError('emailId',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
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
                    <Grid size={6}>
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
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setAddress(e.target.value)} label='Address' value={address} fullWidth helperText={error?.address} error={error?.address} onFocus={()=>handleError('address',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setAadharNo(e.target.value)} label='Aadhar Number' value={aadharNo} fullWidth helperText={error?.aadharNo} error={error?.aadharNo} onFocus={()=>handleError('aadharNo',null)} />
                        </div>
                    </Grid>
                     <Grid size={6}>
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
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setVehicleNo(e.target.value)} label='Vehicle Number' value={vehicleNo} fullWidth helperText={error?.vehicleNo} error={error?.vehicleNo} onFocus={()=>handleError('vehicleNo',null)} />
                        </div>
                    </Grid>
                    <Grid size={12}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setPassword(e.target.value)} label='Password' value={password} fullWidth helperText={error?.password} error={error?.password} onFocus={()=>handleError('password',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px',display:'flex',justifyContent:'center'}}>
                        <Button onClick={handleClick} style={{background:'hsla(321, 32%, 37%, 1.00',width:'100%'}} variant="contained" >Save</Button>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px',display:'flex',justifyContent:'center'}}>
                        <Button style={{background:'hsla(321, 32%, 37%, 1.00',width:'100%'}} variant="contained" onClick={clearValues} >Clear</Button>
                        </div>
                    </Grid>
                </Grid>
           
 
    )

    }



    /**************************************************************************/


    const FetchAllDelivery=async()=>{
        var response=await getData('deliveryboy/fetch_deliveryboy')
        setDeliveryList(response.data)
    }



    useEffect(function(){
        FetchAllDelivery()
    },[])



    const handleOpenDialog=(rowData,status)=>{
        setDialogState(status)
        fetchCity(rowData.state)
        setBranchId(rowData.branchid)
        setDeliveryName(rowData.deliveryname)
        setDob(rowData.dob ? new Date(rowData.dob) : null)
        setGender(rowData.gender)
        setMobileNo(rowData.mobileno)
        setEmailId(rowData.emailid)
        setAddress(rowData.address)
        setCity(rowData.city)
        setState(rowData.state)
        setAadharNo(rowData.aadharno)
        setStatus(rowData.status)
        setVehicleNo(rowData.vehicleno)
        setPhotograph({fileName:`${serverURL}/images/${rowData.photograph}`,bytes:''})
        setTempImage(`${serverURL}/images/${rowData.photograph}`)
        setPassword(rowData.password)
        setDeliveryId(rowData.delivery_id)

        
        setOpen(true)

    }




    const handleCloseDialog=()=>{
        setOpen(false)
    }



    const saveCancelButton=()=>{
        return (
                <div style={{display:'flex',width:'80%', justifyContent:'space-between'}} >
                    <Button onClick={handleEditPicture} style={{background:'hsla(321, 32%, 37%, 1.00)'}} variant="contained" >Save</Button>
                    <Button onClick={handleCancel} style={{background:'hsla(321, 32%, 37%, 1.00)'}} variant="contained" >Cancel</Button>
                </div>
        )
    }



    const handleEditPicture=async()=>{

        var formData=new FormData()
        formData.append('delivery_id',deliveryId)
        formData.append('createddate',getDate())
        formData.append('createdtime',getTime())
        formData.append('userid','xxx')
        formData.append('photograph',photograph.bytes)

        var response=await postData('deliveryboy/edit_picture',formData)
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
                setOpen(false)
                FetchAllDelivery()
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




    const handleCancel=()=>{
        setPhotograph({fileName:tempImage,bytes:''})
        setStatusButton(false)
    }



    const handleDelete=async(deliveryId)=>{
        Swal.fire({
                title: "Do you want to delete the selected Record?",
                showCancelButton: true,
                confirmButtonText: "Delete",
             }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) 
            {
                var response=await postData('deliveryboy/delete_deliveryboy',{delivery_id:deliveryId})
                Swal.fire(response.message);
                FetchAllDelivery()
            } 
            else if (result.isDenied) 
            {
                Swal.fire("Changes are not saved", "", "info");
            }
         });
    }


    const showDialog=()=>{

        return(
            <div>
                <Dialog open={open} onClose={handleCloseDialog}>
                    <DialogContent>
                        { dialogState==='Data'?showDeliveryInterface():showPictureInterface() }
                    </DialogContent>
                </Dialog>
            </div>
        )
    }





    const displayDelivery=()=>{
        return(
            <div>
                <MaterialTable 
                 title='List of Delivery Boy'
                 columns={[
                    {title:'Branch Name', field:'branchname'},
                    {title:'Delivery Name', field:'deliveryname'},
                    {title:'DOB/Gender',render:(rowData)=>(<div style={{ whiteSpace: 'nowrap', lineHeight: '1.4em' }}>{rowData.dob},<br/>{rowData.gender}</div>)},
                    {title:'Mobile No', field:'mobileno'},
                    {title:'Email Id', field:'emailid'},
                    {title:'Address', field:'address'},
                    {title:'Aadhar No', field:'aadharno'},
                    {title:'Status', field:'status'},
                    {title:'Vehicle No', field:'vehicleno'},
                    {title:'Password', field:'password'},
                    {title:'Photograph', render:(rowData)=>( <div onClick={()=>handleOpenDialog(rowData,'Picture')} > <EditIconComponent image={rowData.photograph} /></div>)},


                 ]}
                 
                data={deliveryboyList}
                        actions={[   
                                    {icon:'edit', tooltip:'Edit', onClick:(event,rowData)=>handleOpenDialog(rowData,'Data')},
                                    {icon:'delete', tooltip:'Delete', onClick:(event,rowData)=>handleDelete(rowData.delivery_id)},
                                    {icon:'add', tooltip:'Add Deliveryboy', isFreeAction:true, onClick: (event)=> navigate("/admindashboard/deliveryboyinterface") }
                                ]}
                />
                
            </div>
        )
    }



    return(
         <div className={classes.root} >
            <div className={classes.box} >
                {displayDelivery()}
            </div>
            {showDialog()}
        </div>
    )
}