import axios from "axios";
import _ from "lodash";
import { fixDataFormat } from "./formatApiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

function verifyConnection() {
  let isConnected;
  NetInfo.fetch().then((state) => {
    isConnected = state.isConnected;
  });
  return isConnected;
}

export const getCryptoData = async () => {
  try {
    if (verifyConnection()) {
      /* 
        Chamada da API com axios
      */
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d"
      );
      const result = response.data;
      const formatedResponse = fixDataFormat(result);

      /*
       * Remove do array de objetos os valores que não são ultilizados em nenhum
       * local do projeto
       */
      const simplifiedResponse: object = _.map(
        formatedResponse,
        (formatedResponse) =>
          _.pick(formatedResponse, [
            "id",
            "symbol",
            "name",
            "current_price",
            "price_change_percentage_7d_in_currency",
            "image",
            "sparkline_in_7d",
          ])
      );

      /*
       * Caso o usuário esteja conectado, adiciona a resposta da função getCryptoData
       * ao LocalStorage
       */
      const insertBackup = JSON.stringify(simplifiedResponse);
      await AsyncStorage.setItem("@crypto_local_storage_key", insertBackup);

      return simplifiedResponse;
    } else {
      /*
       * Quando o usuário estiver sem conexão o valor retornado será aquele guardado na memoria
       * na ultima vez que o usuário ultilizou o app com sucesso
       */
      const getBackup = await AsyncStorage.getItem("@storage_Key");
      let retrievedValues = getBackup != null ? JSON.parse(getBackup) : null;

      return retrievedValues;
    }
  } catch (err) {
    console.error(err);
  }
};
