import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { currencyCard } from "../styles/currenyListStyle";
import { LinearGradient } from "expo-linear-gradient";

const ListCurrencies = ({
  name,
  symbol,
  currentPrice,
  priceChangePercentage7d,
  logoURL,
  onPress,
}: {
  name: string;
  symbol: string;
  currentPrice: number;
  priceChangePercentage7d: number;
  logoURL: string;
  onPress: any;
}) => {
  /* Para Mudar a cor dos cartões de acordo com a taxa da crypto */
  const ChangeColor = priceChangePercentage7d > 0 ? "#1db47c" : "#b44754";
  const gradientColor =
    priceChangePercentage7d > 0
      ? [
          "rgba(32, 31, 31, 0.3)",
          "rgba(32, 31, 31, 0.61)",
          "rgba(3, 130, 98, 0.27)",
        ]
      : [
          "rgba(32, 31, 31, 0.3)",
          "rgba(32, 31, 31, 0.61)",
          "rgba(166, 8, 8, 0.28)",
        ];

  return (
    <TouchableOpacity onPress={onPress} style={{ borderRadius: 1 }}>
      <LinearGradient
        colors={gradientColor}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          marginHorizontal: 30,
          marginVertical: 10,
          borderRadius: 20,
         
          elevation: 1,
        }}
      >
        <View style={currencyCard.rootContainer}>
          {/* Lado Esquerdo */}
          <View style={currencyCard.leftContent}>
            <Image source={{ uri: logoURL }} style={currencyCard.image} />
            <View>
              <Text style={currencyCard.currencyTitle}>
                {symbol.toUpperCase()}
              </Text>
              <Text style={currencyCard.currencySubtitle}>{name}</Text>
            </View>
          </View>

          {/* Lado Direito */}
          <View>
            <View style={currencyCard.rigthContent}>
              <Text style={currencyCard.currencyTitle}>
                ${currentPrice.toFixed(3)}
              </Text>
              <Text
                style={[currencyCard.currencySubtitle, { color: ChangeColor }]}
              >
                {priceChangePercentage7d.toFixed(3)}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ListCurrencies;
