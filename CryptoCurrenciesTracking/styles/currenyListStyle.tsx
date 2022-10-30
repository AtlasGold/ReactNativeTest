import { StyleSheet } from "react-native";

export const CurrencyCardStyle = StyleSheet.create({
  rootContainer: {
    height: 70,
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },

  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  currencyTitle: {
    fontSize: 20,
    color: "white",
    marginTop: -18,
    fontWeight: "bold",
  },

  currencySubtitle: {
    fontSize: 16,
    color: "#949494",
    marginBottom: -15,
  },

  image: {
    width: 48,
    height: 48,
    color: "white",
    marginRight: 20,
    marginLeft: -15,
    resizeMode: "contain",
    borderColor: "transparent",
  },

  rigthContent: {
    alignItems: "flex-end",
    flexDirection: "column",
  },
});
