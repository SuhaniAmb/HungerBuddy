import SectionInterface from "./SectionInterface";
import DisplayAllSection from "./DisplayAllSection";
import { useState } from "react";



export default function Section()
{
    const [refresh,setRefresh]=useState(false)
    
    return(
        <div>
            <SectionInterface refresh={refresh} setRefresh={setRefresh} />
            <DisplayAllSection refresh={refresh} setRefresh={setRefresh} />
        </div>
    )
}