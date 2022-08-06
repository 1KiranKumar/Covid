import { FormControl, NativeSelect } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from './CountryPicker.module.css';
import { fetchCountries } from "../../Api";

const CountryPicker=(props )=>{

    const [fetchedCountries,setFetchedCountries]=useState([]);
  

    useEffect(()=>{
        const fetchApi=async()=>{
            const country=await fetchCountries();
            setFetchedCountries(country);
        }
        fetchApi();
    },[setFetchedCountries]);

    console.log(fetchedCountries);

    const selectedCountry=(event)=>{
        const chosenCountry=event.target.value;
        props.fetchCountry(chosenCountry);
    }    
   

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={selectedCountry} >
                <option value="global">Global</option>
                {fetchedCountries.map((country,i)=><option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;