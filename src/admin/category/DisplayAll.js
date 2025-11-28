import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { getData, serverURL, getDate, getTime,postData } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles"
import {IconButton, Dialog, DialogContent, Button, Grid, TextField } from "@mui/material";
import Swal from "sweetalert2";
import burger from '../../assets/burger.png'
import CloseIcon from '@mui/icons-material/Close';
import EditIconComponent from "../../components/EditIconComponent";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const useStyle=makeStyles((theme)=>({

    root:
    {
        display:'flex',
        justifyContent:'center',
        width:'auto',
        height:'100%'
    },
    box:
    {
        width:'80%',
        height:'auto',
        padding:10
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


export default function DisplayAll({refresh,setRefresh})
{
    const classes=useStyle()

    const [categoryList,setCategoryList]=useState([])

    const [open,setOpen]=useState(false)

    /************************************************/

    const [categoryId,setCategoryId]=useState('')
    const [branchId,setBranchId]=useState('')
    const [categoryName,setCategoryName]=useState('')

    const [categoryIcon,setCategoryIcon]=useState({bytes:'',fileName:burger})

    const [dialogState,setDialogState]=useState('')
    const [statusButton,setStatusButton]=useState(false)
    const [tempImage,setTempImage]=useState('')
    const [error,setError]=useState({fileError:null})

  
    useEffect(()=>{
        FetchAllCategory()
    },[refresh])


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
        return isError
    }

    const handleClick= async()=>{
      
        var err=validation()
        if(err===false)
        {
            var body={'branchid':branchId,'categoryid':categoryId,'categoryname':categoryName,'createddate':getDate(),'createdtime':getTime(),'userid':'xxxxx'}

        var response=await postData('category/edit_category',body)
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
        FetchAllCategory()
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
        setCategoryIcon((prev)=>({...prev,bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])}))
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
                        <img src={categoryIcon.fileName} alt="Category Icon"  style={{width:100,borderRadius:'10px'}} />
                    </Grid>
                    <Grid size={6} style={{display:'flex',alignItems:'center'}} >
                        { statusButton?saveCancelButton():<></> }
                    </Grid>
                    <Grid size={12}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                            <Button style={{background:'hsla(321, 32%, 37%, 1.00)'}} endIcon={<CloudUploadIcon />} component='label' variant="contained" fullWidth>
                                Category Icon
                            <input onChange={handleChange} type="file" hidden multiple />
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }




    const showCategoryInterface=()=>{
        return(
                <Grid container spacing={1} >
                    <Grid size={12} >
                        <div className={classes.heading} >
                            <div className={classes.titleBox}>
                                <div className={classes.titleStyle} >HungerBuddy</div>
                                <div className={classes.subTitleStyle} >Edit Category</div>
                            </div>  
                            <div style={{marginLeft:'auto'}} >
                                <IconButton onClick={handleCloseDialog}>
                                    <CloseIcon style={{color:'#fff'}} />
                                </IconButton>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={12}>
                        <div style={{padding:'0px 5px 0px 5px',marginTop:'10px'}}>
                        <TextField onChange={(e)=>setBranchId(e.target.value)} label='Branch Name' value={branchId} fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={()=>handleError('branchId',null)} />
                        </div>
                    </Grid>
                    <Grid size={12}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setCategoryName(e.target.value)} label='Category Name' value={categoryName} fullWidth helperText={error?.categoryName} error={error?.categoryName} onFocus={()=>handleError('categoryName',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <Button onClick={handleClick} style={{background:'hsla(321, 32%, 37%, 1.00'}} fullWidth variant="contained" >Save</Button>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <Button style={{background:'hsla(321, 32%, 37%, 1.00'}} fullWidth variant="contained" >Clear</Button>
                        </div>
                    </Grid>
                </Grid>
        )
    
    }





    /*************************************************/

    const FetchAllCategory=async()=>{
        var response=await getData('category/fetch_all_category')
        setCategoryList(response.data)
    }

    useEffect(function(){
    FetchAllCategory()
    },[])


    const handleCancel=()=>{
        setCategoryIcon({fileName:tempImage,bytes:''})
        setStatusButton(false)
    }


    const handleEditPicture=async()=>{
        var formData=new FormData()
        formData.append('categoryid',categoryId)
        formData.append('createddate',getDate())
        formData.append('createdtime',getTime())
        formData.append('userid','xxx')
        formData.append('categoryicon',categoryIcon.bytes)
       
        
        var response=await postData('category/edit_picture',formData)
    
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
        FetchAllCategory()
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
        setCategoryId(rowData.categoryid)
        setBranchId(rowData.branchid)
        setCategoryName(rowData.categoryname)
        setCategoryIcon({fileName:`${serverURL}/images/${rowData.categoryicon}`,bytes:''})
        setTempImage(`${serverURL}/images/${rowData.categoryicon}`)
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
                       {dialogState==='Data'?showCategoryInterface():showPictureInterface()}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

    const handleDelete=async(categoryId)=>{

        
            Swal.fire({
            title: "Do you want to delete the selected category?",
            showCancelButton: true,
            confirmButtonText: "Delete",
         }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) 
        {
            var response=await postData('category/delete_category',{categoryid:categoryId})
            Swal.fire(response.message);
            FetchAllCategory()
        } 
        else if (result.isDenied) 
        {
            Swal.fire("Changes are not saved", "", "info");
        }
     });
        
    }




    const displayCategory=()=>{

        return(
            <div>
                <MaterialTable 
                 title='List Of Food Categories'
                 columns={[
                            {title:'Branch Id', field:'branchid'},
                            {title:'Category Name', field:'categoryname'},
                            {
                               title:'Icon', render:(rowData)=>(<div onClick={()=>handleOpenDialog(rowData,"Picture")} > <EditIconComponent image={rowData.categoryicon} /></div>

                               )
                            }
                        ]}

                        data={categoryList}
                        actions={[   
                                    {icon:'edit', tooltip:'Edit', onClick:(event,rowData)=>handleOpenDialog(rowData,"Data")},
                                    {icon:'delete', tooltip:'Delete', onClick:(event,rowData)=>handleDelete(rowData.categoryid)}
                                ]}
                 />
            </div>
        )
    }

    return(

        <div className={classes.root} >
            <div className={classes.box} >
                {displayCategory()}
            </div>
            {showDialog()}
        </div>

    )
}