import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { getData, serverURL, postData, getDate, getTime } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles"
import {IconButton, Dialog, DialogContent, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';
import EditIconComponent from "../../components/EditIconComponent";
import burger from '../../assets/burger.png'
import { useNavigate } from "react-router-dom";


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
    


export default function DisplayAllFoodItem()
{

    const classes=useStyle()
    const navigate=useNavigate()
    var branch=JSON.parse(localStorage.getItem('Branch'))

    const [foodItemList,setFoodItemList]=useState([])
    const [open,setOpen]=useState(false)





    /*******************************FOOD VIEW*************************************/





            const [foodItemId,setFoodItemId]=useState('')
            const [branchId,setBranchId]=useState('')
            const [branchIdList,setBranchIdList]=useState([])
            const [categoryId,setCategoryId]=useState('')
            const [categoryIdList,setCategoryIdList]=useState([])
            const [foodItemName,setFoodItemName]=useState('')
            const [foodItemType,setFoodItemType]=useState('')
            const [foodItemTaste,setFoodItemTaste]=useState('')
            const [ingredients,setIngredients]=useState('')
            const [fullPrice,setFullPrice]=useState('')
            const [halfPrice,setHalfPrice]=useState('')
            const [offerPrice,setOfferPrice]=useState('')
            const [status,setStatus]=useState('')
            const [rating,setRating]=useState('')
            const [picture,setPicture]=useState({bytes:'',fileName:burger})

            const [error,setError]=useState({})
            
            const [dialogState,setDialogState]=useState('')
            const [statusButton,setStatusButton]=useState(false)
            const [tempImage,setTempImage]=useState('')

    
    
            const fetchBranch=async()=>{
                var res=await getData('fooditems/fetch_branch')
                //console.log('hhhhhhhhbbbbbbbbbbbbbbbbbbbb',res.data)
                setBranchIdList(res.data)
            }
    
    
            useEffect(function(){
                fetchBranch()
            },[])
    
    
            const fillBranch=()=>{
                return branchIdList.map((item)=>{
                    return(<MenuItem value={item.branchid} > {item.branchname} </MenuItem>)
                })
            }
    
    
            const handleBranchChange=(e)=>{
                setBranchId(e.target.value)
            }
    
    
    
            const fetchCategory=async()=>{
                var res=await getData('fooditems/fetch_category')
                //console.log('ccccccccccccccccccccccccccccccccchhhhhhh',res.data)
                setCategoryIdList(res.data)
            }
    
    
            useEffect(function(){
                fetchCategory()
            },[])
    
    
            const fillCategory=()=>{
                return categoryIdList.map((item)=>{
                    return(<MenuItem value={item.categoryid} > {item.categoryname} </MenuItem>)
                })
            }
    
    
            const handleCategoryChange=(e)=>{
                setCategoryId(e.target.value)
            }
    
    
    
            const handleError=(label,message)=>{
                setError((prev)=>({...prev,[label]:message}))
            }
    
            const validation=()=>{
    
                var isError=false
                if(categoryId.length===0)
                {
                    setError((prev)=>({...prev,'categoryId':'Pls Input Category Id.'}))
                    isError=true
                }
                if(branchId.length===0)
                {
                    setError((prev)=>({...prev,'branchId':'Pls Input Branch Id.'}))
                    isError=true
                }
                if(foodItemName.length===0)
                {
                    setError((prev)=>({...prev,'foodItemName':'Pls Input Food Name.'}))
                    isError=true
                }if(foodItemType.length===0)
                {
                    setError((prev)=>({...prev,'foodItemType':'Pls Input Food Type.'}))
                    isError=true
                }if(foodItemTaste.length===0)
                {
                    setError((prev)=>({...prev,'foodItemTaste':'Pls Input Food Taste.'}))
                    isError=true
                }if(ingredients.length===0)
                {
                    setError((prev)=>({...prev,'ingredients':'Pls Input Ingredients.'}))
                    isError=true
                }
                if(fullPrice.length===0)
                {
                    setError((prev)=>({...prev,'fullPrice':'Pls Input Full Price.'}))
                    isError=true
                }
                if(halfPrice.length===0)
                {
                    setError((prev)=>({...prev,'halfPrice':'Pls Input Half Price.'}))
                    isError=true
                }if(offerPrice.length===0)
                {
                    setError((prev)=>({...prev,'offerPrice':'Pls Input Offer Price.'}))
                    isError=true
                }if(status.length===0)
                {
                    setError((prev)=>({...prev,'status':'Pls Input Status.'}))
                    isError=true
                }if(rating.length===0)
                {
                    setError((prev)=>({...prev,'rating':'Pls Input Rating.'}))
                    isError=true
                }

                return isError
            }
    
    
    
            const handleClick= async()=>{
                  
                    var err=validation()
                    if(err===false)
                    {
                        var body={fooditemid:foodItemId,branchid:branchId,categoryid:categoryId,fooditemname:foodItemName,fooditemtype:foodItemType,fooditemtaste:foodItemTaste,ingredients:ingredients,fullprice:fullPrice,halfprice:halfPrice,offerprice:offerPrice,status:status,rating:rating,createddate:getDate(),createdtime:getTime(),userid:'xxxxx'}
                        
                        console.log('bodyyyyyyyyyyyyyyyyyyy',body)
            
                    var response=await postData('fooditems/edit_fooditems',body)
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
                        fetchAllFoodItems()
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
                setPicture({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
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
                                    <img src={picture.fileName} alt="food item"  style={{width:100}} />
                                </Grid>
                                <Grid size={6} style={{display:'flex',alignItems:'center'}} >
                                    { statusButton?saveCancelButton():<></> }
                                </Grid>
                                <Grid size={12}>
                                    <div style={{padding:'0px 5px 0px 5px'}}>
                                        <Button style={{background:'hsla(321, 32%, 37%, 1.00)'}} component='label' variant="contained" fullWidth>
                                            Change Icon
                                        <input onChange={handleChange} type="file" hidden multiple />
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    )
                } 
            




                const showFoodInterface=()=>{
                     return(

                <Grid container spacing={1}>
                        <Grid size={12} >
                            <div className={classes.heading} >
                                <div className={classes.titleBox}>
                                    <div className={classes.titleStyle} >HungerBuddy</div>
                                    <div className={classes.subTitleStyle} >Edit Food Item</div>
                            </div>  
                            <div style={{marginLeft:'auto'}} >
                                <IconButton onClick={handleCloseDialog}>
                                <CloseIcon style={{color:'#fff'}} />
                                </IconButton>
                            </div>
                            </div>
                        </Grid>
                        <Grid size={6}>
                        <div style={{padding:'10px 5px 0px 5px'}}> 
                        {/* <TextField onChange={(e)=>setBranchId(e.target.value)} fullWidth label='Branch Id' helperText={error?.branchId} error={error?.branchId} onFocus={()=>handleError('branchId',null)} /> */}
                        <FormControl fullWidth>
                                <InputLabel>Branch Name</InputLabel>
                                    <Select label="Branch Name" value={branchId} onChange={handleBranchChange} >
                                        <MenuItem value='' >-Select Branch Name-</MenuItem>
                                        { fillBranch() }
                                    </Select>
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'10px 5px 0px 5px'}}> 
                        <FormControl fullWidth>
                                <InputLabel>Category Name</InputLabel>
                                    <Select label="Category Name" value={categoryId} onChange={handleCategoryChange} >
                                        <MenuItem value='' >-Select Category Name-</MenuItem>
                                        { fillCategory() }
                                    </Select>
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}> 
                        <TextField onChange={(e)=>setFoodItemName(e.target.value)} value={foodItemName} fullWidth label='Food Name' helperText={error?.foodItemName} error={error?.foodItemName} onFocus={()=>handleError('foodItemName',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        {/* <TextField onChange={(e)=>setFoodItemType(e.target.value)} fullWidth label='Food Item Type' helperText={error?.foodItemType} error={error?.foodItemType} onFocus={()=>handleError('foodItemType',null)} /> */}
                        <FormControl fullWidth>
                                <InputLabel>Food Type</InputLabel>
                                    <Select label="Food Type"  value={foodItemType} onChange={(e)=>setFoodItemType(e.target.value)} >
                                        <MenuItem>-Select Food Type-</MenuItem>
                                        <MenuItem value="Vegetarian" >Veg</MenuItem>
                                        <MenuItem value="Non Vegetarian" >Non Veg</MenuItem>
                                        <MenuItem value="Vegan" >Vegan</MenuItem>
                                    </Select>
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        {/* <TextField onChange={(e)=>setFoodItemTaste(e.target.value)} fullWidth label='Food Item Taste' helperText={error?.foodItemTaste} error={error?.foodItemTaste} onFocus={()=>handleError('foodItemTaste',null)} /> */}
                        <FormControl fullWidth>
                                <InputLabel>Food Taste</InputLabel>
                                    <Select label="Food Taste"  value={foodItemTaste} onChange={(e)=>setFoodItemTaste(e.target.value)} >
                                        <MenuItem>-Select Food Taste-</MenuItem>
                                        <MenuItem value="Spicy" >Spicy</MenuItem>
                                        <MenuItem value="Non Spicy" >Non Spicy</MenuItem>
                                    </Select>
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setIngredients(e.target.value)} value={ingredients} fullWidth label='Ingredients' helperText={error?.ingredients} error={error?.ingredients} onFocus={()=>handleError('ingredients',null)} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setFullPrice(e.target.value)}  value={fullPrice} fullWidth label='Full Price' helperText={error?.fullPrice} error={error?.fullPrice} onFocus={()=>handleError('fullPrice',null)} />
                        </div>
                    </Grid>  
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setHalfPrice(e.target.value)}  value={halfPrice} fullWidth label='Half Price' helperText={error?.halfPrice} error={error?.halfPrice} onFocus={()=>handleError('halfPrice',null)} />
                        </div>
                    </Grid>  
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setOfferPrice(e.target.value)}  value={offerPrice} fullWidth label='Offer Price' helperText={error?.offerPrice} error={error?.offerPrice} onFocus={()=>handleError('offerPrice',null)} />
                        </div>
                    </Grid>  
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        {/* <TextField onChange={(e)=>setStatus(e.target.value)} fullWidth label='Status' helperText={error?.status} error={error?.status} onFocus={()=>handleError('status',null)} /> */}
                        <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                    <Select label="Status" value={status} onChange={(e)=>setStatus(e.target.value)} >
                                        <MenuItem>-Select Food Status-</MenuItem>
                                        <MenuItem value="Available" >Available</MenuItem>
                                        <MenuItem value="Unavailable" >Unavailable</MenuItem>
                                    </Select>
                        </FormControl>
                        </div>
                    </Grid>  
                    <Grid size={12}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setRating(e.target.value)}  value={rating} fullWidth label='Rating' helperText={error?.rating} error={error?.rating} onFocus={()=>handleError('rating',null)} />
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
            
       
    )
                }







    /*******************************************************************************/





        const fetchAllFoodItems=async()=>{
            var res=await getData('fooditems/fetch_all_fooditems')
            setFoodItemList(res.data)
        }


        useEffect(function(){
            fetchAllFoodItems()
        },[])





        const handleCancel=()=>{
                setPicture({fileName:tempImage,bytes:''})
                setStatusButton(false)
            }
        
        
            const handleEditPicture=async()=>{
                var formData=new FormData()
                formData.append('fooditemid',foodItemId)
                formData.append('createddate',getDate())
                formData.append('createdtime',getTime())
                formData.append('userid','xxx')
                formData.append('picture',picture.bytes)
               
                
                var response=await postData('fooditems/edit_picture',formData)
            
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
                fetchAllFoodItems()
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
            setFoodItemId(rowData.fooditemid)
            setBranchId(rowData.branchid)
            setCategoryId(rowData.categoryid)
            setFoodItemName(rowData.fooditemname)
            setFoodItemType(rowData.fooditemtype)
            setFoodItemTaste(rowData.fooditemtaste)
            setIngredients(rowData.ingredients)
            setFullPrice(rowData.fullprice)
            setHalfPrice(rowData.halfprice)
            setOfferPrice(rowData.offerprice)
            setStatus(rowData.status)
            setRating(rowData.rating)
            setPicture({fileName:`${serverURL}/images/${rowData.picture}`,bytes:''})
            setTempImage(`${serverURL}/images/${rowData.picture}`)
            setOpen(true)
        }



        const handleDelete=async(foodItemId)=>{
        
                
                    Swal.fire({
                    title: "Do you want to delete the selected Food Item?",
                    showCancelButton: true,
                    confirmButtonText: "Delete",
                 }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) 
                {
                    var response=await postData('fooditems/delete_fooditems',{fooditemid:foodItemId})
                    Swal.fire(response.message);
                    fetchAllFoodItems()
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
                    <Dialog open={open} onClose={handleCloseDialog} >
                        <DialogContent>
                       {dialogState==='Data'?showFoodInterface():showPictureInterface()}
                        </DialogContent>
                    </Dialog>
                </div>
            )
        }





    const displayFoodItems=()=>{
     

        return(
            <div>
                <MaterialTable
                title= {` List Of Food Items in ${branch?.branchname} `}
                                 columns={[
                                            {title:'Category', field:'categoryname'},
                                            {title:'Food Name', render:(rowData)=>(<div> {rowData.fooditemname}({rowData.fooditemtype}) </div> )},
                                            {title:'Full/Half', render:(rowData)=>(<div> &#8377;{rowData.fullprice}/&#8377;{rowData.halfprice} </div>) },
                                            {title:'Offer', render:(rowData)=>(<div> &#8377;{rowData.offerprice} </div>) },
                                            {title:'Status', field:'status'},
                                            {title:'Rating', field:'rating'},
                                            {title:'Picture', render:(rowData)=> (<div onClick={()=>handleOpenDialog(rowData,"Picture")} > <EditIconComponent image={rowData.picture} /></div>)}

                                        ]}
                
                                        data={foodItemList}
                                        actions={[   
                                                   {icon:'edit', tooltip:'Edit', onClick: (event,rowData)=> handleOpenDialog(rowData,"Data") },
                                                   {icon:'delete', tooltip:'Delete', onClick: (event,rowData)=>handleDelete(rowData.fooditemid) },
                                                   {icon:'add', tooltip:'Add Food Items', isFreeAction:true, onClick: (event)=> navigate("/branchdashboard/foodinterface") }
                                                ]}
                                                  
                                 />
            </div>
        )
    }



    return(
        <div className={classes.root} >
            <div className={classes.box}>
               {displayFoodItems()}
            </div>
               {showDialog()}
        </div>
    )
}