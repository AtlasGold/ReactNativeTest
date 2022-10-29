import axios from "axios"
import moment from "moment"
import { SampleData } from "../assets/data/sampleData";

//para cada item respondido da API fazer um push no valor convertido
const formatSparkline = (numbers: any[]) => {
    const sevenDaysAgo = moment().valueOf();
    let formattedSparkline = numbers.map((item: any,index: number) => {
        return{
            timestamp: sevenDaysAgo + (index + 1 )* 3600,//converte para segundos
            value: item,
        } 
    })
    let newDate = (new Date(formattedSparkline[0].timestamp).toLocaleDateString())

    return formattedSparkline
}

const fixFormatData = (data:any) => {
    let formattedResponse:any = [];

    data.forEach((item: any) => {
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)

        const formattedItem = {
            ...item,
            sparkline_in_7d:{
                price: formattedSparkline
            }
        }
             
        formattedResponse.push(formattedItem)
    });

    return formattedResponse
}

export const getCryptoData = async () => {
    try{        //chamada da api
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=150&page=1&sparkline=true&price_change_percentage=7d")
        const result = response.data;
        const formatedResponse = fixFormatData(result);
        return formatedResponse
    }catch(err){
        return SampleData
    }
}