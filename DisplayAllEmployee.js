import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { getData, getDate, getTime,postData, serverURL } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles"
import {IconButton, Dialog, DialogContent, Button, Grid, TextField, Select, FormControl, InputLabel, MenuItem, Radio, FormControlLabel, FormLabel, RadioGroup } from "@mui/material";
import Swal from "sweetalert2";
import burger from '../../assets/burger.png'
import CloseIcon from '@mui/icons-material/Close';
import EditIconComponent from "../../components/EditIconComponent";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
        width:'30%', 
        padding:'10px'
    }
}))








export default function DisplayAllEmployee()
{
    const [employeeList,setEmployeeList]=useState([])
    const [open,setOpen]=useState(false)
    const navigate=useNavigate()



    /***********************EDIT*****************************************/


        const  classes=useStyle()


        const [employeeId,setEmployeeId]=useState('')
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
        const [employeePicture,setEmployeePicture]=useState({bytes:'',fileName:burger})
    
        const [error,setError]=useState({fileError:null})
    
         const [dialogState,setDialogState]=useState('')
         const [statusButton,setStatusButton]=useState(false)
         const [tempImage,setTempImage]=useState('')
    
    
    
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
    
    
            if(!employeeId)
            {
                setError((prev)=>({...prev,'employeeId':'Employee Id is required.'}))
                isError=true
            }
            if(!branchId)
            {
                setError((prev)=>({...prev,'branchId':'Branch Name is required.'}))
                isError=true
            }
            if(!employeeName)
            {
                setError((prev)=>({...prev,'employeeName':'Employee Name is required.'}))
                isError=true
            }if(!dob)
            {
                setError((prev)=>({...prev,'dob':'DOB is required.'}))
                isError=true
            }if(!gender)
            {
                setError((prev)=>({...prev,'gender':'Gender is required.'}))
                isError=true
            }if(!emailId)
            {
                setError((prev)=>({...prev,'emailId':'Email Id is required.'}))
                isError=true
            }if(!mobileNo)
            {
                setError((prev)=>({...prev,'mobileNo':'Mobile No is required.'}))
                isError=true
            }if(!otherNo)
            {
                setError((prev)=>({...prev,'otherNo':'Other Contact No is required.'}))
                isError=true
            }
            if(!department)
            {
                setError((prev)=>({...prev,'department':'Department is required.'}))
                isError=true
            }
            if(!currentAddress)
            {
                setError((prev)=>({...prev,'currentAddress':'Current Address is required.'}))
                isError=true
            }if(!currentState)
            {
                setError((prev)=>({...prev,'currentState':'Current State is required.'}))
                isError=true
            }if(!currentCity)
            {
                setError((prev)=>({...prev,'currentCity':'Current City is required.'}))
                isError=true
            }if(!currentPincode)
            {
                setError((prev)=>({...prev,'currentPincode':'Current Pincode is required.'}))
                isError=true
            }if(!parmanentAddress)
            {
                setError((prev)=>({...prev,'parmanentAddress':'parmanent Address is required.'}))
                isError=true
            }if(!parmanentState)
            {
                setError((prev)=>({...prev,'parmanentState':'Parmanent State is required.'}))
                isError=true
            }if(!parmanentCity)
            {
                setError((prev)=>({...prev,'parmanentCity':'Parmanent State is required.'}))
                isError=true
            }if(!parmanentPincode)
            {
                setError((prev)=>({...prev,'parmanentPincode':'Parmanent City is required.'}))
                isError=true
            }
            if(!aadharNo)
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
                    var body={employeeid:employeeId,branchid:branchId,employeename:employeeName,dob:dob ? dob.toISOString().split('T')[0] : '',gender:gender,emailid:emailId,mobileno:mobileNo,otherno:otherNo,department:department,current_address:currentAddress,current_state:currentState,current_city:currentCity,current_pincode:currentPincode,parmanent_address:parmanentAddress,parmanent_state:parmanentState,parmanent_city:parmanentCity,parmanent_pincode:parmanentPincode,aadharno:aadharNo,createddate:getDate(),createdtime:getTime(),userid:'xxxxx'}
        
                var response=await postData('employees/edit_employee',body)
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
                   fetchEmployee()
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
                setStatusButton(true)
            }




            const showPictureInterface=()=>{
                return(
                <div style={{display:'flex', justifyContent:'center', paddng:'20px'}} >
                    <Grid container spacing={2} >
                        <Grid size={12}>
                                    <div className={classes.heading} >
                                        <div className={classes.titleBox}>
                                            <div className={classes.titleStyle} >HungerBuddy</div>
                                            <div className={classes.subTitleStyle} >Edit Picture</div>
                                        </div>  
                                        
                                    </div>
                        </Grid>
                        <Grid size={6} >
                            <img src={employeePicture.fileName} alt="employee pic" style={{width:'100px'}} />
                        </Grid>
                        <Grid size={6} style={{display:'flex', alignItems:'center'}} >
                            {statusButton?saveCancelButton():<></>}
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
            )}



        
    
    
    const showEmployeeInterface=()=>{
    
        return(
                
                            <Grid container spacing={1}>
                                <Grid size={12} >
                                    <div className={classes.heading} >
                                        <div className={classes.titleBox}>
                                            <div className={classes.titleStyle} >HungerBuddy</div>
                                            <div className={classes.subTitleStyle} >Edit Employee</div>
                                           
                                        </div>  
                                    </div>
                                </Grid>
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
                                    <TextField onChange={(e)=>setEmployeeName(e.target.value)} value={employeeName} fullWidth label='Employee Name' helperText={error?.employeeName} error={error?.employeeName} onFocus={()=>handleError('employeeName',null)} />
                                    </div>
                                </Grid>
                                <Grid size={4}>
                                    <div style={{padding:'10px 5px 0px 5px'}}>
                                        <FormControl fullWidth>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker label="Date of Birth" value={dob} onChange={(newValue) => setDob(newValue)}
                                                   slotProps={{ textField: { fullWidth: true, helperText: error?.dob, onFocus: () => handleError('dob', null)}}} />
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
                                        <TextField onChange={(e)=>setOtherNo(e.target.value)} value={otherNo} fullWidth label='Other No' helperText={error?.otherNo} error={error?.otherNo} onFocus={()=>handleError('otherNo',null)} />
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
                                <Grid size={6}>
                                    <div style={{padding:'0px 5px 6px 5px'}}>
                                        <TextField onChange={(e)=>setParmanentPincode(e.target.value)} value={parmanentPincode} fullWidth label='Parmanent Pincode' helperText={error?.parmanentPincode} error={error?.parmanentPincode} onFocus={()=>handleError('parmanentPincode',null)} />
                                    </div>
                                </Grid>
                                <Grid size={6}>
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
                      
                   
                
        )}






    /*********************************************************************/



    const fetchEmployee=async()=>{
        var res=await getData('employees/fetch_all_employee')
        setEmployeeList(res.data)
    }


    useEffect(function(){
        fetchEmployee()
    },[])


    const handleCloseDialog=()=>{
            setOpen(false)
    }



    const showDialog=()=>{
        return(
            <div>
                <Dialog open={open} onClose={handleCloseDialog} >
                    <IconButton onClick={handleCloseDialog} style={{display:'flex',marginLeft:'auto'}} >
                        <CloseIcon/>
                    </IconButton>
                    <DialogContent>
                        {dialogState==='Data'?showEmployeeInterface():showPictureInterface()}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }



    const handleEditPicture=async()=>{
        var formData=new FormData()
        formData.append('employeeid',employeeId)
        formData.append('createddate',getDate())
        formData.append('createdtime',getTime())
        formData.append('userid','xxxx')
        formData.append('employee_picture',employeePicture.bytes)

        var response=await postData('employees/edit_picture',formData)

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
                        fetchEmployee()
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
        return <div style={{display:'flex',justifyContent:'space-between', width:'80%'}} >
        <Button onClick={handleEditPicture} style={{background:'hsla(321, 32%, 37%, 1.00)'}} variant="contained" >Save</Button>
        <Button onClick={handleCancel} style={{background:'hsla(321, 32%, 37%, 1.00)'}} variant="contained" >Cancel</Button>
        </div>
    }



    const handleCancel=()=>{
            setEmployeePicture({fileName:tempImage,bytes:''})
            setStatusButton(false)
    }



    const handleDelete=async(employeeId)=>{
    
            
                Swal.fire({
                title: "Do you want to delete the selected Record?",
                showCancelButton: true,
                confirmButtonText: "Delete",
             }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) 
            {
                var response=await postData('employees/delete_employee',{employeeid:employeeId})
                Swal.fire(response.message);
                fetchEmployee()
            } 
            else if (result.isDenied) 
            {
                Swal.fire("Changes are not saved", "", "info");
            }
         });
            
        }
    



    const handleOpenDialog=async(rowData,status)=>{
console.log("🧾 RowData:", rowData)

        setDialogState(status)
        setEmployeeId(rowData.employeeid)
        setBranchId(rowData.branchid)
        setEmployeeName(rowData.employeename)
        setDob(rowData.dob ? new Date(rowData.dob) : null)
        setGender(rowData.gender)
        setEmailId(rowData.emailid)
        setMobileNo(rowData.mobileno)
        setOtherNo(rowData.otherno)
        setDepartment(rowData.department)
        setCurrentAddress(rowData.current_address)
        setCurrentState(rowData.current_state)
        await fetchCurrentCity(rowData.current_state)
        setCurrentCity(rowData.current_city)
        setCurrentPincode(rowData.current_pincode)
        setParmanentAddress(rowData.parmanent_address)
        setParmanentState(rowData.parmanent_state)
        await fetchParmanentCity(rowData.parmanent_state)
        setParmanentCity(rowData.parmanent_city)
        setParmanentPincode(rowData.parmanent_pincode)
        setAadharNo(rowData.aadharno)
        setEmployeePicture({fileName:`${serverURL}/images/${rowData.employee_picture}`,bytes:''})
        setTempImage(`${serverURL}/images/${rowData.employee_picture}`)

        setOpen(true)
    }


    const displayEmployee=()=>{
        return(
            <div>
                <MaterialTable
                    title='List Of Employees'
                    columns={[
                        { title:'Employee Name', field:'employeename' },
                        { title:'DOB/Gender',render:(rowData)=>(<div style={{ whiteSpace: 'nowrap', lineHeight: '1.4em' }}>{rowData.dob},<br/>{rowData.gender}</div>)},
                        { title:'Email ID', field:'emailid' },
                        { title:'Mobile No.', field:'mobileno' },
                        { title:'Department', field:'department' },
                        { title:'Aadhar No.', field:'aadharno' },
                        { title:'Employee Picture',  render:(rowData)=>( <div onClick={()=>handleOpenDialog(rowData,"Picture")} > <EditIconComponent image={rowData.employee_picture} /></div>)}

                    ]}
                    data={employeeList}
                    actions={[   
                                {icon:'edit', tooltip:'Edit', onClick:(event,rowData)=>handleOpenDialog(rowData,'Data')},
                                {icon:'delete', tooltip:'Delete', onClick:(event,rowData)=>handleDelete(rowData.employeeid)},
                                {icon:'add', tooltip:'Add Employees', isFreeAction:true, onClick: (event)=> navigate("/admindashboard/employeeinterface") }
                            ]}

                />
            </div>
        )
    }


    return(
         <div className={classes.root} >
            <div className={classes.box} >
                {displayEmployee()}
            </div>
            {showDialog()}
        </div>

    )
}
