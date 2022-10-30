import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NewBottomSheet, {
  NewBottomSheetRefProps,
} from "./components/newBottonSheet";
import ListCurrencies from "./components/listCurrencies";
import modalStyle from "./styles/modalStyle";
import { HomeScreenStyle } from "./styles/homeScreenstyle";
import { getCryptoData } from "./hooks/apiCrypto";
import { LinearGradient } from "expo-linear-gradient";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      const cryptoData = await getCryptoData();
      setData(cryptoData);
    };
    fetchCryptoData();
  }, []);
  const ref = useRef<NewBottomSheetRefProps>(null);

  const onPress:any = useCallback((item: null) => {
    setSelectedCoin(item);

    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  const [selectedCoin, setSelectedCoin] = useState(null);
  return (
    <GestureHandlerRootView style={HomeScreenStyle.top}>
      <View style={HomeScreenStyle.container}>
        <View>
          <Text style={HomeScreenStyle.titleText}>
            Keep an Eye on Your Cryptos ...
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
          <View style={modalStyle.insideBottomSheet}>
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
                      {" "}
                      Last Week Price{" "}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        marginTop: 60,
                        marginBottom: -10,
                        marginHorizontal: 0,
                        fontSize: 24,
                      }}
                    >
                      {" "}
                      {}{" "}
                    </Text>
                  </View>
                  <VictoryChart animate theme={VictoryTheme.material}>
                    <VictoryAxis dependentAxis></VictoryAxis>

                    <VictoryLine
                      data={selectedCoin["sparkline_in_7d"]["price"]}
                      x="timestamp"
                      y="value"
                    ></VictoryLine>
                  </VictoryChart>
                </View>
              ) : (
                <Text> Selecione Uma Moeda</Text>
              )}
            </LinearGradient>
          </View>
        </NewBottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
