import moment from "moment";
import _ from "lodash";
//para cada item respondido da API fazer um push no valor convertido
export const formatSparkline = (numbers: Array<string>) => {
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
export const fixDataFormat = (data: Array<number>) => {
  let formattedResponse: object[] = [];


  data.forEach((item: any): void => {
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
