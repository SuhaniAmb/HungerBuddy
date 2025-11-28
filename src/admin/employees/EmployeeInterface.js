import { Grid, TextField, Select, FormControl, InputLabel, MenuItem, IconButton, Radio, FormControlLabel, FormLabel, RadioGroup } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { getDate,getTime,postData,getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useEffect } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import employee from '../../assets/employee.png'
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




export default function EmployeeInterface()
{

    var classes=useStyle()


    const [branchIdList,setBranchIdList]=useState([])
    const [currentStateList,setCurrentStateList]=useState([])
    const [currentCityList,setCurrentCityList]=useState([])
    const [parmanentStateList,setParmanentStateList]=useState([])
    const [parmanentCityList,setParmanentCityList]=useState([])

    const [branchId,setBranchId]=useState('')
    const [employeeName,setEmployeeName]=useState('')
    const [dob,setDob]=useState(null)
    const [gender,setGender]=useState('')
    const [emailId,setEmailId]=useState('')
    const [mobileNo,setMobileNo]=useState('')
    const [otherNo,setOtherNo]=useState('')
    const [department,setDepartment]=useState('')
    const [currentAddress,setCurrentAddress]=useState('')
    const [currentState,setCurrentState]=useState('')
    const [currentCity,setCurrentCity]=useState('')
    const [currentPincode,setCurrentPincode]=useState('')
    const [parmanentAddress,setParmanentAddress]=useState('')
    const [parmanentState,setParmanentState]=useState('')
    const [parmanentCity,setParmanentCity]=useState('')
    const [parmanentPincode,setParmanentPincode]=useState('')
    const [aadharNo,setAadharNo]=useState('')
    const [employeePicture,setEmployeePicture]=useState({bytes:'',fileName:employee})

    const [error,setError]=useState({fileError:null})




    const fetchBranch=async()=>{
            var response=await getData('branch/fetch_all_branch')
            setBranchIdList(response.data)
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
            fetchCurrentState()
            fetchParmanentCity()
            fetchParmanentState()
        },[])
    
    
        const fillBranch=()=>{
            return branchIdList.map((item)=>{
                    return( <MenuItem value={item.branchid}> {item.branchname} </MenuItem> )
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


        
        if(branchId.length===0)
        {
            setError((prev)=>({...prev,'branchId':'Branch Name is required.'}))
            isError=true
        }
        if(employeeName.length===0)
        {
            setError((prev)=>({...prev,'employeeName':'Employee Name is required.'}))
            isError=true
        }if(!dob)
        {
            setError((prev)=>({...prev,'dob':'DOB is required.'}))
            isError=true
        }if(gender.length===0)
        {
            setError((prev)=>({...prev,'gender':'Gender is required.'}))
            isError=true
        }if(emailId.length===0)
        {
            setError((prev)=>({...prev,'emailId':'Email Id is required.'}))
            isError=true
        }if(mobileNo.length===0)
        {
            setError((prev)=>({...prev,'mobileNo':'Mobile No is required.'}))
            isError=true
        }if(otherNo.length===0)
        {
            setError((prev)=>({...prev,'otherNo':'Other Contact No is required.'}))
            isError=true
        }
        if(department.length===0)
        {
            setError((prev)=>({...prev,'department':'Department Address is required.'}))
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
        }if(employeePicture.bytes.length===0)
        {
            setError((prev)=>({...prev,'employeePicture':'Employee Picture City is required.'}))
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
                formData.append('branchid',branchId)
                formData.append('employeename',employeeName)
                formData.append('dob', dob ? dob.toISOString().split('T')[0] : '');
                formData.append('gender',gender)
                formData.append('emailid',emailId)
                formData.append('mobileno',mobileNo)
                formData.append('otherno',otherNo)
                formData.append('department',department)
                formData.append('current_address',currentAddress)
                formData.append('current_state',currentState)
                formData.append('current_city',currentCity)
                formData.append('current_pincode',currentPincode)
                formData.append('parmanent_address',parmanentAddress)
                formData.append('parmanent_state',parmanentState)
                formData.append('parmanent_city',parmanentCity)
                formData.append('parmanent_pincode',parmanentPincode)
                formData.append('aadharno',aadharNo)
                formData.append('employee_picture',employeePicture.bytes)
                formData.append('createddate',getDate())
                formData.append('createdtime',getTime())
                formData.append('userid','xxxxx')
    
                var response=await postData('employees/submit_employee',formData)
                var body = {employeeid:response.employeeid, points: 0}
                response = await postData("employees/submit_employee_wallet", body);
                       

            if(response.status)
            {

                Swal.fire({
                position: "center",
                icon: "success",
                title: `${response.message}\nEmployee ID: ${response.employeeid}\nPoints: 0`,
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
            setEmployeePicture({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
            setError((prev)=>({...prev,'fileError':null}))
        }
    




    return(
            <div>
                <div className={classes.root} >
                   <div className={classes.box} >
                        <div className={classes.heading} >
                            <div className={classes.titleBox} >
                                 <div className={classes.subTitleStyle} >Add New Employee</div>
                            </div>
                        </div>
                        <Grid container spacing={1}>
                            
                            <Grid size={4}>
                                <div style={{padding:'10px 5px 0px 5px'}}>
                                {/*<TextField onChange={(e)=>setBranchId(e.target.value)} fullWidth size="small" label='Branch Name' helperText={error?.branchId} error={error?.branchId} onFocus={()=>handleError('branchId',null)} />*/}
                                <FormControl fullWidth >
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
                                <TextField onChange={(e)=>setEmployeeName(e.target.value)} fullWidth label='Employee Name' helperText={error?.employeeName} error={error?.employeeName} onFocus={()=>handleError('employeeName',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'10px 5px 0px 5px'}}>
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
                                    <TextField onChange={(e)=>setEmailId(e.target.value)} fullWidth label='EmailId' helperText={error?.emailId} error={error?.emailId} onFocus={()=>handleError('emailId',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setMobileNo(e.target.value)} fullWidth label='Mobile No' helperText={error?.mobileNo} error={error?.mobileNo} onFocus={()=>handleError('mobileNo',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setOtherNo(e.target.value)} fullWidth label='Other No' helperText={error?.otherNo} error={error?.otherNo} onFocus={()=>handleError('otherNo',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    {/*<TextField onChange={(e)=>setDepartment(e.target.value)} fullWidth label='Department' helperText={error?.department} error={error?.department} onFocus={()=>handleError('department',null)} />*/}
                                    <FormControl fullWidth >
                                        <InputLabel>Department</InputLabel>
                                            <Select label="Department" value={department} onChange={(e)=>setDepartment(e.target.value)} >
                                                <MenuItem>-Select Department-</MenuItem>
                                                <MenuItem value='Admin' >Admin</MenuItem>
                                                <MenuItem value='Feculties' >Feculties</MenuItem>
                                                <MenuItem value='Other' >Other</MenuItem>     
                                            </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setCurrentAddress(e.target.value)} fullWidth label='Current Address' helperText={error?.currentAddress} error={error?.currentAddress} onFocus={()=>handleError('currentAddress',null)} />
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
                                    <TextField onChange={(e)=>setCurrentPincode(e.target.value)} fullWidth label='Current Pincode' helperText={error?.currentPincode} error={error?.currentPincode} onFocus={()=>handleError('currentPincode',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 0px 5px'}}>
                                    <TextField onChange={(e)=>setParmanentAddress(e.target.value)} fullWidth label='Permanent Address' helperText={error?.parmanentAddress} error={error?.parmanentAddress} onFocus={()=>handleError('parmanentAddress',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
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
                            <Grid size={4}>
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
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 6px 5px'}}>
                                    <TextField onChange={(e)=>setParmanentPincode(e.target.value)} fullWidth label='Permanent Pincode' helperText={error?.parmanentPincode} error={error?.parmanentPincode} onFocus={()=>handleError('parmanentPincode',null)} />
                                </div>
                            </Grid>
                            <Grid size={4}>
                                <div style={{padding:'0px 5px 6px 5px'}}>
                                    <TextField onChange={(e)=>setAadharNo(e.target.value)} fullWidth label='Aadhar Number' helperText={error?.aadharNo} error={error?.aadharNo} onFocus={()=>handleError('aadharNo',null)} />
                                </div>
                            </Grid>
                            <Grid size={2}>
                                    <div style={{padding:'14px 5px 0px 5px',display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        <img src={employeePicture.fileName} alt="Employee Pic"  style={{width:40, borderRadius:5}} />
                                    </div>
                                    <div style={{color:'#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif",fontWeight: '400',fontSize: '0.75rem',lineHight: '1.66'}} >{error?.fileError==null?'':error.fileError}</div>
                            </Grid> 
                            <Grid size={2}>
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