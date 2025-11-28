import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { getData, getDate, getTime, postData } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles"
import { IconButton, Dialog, DialogContent, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';




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




export default function DisplayAllBatch({refresh,setRefresh})
{

    const  classes=useStyle()

    const [batchList,setBatchList]=useState([])
    const [open,setOpen]=useState(false)





    /***********************Batch************************************************/


        const [batchId,setBatchId]=useState('')
        const [branchId,setBranchId]=useState('')
        const [branchIdList,setBranchIdList]=useState([])
        const [batchName,setBatchName]=useState('')
        const [session,setSession]=useState('')
        const [error,setError]=useState('')
    


        useEffect(()=>{
                fetchAllBatch()
            },[refresh])
    
    
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
                    var body={batchid:batchId,branchid:branchId,batchname:batchName,session:session,createddate:getDate(),createdtime:getTime(),userid:'xxxxx'}
                    var response=await postData('batch/edit_batch',body)
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
                    fetchAllBatch()
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
    
    
    const showBatchInterface=()=>{

        return(
        
                    <Grid container spacing={1}>
                        <Grid size={12} >
                                        <div className={classes.heading} >
                                            <div className={classes.titleBox} >
                                                <div className={classes.titleStyle} >HungerBuddy</div>
                                                <div className={classes.subTitleStyle} >Edit Batch</div>   
                                            </div>
                                        </div>
                                        </Grid>
                        <Grid size={12}>
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
                        <Grid size={12}>
                            <div style={{padding:'0px 5px 0px 5px'}}>
                            <TextField onChange={(e)=>setBatchName(e.target.value)} value={batchName} fullWidth label='Batch Name' helperText={error?.batchName} error={error?.batchName} onFocus={()=>handleError('batchName',null)} />
                            </div>
                        </Grid>
                        <Grid size={12}>
                            <div style={{padding:'0px 5px 0px 5px'}}>
                            <TextField onChange={(e)=>setSession(e.target.value)} value={session} fullWidth label='Session' helperText={error?.session} error={error?.session} onFocus={()=>handleError('session',null)} />
                            </div>
                        </Grid>
                        <Grid size={6}>
                            <div style={{padding:'0px 5px 0px 5px',display:'flex',justifyContent:'end'}}>
                            <Button onClick={handleClick} style={{background:'hsla(321, 32%, 37%, 1.00',width:'100%'}} variant="contained" >Save</Button>
                            </div>
                        </Grid>
                        <Grid size={6}>
                            <div style={{padding:'0px 5px 5px 5px'}}>
                            <Button style={{background:'hsla(321, 32%, 37%, 1.00',width:'100%'}} variant="contained" >Clear</Button>
                            </div>
                        </Grid>
                    </Grid>
                


    )}




    /******************************************************************************/






    const fetchAllBatch=async()=>{
        var response=await getData('batch/fetch_all_batch')
        setBatchList(response.data)
    }


    useEffect(function(){
        fetchAllBatch()
    },[])


    const handleOpenDialog=(rowData)=>{
        setBatchId(rowData.batchid)
        setBranchId(rowData.branchid)
        setBatchName(rowData.batchname)
        setSession(rowData.session)
        setOpen(true)
    }



    const handleDelete=async(batchId)=>{
    
            
            Swal.fire({
                title: "Do you want to delete the selected Batch?",
                showCancelButton: true,
                confirmButtonText: "Delete",
                }).then(async(result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) 
                    {
                        var response=await postData('batch/delete_batch',{batchid:batchId})
                        Swal.fire(response.message);
                        fetchAllBatch()
                    } 
                    else if (result.isDenied) 
                    {
                        Swal.fire("Changes are not saved", "", "info");
                    }
                 });
    
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
                            {showBatchInterface()}
                        </DialogContent>
                    </Dialog>
                </div>
            )
        }


const displayBatch=()=>{

     return(
        <div>
            <MaterialTable
            title='List Of Batches'
            columns={[
                        {title:'Branch Name',field:'branchname'},
                        {title:'Batch Name',field:'batchname'},
                        {title:'Session',field:'session'}
                     ]}
                     data={batchList}
                     actions={[
                                {icon:'edit', tooltip:'Edit', onClick:(event,rowData)=>handleOpenDialog(rowData)},
                                {icon:'delete', tooltip:'Delete', onClick:(event,rowData)=>handleDelete(rowData.batchid)}
                             ]}
            />
        </div>
    )
}


    return(
        <div className={classes.root} >
            <div className={classes.box} >
                {displayBatch()}
            </div>
            {showDialog()}
        </div>
    )
}