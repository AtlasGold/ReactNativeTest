import axios from "axios";
import moment from "moment";
import _ from "lodash";
//para cada item respondido da API fazer um push no valor convertido
const formatSparkline = (numbers: any[]) => {
  const sevenDaysAgo = moment().subtract(7, "minutes").unix();
  let formattedSparkline = numbers.map((item: string, index: number) => {
    return {
      timestamp: sevenDaysAgo + (index + 1) * 3600, //converte para segundos
      value: item,
    };
  });

  return formattedSparkline;
};
//função para trocar o objeto retornado pela API pelo formatSparkline criado acima
const fixFormatData = (data: any) => {
  let formattedResponse: any = [];

  data.forEach((item: any) => {
    const formattedSparkline = formatSparkline(item.sparkline_in_7d.price);

    const formattedItem = {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkline,
      },
    };

    formattedResponse.push(formattedItem);
  });

  return formattedResponse;
};

export const getCryptoData = async () => {
  try {
    //chamada da api
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d"
    );
    const result = response.data;
    const formatedResponse = fixFormatData(result);

    //Remove os items sem utilidades do json
    const simplifiedResponse :any= 
      _.map(formatedResponse, (formatedResponse) =>//, "symbol", "current_price", "price_change_percentage_7d_in_currency","image"
        _.pick(formatedResponse, ["id", "symbol","name", "current_price", "price_change_percentage_7d_in_currency","image","sparkline_in_7d"])
      )
    ;
    return simplifiedResponse;
  } catch (err) {
    console.error(err);
  }
};
