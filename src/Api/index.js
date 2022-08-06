import axios from 'axios';

 const url='https://covid19.mathdro.id/api';


export const fetchData= async(country)=>{    
    let changeableUrl=url;

    if(country){
        changeableUrl=`${url}/countries/${country}`;
    }

    try{
        // const response= await axios.get(changeableUrl);           

        // const modifiedData= {
        //     confirmed:response.data.confirmed,
        //     recovered:response.data.recovered,
        //     deaths:response.data.deaths,
        //     lastUpdate:response.data.lastUpdate
        // }
        const {data}=await axios.get(changeableUrl );
        const modifiedData={
            confirmed:data.confirmed.value,
            recovered:data.recovered.value,
            deaths:data.deaths.value,
            lastUpdate:data.lastUpdate
        }
        
        return modifiedData;


    }catch(err){
        console.log(err);
    }  

}

export const fetchDailyData=async()=>{
    try{
        const {data}=await axios.get(`${url}/daily`);

        const modifiedDatas=data.map((dailydata)=>({
            confirmed:dailydata.confirmed.total,
            deaths:dailydata.deaths.total,
            date:dailydata.reportDate   
        }))
       return modifiedDatas;
    
    }
    catch(err){
        console.log(err);
    }
}

export const fetchCountries=async()=>{
    try{
        const res=await axios.get(`${url}/countries`);
       const allCountries=res.data.countries;
       return allCountries.map((country)=>country.name)
    }
    catch(err){
        console.log(err);
    }
}



