//import { Gradient } from "@mui/icons-material"
import { Grid, TextField,IconButton } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import burger from '../../assets/burger.png'
import { useState } from "react";
import { getDate,getTime,postData } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles"
import Swal from "sweetalert2";

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
        height:'100%',
        border:'0.7px solid hsla(321, 41%, 24%, 1)',
        borderRadius:'5px',
        margin:'10px',
        paddingBottom:'10px'
    },
    heading:
    {
        width:'100%',
        height:'auto',
        borderTopLeftRadius:'5px',
        borderTopRightRadius:'5px'
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

export default function CategoryInterface({refresh,setRefresh})
{
    var classes=useStyle()
    
    var branch=JSON.parse(localStorage.getItem('Branch'))
    //alert(JSON.stringify(branch))
    const [branchId,setBranchId]=useState(branch?.branchid)
    const [branchName,setBranchName]=useState(branch?.branchname)
    const [categoryName,setCategoryName]=useState('')
    const [categoryIcon,setCategoryIcon]=useState({bytes:'',fileName:burger})

    const [error,setError]=useState({fileError:null})
    const handleError=(label,message)=>{
        setError((prev)=>({...prev,[label]:message}))
    }

    const validation=()=>{
        var isError=false
        if(branchId.length===0)
        {
            setError((prev)=>({...prev,'branchId':'Pls Input Branch Id.'}))
            isError=true
        }
        if(categoryName.length===0)
        {
            setError((prev)=>({...prev,'categoryName':'Pls Input Category Name.'}))
            isError=true
        }
        if(categoryIcon.bytes.length===0)
        {
            setError((prev)=>({...prev,'fileError':'Pls Upload Category Icon.'}))
            isError=true
        }
        return isError
    }



    const clearValues=()=>{
        setCategoryName('')
        setBranchName('')
        setCategoryIcon({bytes:'',fileName:burger})
    }

    




    const handleClick= async()=>{
      
        var err=validation()
        if(err===false)
        {
            var formData=new FormData()
            formData.append('branchid',branchId)
            formData.append('categoryname',categoryName)
            formData.append('categoryicon',categoryIcon.bytes)
            formData.append('createddate',getDate())
            formData.append('createdtime',getTime())
            formData.append('userid','xxxxx')

        var response=await postData('category/submit_category',formData)
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

    const handleChange=(e)=>{
        setCategoryIcon({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
        setError((prev)=>({...prev,'fileError':null}))
    }


    return(

        <div className={classes.root} >
            <div className={classes.box} >
                <Grid container spacing={1} >
                    <Grid size={12} >
                        <div className={classes.heading} >
                            <div className={classes.titleBox}>
                                <div className={classes.subTitleStyle} >New Food Category</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setBranchId(e.target.value)} label='Branch Name' value={branchName} size="small" fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={()=>handleError('branchId',null)} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setCategoryName(e.target.value)} label='Category Name' value={categoryName} size="small" fullWidth helperText={error?.categoryName} error={error?.categoryName} onFocus={()=>handleError('categoryName',null)} />
                        </div>
                    </Grid>
                    <Grid size={1}>
                        <div style={{padding:'0px 5px 0px 5px',display:'flex', justifyContent:'center'}}>
                        <img src={categoryIcon.fileName} alt="Category Icon"  style={{width:'40px'}} />
                        </div>
                        <div style={{color:'#d32f2f',fontFamily: "Roboto,Helvetica,Arial,sans-serif",fontWeight: '400',fontSize: '0.75rem',lineHight: '1.66'}} >{error?.fileError==null?'':error.fileError}</div>
                    </Grid>
                    <Grid size={1}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <IconButton style={{color:'hsla(321, 32%, 37%, 1.00)', display:'flex', flexDirection:'column', alignItems:'center'}} component='label'>
                            <CloudUploadIcon style={{fontSize:34}} />
                            <div style={{fontSize:12}} >Upload</div>
                        <input onChange={handleChange} type="file" hidden multiple />
                        </IconButton>
                        </div>
                    </Grid>
                    <Grid size={1}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <IconButton onClick={handleClick} style={{color:'hsla(321, 32%, 37%, 1.00', display:'flex',flexDirection:'column'}} >
                            <SaveIcon style={{fontSize:34}} />
                            <div style={{fontSize:12}}>Save</div>
                        </IconButton>
                        </div>
                    </Grid>
                    <Grid size={1}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <IconButton style={{color:'hsla(321, 32%, 37%, 1.00', display:'flex', flexDirection:'column'}} onClick={clearValues}>
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