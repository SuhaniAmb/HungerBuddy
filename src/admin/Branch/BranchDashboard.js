import { Grid, AppBar, Toolbar, Avatar, ListItemButton, ListItemAvatar, ListItemText, List, ListItem, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/FetchNodeServices";
import foodcategory from "../../assets/cutlery.png"
import fooditem from "../../assets/masala-dosa.png"
import logout from "../../assets/check-out.png"
import order from "../../assets/online-order.png"
import dashboard from "../../assets/dashboard.png"
import Category from "../category/Category";
import { Routes, Route } from "react-router-dom";
import DisplayAllFoodItem from "../fooditems/DisplayAllFoodItems";
import FoodInterface from "../fooditems/FoodInterface"



export default function BranchDashboard()
{

    const navigate=useNavigate()

    const sideBar=()=>{
        return(
            <div style={{background:'hsla(324, 48%, 94%, 1.00', margin:10, borderRadius:5, height:'70%'}} >
                <List sx={{ width: '100%', maxWidth: 360}}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src={dashboard} sx={{width:28, height:28}} variant="rounded" />
                        </ListItemAvatar>
                            <ListItemText primary={<div style={{fontFamily:'Quicksand'}} >Dashboard</div>} />
                    </ListItem>
                    <Divider />
                    <ListItemButton onClick={()=>navigate('/branchdashboard/category')} >
                        <ListItemAvatar>
                            <Avatar src={foodcategory} sx={{width:28, height:28}} variant="rounded" />
                        </ListItemAvatar>
                            <ListItemText primary={<div style={{fontFamily:'Quicksand'}} >Food Category</div>} />
                    </ListItemButton>
                    <ListItemButton onClick={()=>navigate('/branchdashboard/displayfooditems')} >
                        <ListItemAvatar>
                            <Avatar src={fooditem} sx={{width:28, height:28}} variant="rounded" />
                        </ListItemAvatar>
                            <ListItemText primary={<div style={{fontFamily:'Quicksand'}} >Food Items</div>} />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar src={order} sx={{width:28, height:28}} variant="rounded" />
                        </ListItemAvatar>
                            <ListItemText primary={<div style={{fontFamily:'Quicksand'}} >Orders</div>} />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar src={logout} sx={{width:28, height:28}} variant="rounded" />
                        </ListItemAvatar>
                            <ListItemText primary={<div style={{fontFamily:'Quicksand'}} >Logout</div>} />
                    </ListItemButton>
                </List>
            </div>
        )
    }

    return(
        <div style={{display:"flex", flexDirection:"column", height:'100vh'}} >
            <AppBar position="static" style={{background:'hsla(321, 32%, 37%, 1.00'}}>
                <Toolbar>
                    <div style={{fontSize:24}} >
                        HungerBuddy
                    </div>
                    <Avatar style={{width:50, height:50, marginLeft:'auto'}} alt="Remy Sharp" src={`${serverURL}/images/B.jpg`} />

                </Toolbar>
            </AppBar>
            <Grid container spacing={1} >
                <Grid size={2} style={{height:'100vh'}} >
                    {sideBar()}
                </Grid>
                <Grid size={10}>
                    <Routes>
                            <Route element={<Category/>} path='/category' />
                            <Route element={<DisplayAllFoodItem/>} path='/displayfooditems' />
                            <Route element={<FoodInterface/>} path='/foodinterface' />
                    </Routes>
                </Grid>
            </Grid>
        </div>
    )
}