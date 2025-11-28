import { Grid, TextField, Select, FormControl, InputLabel, MenuItem, IconButton } from "@mui/material"
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




export default function SectionInterface({refresh,setRefresh})
{

    const classes=useStyle()

    const [branchId,setBranchId]=useState('')
    const [branchIdList,setBranchIdList]=useState([])
    const [batchId,setBatchId]=useState('')
    const [batchIdList,setBatchIdList]=useState([])
    const [sectionName,setSectionName]=useState('')
    const [error,setError]=useState('')




    const fetchBranch=async()=>{
        var response=await getData('branch/fetch_all_branch')
        setBranchIdList(response.data)
    }

    const fetchBatch=async()=>{
        var response=await getData('batch/fetch_all_batch')
        setBatchIdList(response.data)
    }



    useEffect(function(){
        fetchBranch()
        fetchBatch()
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

    const handleError=(label,message)=>{
                setError((prev)=>({...prev,[label]:message}))
            }
    
            const validation=()=>{
    
                var isError=false
    
                if(branchId.length===0)
                {
                    setError((prev)=>({...prev,'brancId':'Branch Name is required.'}))
                    isError=true
                }
                if(batchId.length===0)
                {
                    setError((prev)=>({...prev,'batchId':'Batch Name is required.'}))
                    isError=true
                }if(sectionName.length===0)
                {
                    setError((prev)=>({...prev,'sectionName':'Section Name is required.'}))
                    isError=true
                }
                return isError
            }
    
    
            const handleClick= async()=>{
                var err=validation()
                if(err===false)
                {
                    var body={branchid:branchId,batchid:batchId,sectionname:sectionName,createddate:getDate(),createdtime:getTime(),userid:'xxxxx'}
                    var response=await postData('section/submit_section',body)
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
        <div>
            <div className={classes.root} >
            <div className={classes.box} >
                <div className={classes.heading} >
                    <div className={classes.titleBox} >
                    <div className={classes.subTitleStyle} >Add New Section</div>
                    </div>
                </div>
                <Grid container spacing={1}>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 15px 5px'}}>
                        {/*<TextField onChange={(e)=>setBranchId(e.target.value)} fullWidth size="small" label='Branch Name' helperText={error?.branchId} error={error?.branchId} onFocus={()=>handleError('branchId',null)} />*/}
                        <FormControl fullWidth >
                            <InputLabel>Branch Name</InputLabel>
                            <Select label="Branch Name" value={branchId} size="small" onChange={(e)=>setBranchId(e.target.value)} >
                                <MenuItem>-Select Branch-</MenuItem>
                                {fillBranch()}
                            </Select>
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 15px 5px'}}>
                        {/*<TextField onChange={(e)=>setBatchId(e.target.value)} fullWidth size="small" label='Batch Name' helperText={error?.batchId} error={error?.batchId} onFocus={()=>handleError('batchId',null)} />*/}
                        <FormControl fullWidth >
                            <InputLabel>Batch Name</InputLabel>
                            <Select label="Batch Name" value={batchId} size="small" onChange={(e)=>setBatchId(e.target.value)} >
                                <MenuItem>-Select Batch-</MenuItem>
                                {fillBatch()}
                            </Select>
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 15px 5px'}}>
                        <TextField onChange={(e)=>setSectionName(e.target.value)} size="small" fullWidth label='Section Name' helperText={error?.sectionName} error={error?.sectionName} onFocus={()=>handleError('sectionName',null)} />
                        </div>
                    </Grid>
                    <Grid size={1.5}>
                        <div style={{padding:'5px 5px 10px 5px',display:'flex',justifyContent:'center'}}>
                        <IconButton onClick={handleClick} style={{color:'hsla(321, 32%, 37%, 1.00', display:'flex',flexDirection:'column'}} >
                            <SaveIcon style={{fontSize:34}} />
                            <div style={{fontSize:12}}>Save</div>
                        </IconButton>
                        </div>
                    </Grid>
                    <Grid size={1.5}>
                        <div style={{padding:'5px 5px 10px 5px'}}>
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