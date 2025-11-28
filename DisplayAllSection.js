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








export default function DisplayAllSection({refresh,setRefresh})
{

    const  classes=useStyle()
    
    const [sectionList,setSectionList]=useState([])
    const [open,setOpen]=useState(false)


    /**************************Section********************************************/




    const [sectionId,setSectionId]=useState('')
    const [branchId,setBranchId]=useState('')
    const [branchIdList,setBranchIdList]=useState([])
    const [batchId,setBatchId]=useState('')
    const [batchIdList,setBatchIdList]=useState([])
    const [sectionName,setSectionName]=useState('')
    const [error,setError]=useState('')
    


    useEffect(()=>{
            fetchAllSection()
        },[refresh])
    
    
    
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
                        var body={sectionid:sectionId,branchid:branchId,batchid:batchId,sectionname:sectionName,createddate:getDate(),createdtime:getTime(),userid:'xxxxx'}
                        var response=await postData('section/edit_section',body)
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
                            fetchAllSection()
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
        
    
    
    const showSectionInterface=()=>{
        return(
            
                    <Grid container spacing={1}>
                        <Grid size={12} >
                            <div className={classes.heading} >
                                <div className={classes.titleBox} >
                                    <div className={classes.titleStyle} >HungerBuddy</div>
                                    <div className={classes.subTitleStyle} >Edit Section</div>   
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
                        <Grid size={12}>
                            <div style={{padding:'0px 5px 0px 5px'}}>
                            <TextField onChange={(e)=>setSectionName(e.target.value)} value={sectionName} fullWidth label='Section Name' helperText={error?.sectionName} error={error?.sectionName} onFocus={()=>handleError('sectionName',null)} />
                            </div>
                        </Grid>
                        <Grid size={6}>
                            <div style={{padding:'0px 5px 0px 5px',display:'flex',justifyContent:'end'}}>
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
     





    /******************************************************************************/
    


    const fetchAllSection=async()=>{
        var response=await getData('section/fetch_all_section')
        setSectionList(response.data)
    }


    useEffect(function(){
        fetchAllSection()
    },[])
    


    const handleOpenDialog=(rowData)=>{
        setSectionId(rowData.sectionid)
        setBranchId(rowData.branchid)
        setBatchId(rowData.batchid)
        setSectionName(rowData.sectionname)
        setOpen(true)
    }





    const handleDelete=async(sectionId)=>{
        
                
                Swal.fire({
                    title: "Do you want to delete the selected Section?",
                    showCancelButton: true,
                    confirmButtonText: "Delete",
                    }).then(async(result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) 
                        {
                            var response=await postData('section/delete_section',{sectionid:sectionId})
                            Swal.fire(response.message);
                            fetchAllSection()
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
                                {showSectionInterface()}
                            </DialogContent>
                </Dialog>
            </div>

            )
    }





    const displaySection=()=>{
    
         return(
            <div>
                <MaterialTable
                title='List Of Section'
                columns={[
                            {title:'Branch Name',field:'branchname'},
                            {title:'Batch Name',field:'batchname'},
                            {title:'Section Name',field:'sectionname'}
                         ]}
                         data={sectionList}
                         actions={[
                                    {icon:'edit', tooltip:'Edit', onClick:(event,rowData)=>handleOpenDialog(rowData)},
                                    {icon:'delete', tooltip:'Delete', onClick:(event,rowData)=>handleDelete(rowData.sectionid)}
                                 ]}
                />
            </div>
        )
    }
    
    


    
    

return(
        <div className={classes.root} >
            <div className={classes.box} >
                {displaySection()}
            </div>
            {showDialog()}
        </div>
    )
}