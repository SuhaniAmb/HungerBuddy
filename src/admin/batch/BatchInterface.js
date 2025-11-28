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



export default function BatchInterface({refresh,setRefresh})
{

    const classes=useStyle()

    const [branchId,setBranchId]=useState('')
    const [branchIdList,setBranchIdList]=useState([])
    const [batchName,setBatchName]=useState('')
    const [session,setSession]=useState('')
    const [error,setError]=useState('')



    const fetchBranch=async()=>{
        var res=await getData('branch/fetch_all_branch')
        console.log('fetch  bbbbbbbbbbbbbbbbbbbbbbbbb',res.data)
        setBranchIdList(res.data)

    }


    useEffect(function(){
        fetchBranch()
    },[])



    const fillBranch=()=>{
        return branchIdList.map((item)=>{
            return( <MenuItem value={item.branchid}> {item.branchname} </MenuItem> )
        })
    }


  


    const handleError=(label,message)=>{
            setError((prev)=>({...prev,[label]:message}))
        }

        const validation=()=>{

            var isError=false

            if(branchId.length===0)
            {
                setError((prev)=>({...prev,'brancId':'Branch Id is required.'}))
                isError=true
            }
            if(batchName.length===0)
            {
                setError((prev)=>({...prev,'batchName':'Batch Name is required.'}))
                isError=true
            }if(session.length===0)
            {
                setError((prev)=>({...prev,'session':'Session is required.'}))
                isError=true
            }
            return isError
        }


        const handleClick= async()=>{
            var err=validation()
            if(err===false)
            {
                var body={branchid:branchId,batchname:batchName,session:session,createddate:getDate(),createdtime:getTime(),userid:'xxxxx'}
                var response=await postData('batch/submit_batch',body)
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
                    <div className={classes.subTitleStyle} >Add New Batch</div>
                    </div>
                </div>
                <Grid container spacing={1}>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 0px 5px'}}>
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
                        <TextField onChange={(e)=>setBatchName(e.target.value)} size="small" fullWidth label='Batch Name' helperText={error?.batchName} error={error?.batchName} onFocus={()=>handleError('batchName',null)} />
                        </div>
                    </Grid>
                    <Grid size={3}>
                        <div style={{padding:'10px 5px 15px 5px'}}>
                        <TextField onChange={(e)=>setSession(e.target.value)} size="small" fullWidth label='Session' helperText={error?.session} error={error?.session} onFocus={()=>handleError('session',null)} />
                        </div>
                    </Grid>
                    <Grid size={1.5}>
                        <div style={{padding:'5px 5px 15px 5px',display:'flex', justifyContent:'center'}}>
                        <IconButton onClick={handleClick} style={{color:'hsla(321, 32%, 37%, 1.00', display:'flex',flexDirection:'column'}} >
                            <SaveIcon style={{fontSize:34}} />
                            <div style={{fontSize:12}}>Save</div>
                        </IconButton>
                        </div>
                    </Grid>
                    <Grid size={1.5}>
                        <div style={{padding:'5px 0px 15px 5px'}}>
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