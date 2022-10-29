import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-wagmi-charts";

const Chart = ({
  currentPrice,
  logoURL,
  name,
  priceChangePercentage7d,
  sparkLine,
}: any) => {
  return (
    <View style={chartStyle.chartRoot}>
      <Text style={{ color: "white", fontSize: 20, textAlignVertical:"bottom" }}>
      
        Last Prices Of
      </Text>
      <LineChart.Provider data={sparkLine}>
        <LineChart>
          <LineChart.Path color="rgba(255, 255, 255, 0.76)" />
          <LineChart.CursorCrosshair color="white">
          <LineChart.Tooltip textStyle={{ color: "white" }}/>
      <LineChart.Tooltip position="bottom" textStyle={{ color: "white" }}>
        <LineChart.DatetimeText style={{ color: "white" }}/>
      </LineChart.Tooltip>
          </LineChart.CursorCrosshair>
        </LineChart>
      </LineChart.Provider>
    </View>
  );
};

const chartStyle = StyleSheet.create({
  chartRoot: {
    flex: 1,
    width: "90%",
    textAlignVertical:"bottom"
    
  },
  titleStyle: {
    color: "white",
    fontSize: 20,
  },
});
export default Chart;
