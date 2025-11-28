import { Grid, AppBar, Toolbar, Avatar, ListItemButton, ListItemAvatar, ListItemText, List, ListItem, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/FetchNodeServices";
import logout from "../../assets/check-out.png"
import branch from "../../assets/branch.png"
import batch from "../../assets/batch.png"
import section from "../../assets/section.png"
import student from "../../assets/student.png"
import employee from "../../assets/employee.png"
import delivery from "../../assets/delivery.png"
import dashboard from "../../assets/dashboard.png"
import { Routes, Route } from "react-router-dom";
import Branch from "../Branch/Branch";
import Batch from "../batch/Batch"
import Section from "../section/Section"
import StudentInterface from "../students/StudentInterface";
import DisplayAllStudent from "../students/DisplayAllStudent";
import EmployeeInterface from "../employees/EmployeeInterface";
import DisplayAllEmployee from "../employees/DisplayAllEmployee";
import DeliveryboyInterface from "../deliveryboy/DeliveryboyInterface";
import DisplayDeliveryboy from "../deliveryboy/DisplayDeliveryboy";





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
                    <ListItemButton onClick={()=>navigate('/admindashboard/branch')} >
                        <ListItemAvatar>
                            <Avatar src={branch} sx={{width:28, height:28}} variant="rounded" />
                        </ListItemAvatar>
                            <ListItemText primary={<div style={{fontFamily:'Quicksand'}} >Branch</div>} />
                    </ListItemButton>
                    <ListItemButton onClick={()=>navigate('/admindashboard/batch')} >
                        <ListItemAvatar>
                            <Avatar src={batch} sx={{width:28, height:28}} variant="rounded" />
                        </ListItemAvatar>
                            <ListItemText primary={<div style={{fontFamily:'Quicksand'}} >Batch</div>} />
                    </ListItemButton>
                    <ListItemButton onClick={()=>navigate('/admindashboard/section')} >
                        <ListItemAvatar>
                            <Avatar src={section} sx={{width:28, height:28}} variant="rounded" />
                        </ListItemAvatar>
                            <ListItemText primary={<div style={{fontFamily:'Quicksand'}} >Sections</div>} />
                    </ListItemButton>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displaystudent')} >
                        <ListItemAvatar>
                            <Avatar src={student} sx={{width:28, height:28}} variant="rounded" />
                        </ListItemAvatar>
                            <ListItemText primary={<div style={{fontFamily:'Quicksand'}} >Students</div>} />
                    </ListItemButton>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displayemployee')} >
                        <ListItemAvatar>
                            <Avatar src={employee} sx={{width:28, height:28}} variant="rounded" />
                        </ListItemAvatar>
                            <ListItemText primary={<div style={{fontFamily:'Quicksand'}} >Employees</div>} />
                    </ListItemButton>
                    <ListItemButton onClick={()=>navigate('/admindashboard/displaydeliveryboy')} >
                        <ListItemAvatar>
                            <Avatar src={delivery} sx={{width:28, height:28}} variant="rounded" />
                        </ListItemAvatar>
                            <ListItemText primary={<div style={{fontFamily:'Quicksand'}} >Delivery</div>} />
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
                            <Route element={<Branch/>} path='/branch' />
                            <Route element={<Batch/>} path='/batch' />
                            <Route element={<Section/>} path='/section' />
                            <Route element={<StudentInterface/>} path='/studentinterface' />
                            <Route element={<DisplayAllStudent/>} path='/displaystudent' />
                            <Route element={<EmployeeInterface/>} path='/employeeinterface' />
                            <Route element={<DisplayAllEmployee/>} path='/displayemployee' />
                            <Route element={<DeliveryboyInterface/>} path='/deliveryboyinterface' />
                            <Route element={<DisplayDeliveryboy/>} path='/displaydeliveryboy' />

                            
                    </Routes>
                </Grid>
            </Grid>
        </div>
    )
}