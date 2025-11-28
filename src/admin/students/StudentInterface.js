import { Grid, TextField, Select, FormControl, InputLabel, MenuItem, IconButton, Radio, FormControlLabel, FormLabel, RadioGroup } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { getDate,getTime,postData,getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useEffect } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import student from '../../assets/student.png'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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




export default function StudentInterface()
{

    var classes=useStyle()


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
    const [studentPicture,setStudentPicture]=useState({bytes:'',fileName:student})

    const [error,setError]=useState({fileError:null})




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
            setError((prev)=>({...prev,'parmanentPincode':'Parmanent City is required.'}))
            isError=true
        }
        if(aadharNo.length===0)
        {
            setError((prev)=>({...prev,'aadharNo':'Aadhar Number is required.'}))
            isError=true
        }if(studentPicture.bytes.length===0)
        {
            setError((prev)=>({...prev,'studentPicture':'Student Picture City is required.'}))
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
                var formData=new FormData()
                formData.append('enrollmentno',enrollmentNo)
                formData.append('branchid',branchId)
                formData.append('batchid',batchId)
                formData.append('sectionid',sectionId)
                formData.append('studentname',studentName)
                formData.append('dob', dob ? dob.toISOString().split('T')[0] : '');
                formData.append('gender',gender)
                formData.append('fathername',fatherName)
                formData.append('mothername',motherName)
                formData.append('emailid',emailId)
                formData.append('mobileno',mobileNo)
                formData.append('fathercontactno',fatherContactNo)
                formData.append('mothercontactno',motherContactNo)
                formData.append('current_address',currentAddress)
                formData.append('current_state',currentState)
                formData.append('current_city',currentCity)
                formData.append('current_pincode',currentPincode)
                formData.append('parmanent_address',parmanentAddress)
                formData.append('parmanent_state',parmanentState)
                formData.append('parmanent_city',parmanentCity)
                formData.append('parmanent_pincode',parmanentPincode)
                formData.append('aadharno',aadharNo)
                formData.append('student_picture',studentPicture.bytes)
                formData.append('createddate',getDate())
                formData.append('createdtime',getTime())
                formData.append('userid','xxxxx')
    
            var response=await postData('students/submit_student',formData)
            var body={enrollmentno:response.enrollmentno, points:0}
                response=await postData('students/submit_student_wallet',body)
            if(response.status)
            {
                Swal.fire({
                position: "center",
                icon: "success",
                title: `${response.message}\n Enrollment NO:${response.enrollmentno}\n Points:0`,
                showConfirmButton: false,
                timer: 3000,
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
            console.log("📁 File selected:", e.target.files[0])
            setStudentPicture({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
            setError((prev)=>({...prev,'fileError':null}))
        }
    




    return(
            <div>
                <div className={classes.root} >
                   <div className={classes.box} >
                        <div className={classes.heading} >
                            <div className={classes.titleBox} >
                                 <div className={classes.subTitleStyle} >Add New Student</div>
                            </div>
                        </div>
                        <Grid container spacing={1}>
                            <Grid size={3}>
                                <div style={{padding:'10px 5px 0px 5px'}}>
                                <TextField onChange={(e)=>setEnrollmentNo(e.target.value)} fullWidth label='Enrollment No' helperText={error?.enrollmentNo} error={error?.enrollmentNo} onFocus={()=>handleError('enrollmentNo',null)} />
                                </div>
                            </Grid>
                            <Grid size={3}>
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
                            <Grid size={3}>
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
                            <Grid size={3}>
                                <div style={{padding:'10px 5px 0px 5px'}}>
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
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                <TextField onChange={(e)=>setStudentName(e.target.value)} fullWidth label='Student Name' helperText={error?.studentName} error={error?.studentName} onFocus={()=>handleError('studentName',null)} />
                                </div>
                            </Grid>
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker label="Date of Birth" value={dob} onChange={(newValue)=>{setDob(newValue)}} renderInput={(params) => (
                                             <TextField {...params} error={Boolean(error?.dob)} helperText={error?.dob} onFocus={() => handleError('dob', null)} /> )} />
                                        </LocalizationProvider>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid size={3}>
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
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setFatherName(e.target.value)} fullWidth label='Father Name' helperText={error?.fatherName} error={error?.fatherName} onFocus={()=>handleError('fatherName',null)} />
                                </div>
                            </Grid>
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setMotherName(e.target.value)} fullWidth label='Mother Name' helperText={error?.motherName} error={error?.motherName} onFocus={()=>handleError('motherName',null)} />
                                </div>
                            </Grid>
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setEmailId(e.target.value)} fullWidth label='EmailId' helperText={error?.emailId} error={error?.emailId} onFocus={()=>handleError('emailId',null)} />
                                </div>
                            </Grid>
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setMobileNo(e.target.value)} fullWidth label='Mobile No' helperText={error?.mobileNo} error={error?.mobileNo} onFocus={()=>handleError('mobileNo',null)} />
                                </div>
                            </Grid>
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setFatherContactNo(e.target.value)} fullWidth label='Father Contact No' helperText={error?.fatherContactNo} error={error?.fatherContactNo} onFocus={()=>handleError('fatherContactNo',null)} />
                                </div>
                            </Grid>
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setMotherContactNo(e.target.value)} fullWidth label='Mother Contact No' helperText={error?.motherContactNo} error={error?.motherContactNo} onFocus={()=>handleError('motherContactNo',null)} />
                                </div>
                            </Grid>
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setCurrentAddress(e.target.value)} fullWidth label='Current Address' helperText={error?.currentAddress} error={error?.currentAddress} onFocus={()=>handleError('currentAddress',null)} />
                                </div>
                            </Grid>
                            <Grid size={3}>
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
                            <Grid size={3}>
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
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setCurrentPincode(e.target.value)} fullWidth label='Current Pincode' helperText={error?.currentPincode} error={error?.currentPincode} onFocus={()=>handleError('currentPincode',null)} />
                                </div>
                            </Grid>
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setParmanentAddress(e.target.value)} fullWidth label='Permanent Address' helperText={error?.parmanentAddress} error={error?.parmanentAddress} onFocus={()=>handleError('parmanentAddress',null)} />
                                </div>
                            </Grid>
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    {/*<TextField onChange={(e)=>setParmanentState(e.target.value)} fullWidth label='Parmanent State' helperText={error?.parmanentState} error={error?.parmanentState} onFocus={()=>handleError('parmanentState',null)} />*/}
                                    <FormControl fullWidth >
                                        <InputLabel>Permanent State</InputLabel>
                                            <Select label="Permanent State" value={parmanentState} onChange={handleParmanentStateChange} >
                                                <MenuItem>-Select State-</MenuItem>
                                                 {fillParmanentState()}    
                                            </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 6px 5px'}}>
                                    {/*<TextField onChange={(e)=>setParmanentCity(e.target.value)} fullWidth label='Parmanent City' helperText={error?.parmanentCity} error={error?.parmanentCity} onFocus={()=>handleError('parmanentCity',null)} />*/}
                                        <FormControl fullWidth >
                                        <InputLabel>Permanent City</InputLabel>
                                            <Select label="Permanent City" value={parmanentCity} onChange={(e)=>setParmanentCity(e.target.value)} >
                                                <MenuItem>-Select City-</MenuItem>
                                                 {fillParmanentCity()}    
                                            </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 6px 5px'}}>
                                    <TextField onChange={(e)=>setParmanentPincode(e.target.value)} fullWidth label='Permanent Pincode' helperText={error?.parmanentPincode} error={error?.parmanentPincode} onFocus={()=>handleError('parmanentPincode',null)} />
                                </div>
                            </Grid>
                            <Grid size={3}>
                                <div style={{padding:'0px 5px 6px 5px'}}>
                                    <TextField onChange={(e)=>setAadharNo(e.target.value)} fullWidth label='Aadhar Number' helperText={error?.aadharNo} error={error?.aadharNo} onFocus={()=>handleError('aadharNo',null)} />
                                </div>
                            </Grid>
                            <Grid size={3}>
                                    <div style={{padding:'14px 5px 0px 5px',display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        <img src={studentPicture.fileName} alt="Student Pic"  style={{width:40}} />
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
                            <Grid size={6}>
                                <div style={{padding:'0px 5px 0px 5px',display:'flex',justifyContent:'center'}}>
                                <IconButton onClick={handleClick} style={{color:'hsla(321, 32%, 37%, 1.00', display:'flex',flexDirection:'column'}} >
                                    <SaveIcon style={{fontSize:34}} />
                                    <div style={{fontSize:12}}>Save</div>
                                </IconButton>
                                </div>
                            </Grid>
                            <Grid size={6}>
                                <div style={{padding:'0px 5px 5px 5px',display:'flex',justifyContent:'center'}}>
                                <IconButton style={{color:'hsla(321, 32%, 37%, 1.00', display:'flex', flexDirection:'column'}} >
                                    <DeleteForeverIcon style={{fontSize:34}} />
                                    <div style={{fontSize:12}}>Clear</div>
                                </IconButton>
                                </div>
                            </Grid>
                            </Grid>
                    </div>
                </div>
           </div>
            
    )
} 