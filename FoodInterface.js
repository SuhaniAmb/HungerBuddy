import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useState } from "react"
import { postData, getData, getDate, getTime } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import burger from '../../assets/burger.png'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect } from "react";
import SaveIcon from '@mui/icons-material/Save'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'



const useStyle=makeStyles((theme)=>({

     root:
    {
        display:'flex',
        justifyContent:'center',
        width:'100%',
        //height:'100%'
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
        padding:'10px',
    }
}))

export default function FoodInterface()
{

        var classes=useStyle()
        var branch=JSON.parse(localStorage.getItem('Branch'))

        const [categoryId,setCategoryId]=useState('')
        const [categoryIdList,setCategoryIdList]=useState([])
        const [branchId,setBranchId]=useState('')
        const [branchIdList,setBranchIdList]=useState([])
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



        const fetchBranch=async()=>{
            var res=await getData('fooditems/fetch_branch')
            console.log('fetch  bbbbbbbbbbbbbbbbbbbbbbbbb',res.data)
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
            console.log("Fetched Categoriessssssssssssssssssss", res.data);

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

   
    const handleChange=(e)=>{
        setPicture({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})

    }



        const [error,setError]=useState({})

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
            if(picture.bytes.length===0)
            {
                setError((prev)=>({...prev,'picture':'Pls Upload Picture.'}))
                isError=true
            }
            return isError
        }



        const handleClick= async()=>{
              
                var err=validation()
                if(err===false)
                {
                    var formData=new FormData()
                    formData.append('categoryid',categoryId)
                    formData.append('branchid',branchId)
                    formData.append('fooditemname',foodItemName)
                    formData.append('fooditemtype',foodItemType)
                    formData.append('fooditemtaste',foodItemTaste)
                    formData.append('ingredients',ingredients)
                    formData.append('fullprice',fullPrice)
                    formData.append('halfprice',halfPrice)
                    formData.append('offerprice',offerPrice)
                    formData.append('status',status)
                    formData.append('rating',rating)
                    formData.append('picture',picture.bytes)
                    formData.append('createddate',getDate())
                    formData.append('createdtime',getTime())
                    formData.append('userid','xxxxx')


        
                var response=await postData('fooditems/submit_fooditems',formData)
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
              
            }
        


      
    return(

        <div className={classes.root} >
            <div className={classes.box} >
                <div className={classes.heading} >
                    <div className={classes.titleBox} >
                    <div className={classes.subTitleStyle} >New Food Item {branch?.branchname} </div>
                    </div>
                </div>
                <Grid container spacing={1}>
                     <Grid size={4}>
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
                    <Grid size={4}>
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
                    <Grid size={4}>
                        <div style={{padding:'10px 5px 0px 5px'}}> 
                        <TextField onChange={(e)=>setFoodItemName(e.target.value)} fullWidth label='Food Name' helperText={error?.foodItemName} error={error?.foodItemName} onFocus={()=>handleError('foodItemName',null)} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        {/* <TextField onChange={(e)=>setFoodItemType(e.target.value)} fullWidth label='Food Item Type' helperText={error?.foodItemType} error={error?.foodItemType} onFocus={()=>handleError('foodItemType',null)} /> */}
                        <FormControl fullWidth>
                                <InputLabel>Food Type</InputLabel>
                                    <Select label="Food Type" value={foodItemType} onChange={(e)=>setFoodItemType(e.target.value)} >
                                        <MenuItem>-Select Food Type-</MenuItem>
                                        <MenuItem value="Veg" >Veg</MenuItem>
                                        <MenuItem value="Non Veg" >Non Veg</MenuItem>
                                        <MenuItem value="Vegan" >Vegan</MenuItem>
                                    </Select>
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        {/* <TextField onChange={(e)=>setFoodItemTaste(e.target.value)} fullWidth label='Food Item Taste' helperText={error?.foodItemTaste} error={error?.foodItemTaste} onFocus={()=>handleError('foodItemTaste',null)} /> */}
                        <FormControl fullWidth>
                                <InputLabel>Food Taste</InputLabel>
                                    <Select label="Food Taste" value={foodItemTaste} onChange={(e)=>setFoodItemTaste(e.target.value)} >
                                        <MenuItem>-Select Food Taste-</MenuItem>
                                        <MenuItem value="Spicy" >Spicy</MenuItem>
                                        <MenuItem value="Non Spicy" >Non Spicy</MenuItem>
                                    </Select>
                        </FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setIngredients(e.target.value)} fullWidth label='Ingredients' helperText={error?.ingredients} error={error?.ingredients} onFocus={()=>handleError('ingredients',null)} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setFullPrice(e.target.value)} fullWidth label='Full Price' helperText={error?.fullPrice} error={error?.fullPrice} onFocus={()=>handleError('fullPrice',null)} />
                        </div>
                    </Grid>  
                    <Grid size={4}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setHalfPrice(e.target.value)} fullWidth label='Half Price' helperText={error?.halfPrice} error={error?.halfPrice} onFocus={()=>handleError('halfPrice',null)} />
                        </div>
                    </Grid>  
                    <Grid size={4}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setOfferPrice(e.target.value)} fullWidth label='Offer Price' helperText={error?.offerPrice} error={error?.offerPrice} onFocus={()=>handleError('offerPrice',null)} />
                        </div>
                    </Grid>  
                    <Grid size={4}>
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
                    <Grid size={4}>
                        <div style={{padding:'0px 5px 0px 5px'}}>
                        <TextField onChange={(e)=>setRating(e.target.value)} fullWidth label='Rating' helperText={error?.rating} error={error?.rating} onFocus={()=>handleError('rating',null)} />
                        </div>
                    </Grid> 
                    <Grid size={2} style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ padding: "10px 5px 0px 5px" }}>
                            <img  src={picture.fileName} alt='Food Item' style={{ width: 40, borderRadius:5 }} />
                        </div>
                    </Grid> 
                    <Grid size={2}>
                       <div style={{ padding: "0px 5px 0px 5px" }}>
                            <IconButton style={{color:'hsla(321, 32%, 37%, 1.00)', display:'flex', flexDirection:'column', alignItems:'center'}} component='label'>
                            <CloudUploadIcon style={{fontSize:34}} />
                            <div style={{fontSize:12}} >Upload</div>
                        <input onChange={handleChange} type="file" hidden multiple />
                        </IconButton>
                        </div>
                    </Grid>
                    
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 0px 5px',display:'flex',justifyContent:'center', alignItems:'center'}}>
                        <IconButton onClick={handleClick} style={{color:'hsla(321, 32%, 37%, 1.00', display:'flex',flexDirection:'column'}} >
                            <SaveIcon style={{fontSize:34}} />
                            <div style={{fontSize:12}}>Save</div>
                        </IconButton>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{padding:'0px 5px 5px 5px', display:'flex', justifyContent:'center'}}>
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