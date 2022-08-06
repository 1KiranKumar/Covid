import React, { useEffect, useState } from "react";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import classes from './App.module.css';
import { fetchData } from "./Api";

const App=()=>{

  const [data,setData]=useState("");
  const [country,setCountry] =useState();

  useEffect(()=>{
      async function result(){
        const fetchedData = await fetchData(); 
        setData(fetchedData);       
      }
      result();
      
    },[])

   const handleCountry=async(country)=>{
    const fetchedData=await fetchData(country);
    setCountry(country);
    
    setData(fetchedData);
   }

  return(
        <div className={classes.container}>    
     <Cards data={data}/>
    <CountryPicker fetchCountry={handleCountry}/> 
     <Chart data={data} country={country}/> 
    
    </div>
  )
}




 
 export default App;