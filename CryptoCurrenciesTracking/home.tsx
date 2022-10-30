import { StatusBar } from "expo-status-bar";
import { FlatList, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useCallback, useEffect, useRef, useState } from "react";
import NewBottomSheet, {
  NewBottomSheetRefProps,
} from "./components/newBottonSheet";
import ListCurrencies from "./components/listCurrencies";
import { ModalStyle } from "./styles/modalStyle";
import { HomeScreenStyle } from "./styles/homeScreenstyle";
import { getCryptoData } from "./hooks/apiCrypto";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";

export default function Home() {
  const [data, setData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const ref = useRef<NewBottomSheetRefProps>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      const cryptoData = await getCryptoData();
      setData(cryptoData);
    };
    fetchCryptoData();
  }, []);

  const onPress = useCallback((item: null) => {
    setSelectedCoin(item);

    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  return (
    <GestureHandlerRootView style={HomeScreenStyle.top}>
      <View style={HomeScreenStyle.container}>
        <View>
          <Text style={HomeScreenStyle.titleText}>
            Keep an Eye on Your Cryptos
          </Text>
        </View>
        <StatusBar style="light" />
        <FlatList
          keyExtractor={(item) => item["id"]}
          data={data}
          renderItem={({ item }) => (
            <ListCurrencies
              name={item["name"]}
              symbol={item["symbol"]}
              currentPrice={item["current_price"]}
              priceChangePercentage7d={
                item["price_change_percentage_7d_in_currency"]
              }
              logoURL={item["image"]}
              onPress={() => onPress(item)}
            />
          )}
        />
        <NewBottomSheet ref={ref} logo={selectedCoin?.["image"]}>
          <View style={ModalStyle.insideBottomSheet}>
            <LinearGradient
              colors={[
                "rgba(15, 15, 15, 1)",
                "rgba(15, 15, 15, 0.96)",
                "rgba(15, 15, 15, 0.87)",
              ]}
              start={{ x: 0, y: 0.75 }}
              end={{ x: 1, y: 0.25 }}
              style={{ borderRadius: 50, flex: 1 }}
            >
              {selectedCoin ? (
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={HomeScreenStyle.titleChart}>
                      Last Week Price
                    </Text>
                  </View>
                  <VictoryChart animate theme={VictoryTheme.material}>
                    <VictoryAxis
                      dependentAxis
                      style={{
                        axis: { stroke: "#CCCC" },
                        tickLabels: { fill: "#CCCC" },
                      }}
                    ></VictoryAxis>

                    <VictoryLine
                      data={selectedCoin["sparkline_in_7d"]["price"]}
                      x="timestamp"
                      y="value"
                      style={{ data: { stroke: "rgba(57, 145, 80, 1)" } }}
                    ></VictoryLine>
                  </VictoryChart>
                </View>
              ) : (
                null// Não retorna nada caso o modal demore a abrir
              )}
            </LinearGradient>
          </View>
        </NewBottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
