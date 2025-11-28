import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { getData, getDate, getTime, postData } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles"
import { IconButton, Dialog, DialogContent, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';




const useStyle=makeStyles((theme)=>({

    root:
    {   display:'flex',
        justifyContent:'center',
        width:'100%',
        height:'100%'
    },
    box:
    {
        width:'80%',
        height:'auto',
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




export default function DisplayAllBranch(refresh,setRefresh)
{

    const  classes=useStyle()

    const [branchList,setBranchList]=useState([])

    const [open,setOpen]=useState(false)



    /*********************************************/

        const [branchId,setBranchId]=useState('')
        const [branchName,setBranchName]=useState('')
        const [address,setAddress]=useState('')
        const [latLong,setLatlong]=useState('')
        const [stateId,setStateId]=useState('')
        const [cityId,setCityId]=useState('')
        const [cityIdList,setCityIdList]=useState([])
        const [stateIdList,setStateIdList]=useState([])
        const [emailId,setEmailId]=useState('')
        const [contactNumber,setContactNumber]=useState('')
        const [contactPerson,setContactPerson]=useState('')
        const [error,setError]=useState({})


        /* State City */




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
        
        




      /*****************/
        

        useEffect(()=>{
            FetchAllBranch()
        },[refresh])



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
                setError((prev)=>({...prev,'cityId':'Pls Input City.'}))
                isError=true
            }if(stateId.length===0)
            {
                setError((prev)=>({...prev,'stateId':'Pls Input State.'}))
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

        const  handleClick=async()=>{

            var err=validation()
            if(err===false)
            {

                var body={branchid:branchId,branchname:branchName,address:address,latlong:latLong,stateid:stateId,cityid:cityId,emailid:emailId,contactnumber:contactNumber,contactperson:contactPerson,createddate:getDate(),createdtime:getTime(),userid:'xxxx'}

                var response=await postData('branch/edit_branch',body)
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
                FetchAllBranch()
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





        const showBranchInterface=()=>{
            return(

         <Grid container spacing={1} >
                <Grid size={12} >
                <div className={classes.heading} >
                    <div className={classes.titleBox} >
                        <div className={classes.titleStyle} >HungerBuddy</div>
                        <div className={classes.subTitleStyle} >Edit Branch</div>   
                    </div>
                </div>
                </Grid>
                    <Grid size={6}>
                        <div style={{padding:'10px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setBranchName(e.target.value)} fullWidth label='Branch Name' value={branchName} helperText={error?.branchName} error={error?.branchName} onFocus={()=>handleError('branchName',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'10px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setAddress(e.target.value)} fullWidth label='Address' value={address} helperText={error?.address} error={error?.address} onFocus={()=>handleError('address',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setLatlong(e.target.value)} fullWidth label='Latlong' value={latLong} helperText={error?.latLong} error={error?.latLong} onFocus={()=>handleError('latLong',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}> 
                       {/* <TextField onChange={(e)=>setStateId(e.target.value)} fullWidth label='State Id' value={stateId} helperText={error?.stateId} error={error?.stateId} onFocus={()=>handleError('stateId',null)} /> */}
                       <FormControl size="small" fullWidth >
                            <InputLabel>State</InputLabel>
                            <Select label="State" value={stateId} onChange={handleStateChange} >
                            <MenuItem>-Select State-</MenuItem>
                                {fillStates()}
                            </Select>
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                    {/* <TextField onChange={(e)=>setCityId(e.target.value)} fullWidth label='City Id' value={cityId} helperText={error?.cityId} error={error?.cityId} onFocus={()=>handleError('cityId',null)} /> */}
                    <FormControl size="small" fullWidth >
                        <InputLabel>City</InputLabel>
                        <Select label="City" value={cityId} onChange={(e)=>setCityId(e.target.value)} >
                        <MenuItem>-Select City-</MenuItem>
                        {fillCities()}
                        </Select>
                    </FormControl>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setEmailId(e.target.value)} fullWidth label='Email Id' value={emailId} helperText={error?.emailId} error={error?.emailId} onFocus={()=>handleError('emailId',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setContactNumber(e.target.value)} fullWidth label='Contact Number' value={contactNumber} helperText={error?.contactNumber} error={error?.contactNumber} onFocus={()=>handleError('contactNumber',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setContactPerson(e.target.value)} fullWidth label='Contact Person' value={contactPerson} helperText={error?.contactPerson} error={error?.contactPerson} onFocus={()=>handleError('contactPerson',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <Button onClick={handleClick} style={{background:'hsla(321, 32%, 37%, 1.00'}} fullWidth variant="contained" >Save</Button>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 10px 5px'}}>
                        <Button style={{background:'hsla(321, 32%, 37%, 1.00'}} fullWidth variant="contained" >Clear</Button>
                        </div>
                    </Grid>
                </Grid>
    )


        }



    /***********************************************/

    const FetchAllBranch=async()=>{
        var response=await getData('branch/fetch_all_branch')
        setBranchList(response.data)
    }

    useEffect(function(){
    FetchAllBranch()
    },[])


    const handleOpenDialog=(rowData)=>{
        fetchAllCities(rowData.stateid)
        setBranchId(rowData.branchid)
        setBranchName(rowData.branchname)
        setAddress(rowData.address)
        setLatlong(rowData.latlong)
        setStateId(rowData.stateid)
        setCityId(rowData.cityid)
        setEmailId(rowData.emailid)
        setContactNumber(rowData.contactnumber)
        setContactPerson(rowData.contactperson)
        setOpen(true)
    }


    const handleCloseDialog=()=>{
        setOpen(false)
    }


    const showDialog=()=>{

        return(
            <div>
                <Dialog open={open} 
                onClose={handleCloseDialog} >
                        <IconButton onClick={handleCloseDialog} style={{display:'flex',marginLeft:'auto'}} >
                            <CloseIcon/>
                        </IconButton>
                    <DialogContent>
                        {showBranchInterface()}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }


    const handleDelete=async(branchId)=>{

        
        Swal.fire({
            title: "Do you want to delete the selected Branch?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) 
                {
                    var response=await postData('branch/delete_branch',{branchid:branchId})
                    Swal.fire(response.message);
                    FetchAllBranch()
                } 
                else if (result.isDenied) 
                {
                    Swal.fire("Changes are not saved", "", "info");
                }
             });

    }


    const displayBranch=()=>{

     return(
        <div>
            <MaterialTable
            title='List Of Food Branches'
            columns={[
                        {title:'Branch Name',field:'branchname'},
                        {title:'Address',render:(rowData)=>(<div> {rowData.statename},{rowData.cityname}, {rowData.address} </div>)},
                        {title:'LatLong',field:'latlong'},
                        {title:'Email Id',field:'emailid'},
                        {title:'Contact Number',field:'contactnumber'},
                        {title:'Contact Person',field:'contactperson'}
                     ]}
                     data={branchList}
                     actions={[
                                {icon:'edit', tooltip:'Edit', onClick:(event,rowData)=>handleOpenDialog(rowData)},
                                {icon:'delete', tooltip:'Delete', onClick:(event,rowData)=>handleDelete(rowData.branchid)}
                             ]}
            />
        </div>
    )
}

    return(

        <div className={classes.root} >
            <div className={classes.box} >
                {displayBranch()}
            </div>
            {showDialog()}
        </div>

    )
}