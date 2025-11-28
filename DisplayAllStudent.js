import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { getData, getDate, getTime, postData, serverURL } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles"
import { Button, Grid, TextField, Select, FormControl, InputLabel, MenuItem, IconButton, Radio, FormControlLabel, FormLabel, RadioGroup, Dialog, DialogContent } from "@mui/material"
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';
import burger from '../../assets/burger.png'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import EditIconComponent from "../../components/EditIconComponent";
import { useNavigate } from "react-router-dom";







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
        margin:'10px',
        padding:'10px'
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




export default function DisplayAllStudent(refresh,setRefresh)
{

    const  classes=useStyle()

    const [studentList,setStudentList]=useState([])

    const [open,setOpen]=useState(false)
    const navigate=useNavigate()


    /*********************************************/

            const [branchIdList,setBranchIdList]=useState([])
            const [batchIdList,setBatchIdList]=useState([])
            const [sectionIdList,setSectionIdList]=useState([])
            const [currentStateList,setCurrentStateList]=useState([])
            const [currentCityList,setCurrentCityList]=useState([])
            const [parmanentStateList,setParmanentStateList]=useState([])
            const [parmanentCityList,setParmanentCityList]=useState([])
        
        
            const [enrollmentNo,setEnrollmentNo]=useState('')
            const [branchId,setBranchId]=useState('')
            const [batchId,setBatchId]=useState('')
            const [sectionId,setSectionId]=useState('')
            const [studentName,setStudentName]=useState('')
            const [dob,setDob]=useState(null)
            const [gender,setGender]=useState('')
            const [fatherName,setFatherName]=useState('')
            const [motherName,setMotherName]=useState('')
            const [emailId,setEmailId]=useState('')
            const [mobileNo,setMobileNo]=useState('')
            const [fatherContactNo,setFatherContactNo]=useState('')
            const [motherContactNo,setMotherContactNo]=useState('')
            const [currentAddress,setCurrentAddress]=useState('')
            const [currentState,setCurrentState]=useState('')
            const [currentCity,setCurrentCity]=useState('')
            const [currentPincode,setCurrentPincode]=useState('')
            const [parmanentAddress,setParmanentAddress]=useState('')
            const [parmanentState,setParmanentState]=useState('')
            const [parmanentCity,setParmanentCity]=useState('')
            const [parmanentPincode,setParmanentPincode]=useState('')
            const [aadharNo,setAadharNo]=useState('')
            const [studentPicture,setStudentPicture]=useState({bytes:'',fileName:burger})

            const [tempImage,setTempImage]=useState('')
            const [dialogState,setDialogState]=useState('')
            const [statusButton,setStatusButton]=useState(false)
            
        
            const [error,setError]=useState({fileError:null})
        



              

            /****************************STUDENT*****************************************/







            const fetchBranch=async()=>{
                        var response=await getData('branch/fetch_all_branch')
                        setBranchIdList(response.data)
                    }
                
                    const fetchBatch=async()=>{
                        var response=await getData('batch/fetch_all_batch')
                        setBatchIdList(response.data)
                    }
                
            
                    const fetchSection=async()=>{
                        var response=await getData('section/fetch_all_section')
                        setSectionIdList(response.data)
                    }
                    
            
                    const fetchCurrentState=async()=>{
                        var response=await getData('statecity/fetch_states')
                        setCurrentStateList(response.data)
                    }
            
            
                    const fetchParmanentState=async()=>{
                        var response=await getData('statecity/fetch_states')
                        setParmanentStateList(response.data)
                    }
            
                    const fetchCurrentCity=async(sid)=>{
                        var response=await postData('statecity/fetch_cities',{stateid:sid})
                        setCurrentCityList(response.data)
                    }
            
            
            
                    const fetchParmanentCity=async(sid)=>{
                        var response=await postData('statecity/fetch_cities',{stateid:sid})
                        setParmanentCityList(response.data)
                    }
                
                
                    useEffect(function(){
                        fetchBranch()
                        fetchBatch()
                        fetchSection()
                        fetchCurrentState()
                        fetchParmanentState()
                    },[])
            
            
                
                    const fillBranch=()=>{
                        return branchIdList.map((item)=>{
                                return( <MenuItem value={item.branchid}> {item.branchname} </MenuItem> )
                        })
                    }
                
                
                    const fillBatch=()=>{
                        return batchIdList.map((item)=>{
                                return( <MenuItem value={item.batchid}> {item.batchname} </MenuItem> )
                        })
                    }
                
            
                    const fillSection=()=>{
                        return sectionIdList.map((item)=>{
                                return( <MenuItem value={item.sectionid}> {item.sectionname} </MenuItem> )
                        })
                    }
            
                    const fillCurrentState=()=>{
                        return currentStateList.map((item)=>{
                                return( <MenuItem value={item.stateid}> {item.statename} </MenuItem> )
                        })
                    }
                    
            
            
                     const fillParmanentState=()=>{
                        return parmanentStateList.map((item)=>{
                                return( <MenuItem value={item.stateid}> {item.statename} </MenuItem> )
                        })
                    }
            
                    
                    const fillCurrentCity=()=>{
                        return currentCityList.map((item)=>{
                                return( <MenuItem value={item.cityid}> {item.cityname} </MenuItem> )
                        })
                    }
            
            
                    const fillParmanentCity=()=>{
                        return parmanentCityList.map((item)=>{
                                return( <MenuItem value={item.cityid}> {item.cityname} </MenuItem> )
                        })
                    }
            
            
            
                    const handleError=(label,message)=>{
                        setError((prev)=>({...prev,[label]:message}))
                    }
            
            
            
                    
                  const handleCurrentStateChange=(e)=>{
                    setCurrentState(e.target.value)
                    fetchCurrentCity(e.target.value)
                  }
            
            
            
                  const handleParmanentStateChange=(e)=>{
                    setParmanentState(e.target.value)
                    fetchParmanentCity(e.target.value)
                  }
                
                
            
                     const validation=()=>{
                    var isError=false
            
            
                    if(enrollmentNo.length===0)
                    { 
                        setError((prev)=>({...prev,'enrollmentNo':'Enrollment No is required.'}))
                        isError=true
                    }
                    if(branchId.length===0)
                    {
                        setError((prev)=>({...prev,'branchId':'Branch Name is required.'}))
                        isError=true
                    }
                    if(batchId.length===0)
                    {
                        setError((prev)=>({...prev,'batchId':'Batch Name is required.'}))
                        isError=true
                    }if(sectionId.length===0)
                    {
                        setError((prev)=>({...prev,'sectionId':'Section Name is required.'}))
                        isError=true
                    }if(studentName.length===0)
                    {
                        setError((prev)=>({...prev,'studentName':'Student Name is required.'}))
                        isError=true
                    }if(!dob)
                    {
                        setError((prev)=>({...prev,'dob':'DOB is required.'}))
                        isError=true
                    }if(gender.length===0)
                    {
                        setError((prev)=>({...prev,'gender':'Gender is required.'}))
                        isError=true
                    }if(fatherName.length===0)
                    {
                        setError((prev)=>({...prev,'fatherName':'Father Name is required.'}))
                        isError=true
                    }if(motherName.length===0)
                    {
                        setError((prev)=>({...prev,'motherName':'Mother Name is required.'}))
                        isError=true
                    }if(emailId.length===0)
                    {
                        setError((prev)=>({...prev,'emailId':'Email Id is required.'}))
                        isError=true
                    }if(mobileNo.length===0)
                    {
                        setError((prev)=>({...prev,'mobileNo':'Mobile No is required.'}))
                        isError=true
                    }if(fatherContactNo.length===0)
                    {
                        setError((prev)=>({...prev,'fatherContactNo':'Father Contact No is required.'}))
                        isError=true
                    }if(motherContactNo.length===0)
                    {
                        setError((prev)=>({...prev,'motherContactNo':'Mother Contact No is required.'}))
                        isError=true
                    }if(currentAddress.length===0)
                    {
                        setError((prev)=>({...prev,'currentAddress':'Current Address is required.'}))
                        isError=true
                    }
                    if(currentAddress.length===0)
                    {
                        setError((prev)=>({...prev,'currentAddress':'Current Address is required.'}))
                        isError=true
                    }if(currentState.length===0)
                    {
                        setError((prev)=>({...prev,'currentState':'Current State is required.'}))
                        isError=true
                    }if(currentCity.length===0)
                    {
                        setError((prev)=>({...prev,'currentCity':'Current City is required.'}))
                        isError=true
                    }if(currentPincode.length===0)
                    {
                        setError((prev)=>({...prev,'currentPincode':'Current Pincode is required.'}))
                        isError=true
                    }if(parmanentAddress.length===0)
                    {
                        setError((prev)=>({...prev,'parmanentAddress':'parmanent Address is required.'}))
                        isError=true
                    }if(parmanentState.length===0)
                    {
                        setError((prev)=>({...prev,'parmanentState':'Parmanent State is required.'}))
                        isError=true
                    }if(parmanentCity.length===0)
                    {
                        setError((prev)=>({...prev,'parmanentCity':'Parmanent State is required.'}))
                        isError=true
                    }if(parmanentPincode.length===0)
                    {
                        setError((prev)=>({...prev,'parmanentPincode':'Parmanent Pincode  is required.'}))
                        isError=true
                    }
                    if(aadharNo.length===0)
                    {
                        setError((prev)=>({...prev,'aadharNo':'Aadhar Number is required.'}))
                        isError=true
                    }
                    return isError
                }
            
            
            
            
                const handleClick= async()=>{
                      console.log("🟢 Submit button clicked"); 
                        var err=validation()
                        console.log("Validation Error:", err)
            
                        if(err===false)
                        {
                            var body={
                                enrollmentno:enrollmentNo, 
                                branchid:branchId,
                                batchid:batchId,
                                sectionid:sectionId,
                                studentname:studentName,
                                dob:dob ? dob.toISOString().split('T')[0] : '' ,
                                gender:gender,
                                fathername:fatherName,
                                mothername:motherName,
                                emailid:emailId,
                                mobileno:mobileNo,
                                fathercontactno:fatherContactNo,
                                mothercontactno:motherContactNo,
                                current_address:currentAddress,
                                current_state:currentState,
                                current_city:currentCity,
                                current_pincode:currentPincode,
                                parmanent_address:parmanentAddress,
                                parmanent_state:parmanentState,
                                parmanent_city:parmanentCity,
                                parmanent_pincode:parmanentPincode,
                                aadharno:aadharNo,
                                createddate:getDate(),
                                createdtime:getTime(),
                                userid:'xxxxx'
                            }
                            
                            
                        console.log('bodyyyyyyyyyyyyyyyyyyy',body)
                
                        var response=await postData('students/edit_student',body)
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
                        FetchAllStudent()
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
                        console.log("📁 File selected:", e.target.files[0])
                        setStudentPicture({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
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
                                                        <img src={studentPicture.fileName} alt="Student"  style={{width:100}} />
                                                    </Grid>
                                                    <Grid size={6} style={{display:'flex',alignItems:'center'}} >
                                                        { statusButton?saveCancelButton():<></> }
                                                    </Grid>
                                                    <Grid size={12}>
                                                        <div style={{padding:'0px 5px 0px 5px'}}>
                                                            <Button style={{background:'hsla(321, 32%, 37%, 1.00)'}} component='label' variant="contained" fullWidth>
                                                                Change Image
                                                            <input onChange={handleChange} type="file" hidden multiple />
                                                            </Button>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        )
                                    } 
                                
            

       
            
       
            const showStudentInterface=()=>{
            return(

            <Grid container spacing={1} >
                <Grid size={12} >
                <div className={classes.heading} >
                    <div className={classes.titleBox} >
                        <div className={classes.titleStyle} >HungerBuddy</div>
                        <div className={classes.subTitleStyle} >Edit Student</div>   
                    </div>
                    <div style={{marginLeft:'auto'}} >
                        <IconButton onClick={handleCloseDialog}>
                            <CloseIcon style={{color:'#fff'}} />
                        </IconButton>
                    </div>
                </div>
                </Grid>
                <Grid size={4}>
                                <div style={{padding:'10px 5px 0px 5px'}}>
                                <TextField onChange={(e)=>setEnrollmentNo(e.target.value)} value={enrollmentNo} fullWidth label='Enrollment No' helperText={error?.enrollmentNo} error={error?.enrollmentNo} onFocus={()=>handleError('enrollmentNo',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'10px 5px 0px 5px'}}>
                                {/*<TextField onChange={(e)=>setBranchId(e.target.value)} fullWidth size="small" label='Branch Name' helperText={error?.branchId} error={error?.branchId} onFocus={()=>handleError('branchId',null)} />*/}
                                <FormControl fullWidth  >
                                    <InputLabel>Branch Name</InputLabel>
                                    <Select label="Branch Name" value={branchId} onChange={(e)=>setBranchId(e.target.value)} >
                                        <MenuItem>-Select Branch-</MenuItem>
                                        {fillBranch()}
                                    </Select> 
                                </FormControl>
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'10px 5px 0px 5px'}}>
                                {/*<TextField onChange={(e)=>setBatchId(e.target.value)} fullWidth size="small" label='Batch Name' helperText={error?.batchId} error={error?.batchId} onFocus={()=>handleError('batchId',null)} />*/}
                                <FormControl fullWidth >
                                    <InputLabel>Batch Name</InputLabel>
                                    <Select label="Batch Name" value={batchId} onChange={(e)=>setBatchId(e.target.value)} >
                                        <MenuItem>-Select Batch-</MenuItem>
                                        {fillBatch()}
                                    </Select>
                                </FormControl>
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                {/*<TextField onChange={(e)=>setsectionId(e.target.value)} fullWidth size="small" label='Section Name' helperText={error?.sectionId} error={error?.sectionId} onFocus={()=>handleError('sectionId',null)} />*/}
                                <FormControl fullWidth >
                                    <InputLabel>Section Name</InputLabel>
                                    <Select label="Section Name" value={sectionId} onChange={(e)=>setSectionId(e.target.value)} >
                                        <MenuItem>-Select Branch-</MenuItem>
                                        {fillSection()}
                                    </Select>
                                </FormControl>
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                <TextField onChange={(e)=>setStudentName(e.target.value)} value={studentName} fullWidth label='Student Name' helperText={error?.studentName} error={error?.studentName} onFocus={()=>handleError('studentName',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker label="Date of Birth" value={dob} onChange={(newValue)=>{setDob(newValue)}} renderInput={(params) => (
                                             <TextField {...params} error={Boolean(error?.dob)} helperText={error?.dob} onFocus={() => handleError('dob', null)} /> )} />
                                        </LocalizationProvider>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid size={4}>
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
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setFatherName(e.target.value)} value={fatherName} fullWidth label='Father Name' helperText={error?.fatherName} error={error?.fatherName} onFocus={()=>handleError('fatherName',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setMotherName(e.target.value)} value={motherName} fullWidth label='Mother Name' helperText={error?.motherName} error={error?.motherName} onFocus={()=>handleError('motherName',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setEmailId(e.target.value)} value={emailId} fullWidth label='EmailId' helperText={error?.emailId} error={error?.emailId} onFocus={()=>handleError('emailId',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setMobileNo(e.target.value)} value={mobileNo} fullWidth label='Mobile No' helperText={error?.mobileNo} error={error?.mobileNo} onFocus={()=>handleError('mobileNo',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setFatherContactNo(e.target.value)} value={fatherContactNo} fullWidth label='Father Contact No' helperText={error?.fatherContactNo} error={error?.fatherContactNo} onFocus={()=>handleError('fatherContactNo',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setMotherContactNo(e.target.value)} value={motherContactNo} fullWidth label='Mother Contact No' helperText={error?.motherContactNo} error={error?.motherContactNo} onFocus={()=>handleError('motherContactNo',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setCurrentAddress(e.target.value)} value={currentAddress} fullWidth label='Current Address' helperText={error?.currentAddress} error={error?.currentAddress} onFocus={()=>handleError('currentAddress',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    {/*<TextField onChange={(e)=>setCurrentState(e.target.value)} fullWidth label='Current State' helperText={error?.currentState} error={error?.currentState} onFocus={()=>handleError('currentState',null)} />*/}
                                    <FormControl fullWidth >
                                        <InputLabel>Current State</InputLabel>
                                            <Select label="Current State" value={currentState} onChange={handleCurrentStateChange} >
                                                <MenuItem>-Select State-</MenuItem>
                                                 {fillCurrentState()}    
                                            </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    {/*<TextField onChange={(e)=>setCurrentCity(e.target.value)} fullWidth label='Current City' helperText={error?.currentCity} error={error?.currentCity} onFocus={()=>handleError('currentCity',null)} />*/}
                                    <FormControl fullWidth >
                                        <InputLabel>Current City</InputLabel>
                                            <Select label="Current City" value={currentCity} onChange={(e)=>setCurrentCity(e.target.value)} >
                                                <MenuItem>-Select City-</MenuItem>
                                                 {fillCurrentCity()}    
                                            </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setCurrentPincode(e.target.value)} value={currentPincode} fullWidth label='Current Pincode' helperText={error?.currentPincode} error={error?.currentPincode} onFocus={()=>handleError('currentPincode',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setParmanentAddress(e.target.value)} value={parmanentAddress} fullWidth label='Parmanent Address' helperText={error?.parmanentAddress} error={error?.parmanentAddress} onFocus={()=>handleError('parmanentAddress',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    {/*<TextField onChange={(e)=>setParmanentState(e.target.value)} fullWidth label='Parmanent State' helperText={error?.parmanentState} error={error?.parmanentState} onFocus={()=>handleError('parmanentState',null)} />*/}
                                    <FormControl fullWidth >
                                        <InputLabel>Parmanent State</InputLabel>
                                            <Select label="Parmanent State" value={parmanentState} onChange={handleParmanentStateChange} >
                                                <MenuItem>-Select State-</MenuItem>
                                                 {fillParmanentState()}    
                                            </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 6px 5px'}}>
                                    {/*<TextField onChange={(e)=>setParmanentCity(e.target.value)} fullWidth label='Parmanent City' helperText={error?.parmanentCity} error={error?.parmanentCity} onFocus={()=>handleError('parmanentCity',null)} />*/}
                                        <FormControl fullWidth >
                                        <InputLabel>Parmanent City</InputLabel>
                                            <Select label="Parmanent City" value={parmanentCity} onChange={(e)=>setParmanentCity(e.target.value)} >
                                                <MenuItem>-Select City-</MenuItem>
                                                 {fillParmanentCity()}    
                                            </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 6px 5px'}}>
                                    <TextField onChange={(e)=>setParmanentPincode(e.target.value)} value={parmanentPincode} fullWidth label='Parmanent Pincode' helperText={error?.parmanentPincode} error={error?.parmanentPincode} onFocus={()=>handleError('parmanentPincode',null)} />
                                </div>
                            </Grid>
                            <Grid size={12}>
                                <div style={{padding:'0px 5px 6px 5px'}}>
                                    <TextField onChange={(e)=>setAadharNo(e.target.value)} value={aadharNo} fullWidth label='Aadhar Number' helperText={error?.aadharNo} error={error?.aadharNo} onFocus={()=>handleError('aadharNo',null)} />
                                </div>
                            </Grid>
                            <Grid size={6}>
                                <div style={{padding:'0px 5px 0px 5px',display:'flex',justifyContent:'center'}}>
                                <Button onClick={handleClick} style={{background:'hsla(321, 32%, 37%, 1.00',width:'50%'}} variant="contained" >Save</Button>
                                </div>
                            </Grid>
                            <Grid size={6}>
                                <div style={{padding:'0px 5px 5px 5px'}}>
                                <Button style={{background:'hsla(321, 32%, 37%, 1.00',width:'50%'}} variant="contained" >Clear</Button>
                                </div>
                            </Grid>
                </Grid>
            )


        }



    /***********************************************/

    
       
        

    const FetchAllStudent=async()=>{
        var response=await getData('students/fetch_all_student')
        console.log("🧾 Student List from API:", response.data)
        setStudentList(response.data)
    }

    useEffect(function(){
    FetchAllStudent()
    },[])



     const handleCancel=()=>{
                setStudentPicture({fileName:tempImage,bytes:''})
                setStatusButton(false)
            }




     const handleEditPicture=async()=>{
                    var formData=new FormData()
                    formData.append('enrollmentno',enrollmentNo)
                    formData.append('createddate',getDate())
                    formData.append('createdtime',getTime())
                    formData.append('userid','xxx')
                    formData.append('student_picture',studentPicture.bytes)        

                    var response=await postData('students/edit_picture',formData)
                                
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
                                    FetchAllStudent()
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
                                
    const saveCancelButton=()=>{
        return <div style={{display:'flex',width:'80%',justifyContent:'space-between'}} >
            <Button onClick={handleEditPicture} style={{background:'hsla(321, 32%, 37%, 1.00)'}} variant="contained" >Save</Button>
            <Button onClick={handleCancel} style={{background:'hsla(321, 32%, 37%, 1.00)'}} variant="contained" >Cancel</Button>
        </div>
       }
    

                                







    const handleOpenDialog=(rowData,status)=>{

        setDialogState(status)
        setEnrollmentNo(rowData.enrollmentno)
        setBranchId(rowData.branchid)
        setBatchId(rowData.batchid)
        setSectionId(rowData.sectionid)
        setStudentName(rowData.studentname)
        setDob(rowData.dob ? new Date(rowData.dob) : null)
        setGender(rowData.gender)
        setFatherName(rowData.fathername)
        setMotherName(rowData.mothername)
        setEmailId(rowData.emailid)
        setMobileNo(rowData.mobileno)
        setFatherContactNo(rowData.fathercontactno)
        setMotherContactNo(rowData.mothercontactno)
        setCurrentAddress(rowData.current_address)
        setCurrentState(rowData.current_state)
        fetchCurrentCity(rowData.current_state)

        setCurrentCity(rowData.current_city)
        setCurrentPincode(rowData.current_pincode)
        setParmanentAddress(rowData.parmanent_address)
        setParmanentState(rowData.parmanent_state)
        fetchParmanentCity(rowData.parmanent_state)

        setParmanentCity(rowData.parmanent_city)
        setParmanentPincode(rowData.parmanent_pincode)
        setAadharNo(rowData.aadharno)

        setStudentPicture({fileName:`${serverURL}/images/${rowData.student_picture}`,bytes:''})
        setTempImage(`${serverURL}/images/${rowData.student_picture}`)
        
        setOpen(true)
    }


    const handleCloseDialog=()=>{
        setOpen(false)
    }

    

    const showDialog=()=>{
                return(
                    <div>
                        <Dialog open={open} onClose={handleCloseDialog} >
                            <DialogContent>
                           {dialogState==='Data'?showStudentInterface():showPictureInterface()}
                            </DialogContent>
                        </Dialog>
                    </div>
                )
            }
    









    const handleDelete=async(enrollmentNo)=>{

        
        Swal.fire({
            title: "Do you want to delete the selected Student?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) 
                {
                    var response=await postData('students/delete_student',{enrollmentno:enrollmentNo})
                    Swal.fire(response.message);
                    FetchAllStudent()
                } 
                else if (result.isDenied) 
                {
                    Swal.fire("Changes are not saved", "", "info");
                }
             });

    }


    const displayStudent=()=>{

     return(
        <div>
            <MaterialTable
            title='List Of Food Students'
            columns={[
                        {title:'Enrollment No',field:'enrollmentno'},
                        {title:'Student Name',field:'studentname'},
                        {title:'DOB/Gender',render:(rowData)=>(<div style={{ whiteSpace: 'nowrap', lineHeight: '1.4em' }}>{rowData.dob},<br/>{rowData.gender}</div>)},
                        {title:'Email Id',field:'emailid'},
                        {title:'Mobile Number',field:'mobileno'},
                        {title:'Aadhar No.',field:'aadharno'},
                        {title:'Student Picture', render:(rowData)=> (<div onClick={()=>handleOpenDialog(rowData,"Picture")} > <EditIconComponent image={rowData.student_picture} /></div>)}
                     ]}
                     
                     data={studentList}
                     actions={[
                                {icon:'edit', tooltip:'Edit', onClick:(event,rowData)=>handleOpenDialog(rowData,'Data')},
                                {icon:'delete', tooltip:'Delete', onClick:(event,rowData)=>handleDelete(rowData.enrollmentno)},
                                {icon:'add', tooltip:'Add Students', isFreeAction:true, onClick: (event)=> navigate("/admindashboard/studentinterface") }
                             ]}
            />
        </div>
    )
}

    return(

        <div className={classes.root} >
            <div className={classes.box} >
                {displayStudent()}
            </div>
            {showDialog()}
        </div>

    )
}