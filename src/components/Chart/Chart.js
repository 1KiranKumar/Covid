import React, { useEffect, useState } from "react";
import { fetchDailyData } from "../../Api";
import {Line,Bar} from 'react-chartjs-2';
import styles from './Chart.module.css'; 
import { Chart as ChartJS, Title,Tooltip,LineElement,Legend ,CategoryScale,LinearScale,PointElement,BarElement} from 'chart.js';
ChartJS.register(
    Title,Tooltip,LineElement,Legend,CategoryScale,LinearScale,PointElement,BarElement
)


const Chart=({data:{confirmed,recovered,deaths},country})=>{
    const [dailyData,setDailyData]=useState([]);
    // const {confirmed,deaths,recovered}=props.data;


    useEffect(()=>{
        const fetchApi=async()=>{
        const da=await fetchDailyData();
        setDailyData(da);   
        }
     
        fetchApi(); 
    },[]);

    const lineChart = (
        dailyData.length ? (
         <Line
            data={{
              labels: dailyData.map(( {date} ) => date),
              datasets: [{
                data: dailyData.map(({confirmed}) => confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
              }, {
                data: dailyData.map(({deaths}) => deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
              }
              ],
            }}
          />
        ) : null
      );

      const barChart=(
       confirmed
        ?(
          <Bar
          data={{
            labels:['Infected','Recovered',"Deaths"],
            datasets:[{
              label:`Current state in ${country}`,
              backgroundColor:[
                'rgb(7, 7, 246)',
                'rgb(14, 238, 14)',
                'rgb(245, 7, 7)'
              ],
              data:[confirmed,recovered,deaths]
            }]
          }}
          options={{
            Legend:{display:false},
            title:{display:true,text:`Current state in ${country}`}
          }}
          />
        ):null
      )
    

    return (
        <div className={styles.container}>             
        
        {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;