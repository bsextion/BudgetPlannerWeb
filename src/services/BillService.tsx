import axios from 'axios';
import * as React from "react";

 export function getAllBills(){
     // @ts-ignore
     const billData = [];
     axios.get(`/bill/`)
    .then(res => {
        billData.push(res.data);
        })

    .catch(function(error){
        console.log(error);
    });
    // @ts-ignore
    return billData;
  }
