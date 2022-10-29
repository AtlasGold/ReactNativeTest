
import { StyleSheet } from "react-native";

export const currencyCard = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    marginHorizontal: 10,
    marginVertical:10,
    
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color:"white",
    marginTop:-18
  },
  currencySubtitle: {
    fontSize: 16,
    color: "#949494",
    marginBottom:-15,
    marginTop:5
  },
  image: {
    height: 48,
    width: 48,
    resizeMode: "contain",
    marginRight: 20,
    marginLeft:-15,
    borderColor:'transparent',
    color:"white"
  },

  rigthContent: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
});