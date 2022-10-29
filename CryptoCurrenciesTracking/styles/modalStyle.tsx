import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

 const modalStyle = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    top: SCREEN_HEIGHT,
    zIndex: 1,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },

  insideBottomSheet:{
    flex: 1, 
    backgroundColor: 'transparent',
    borderRadius:50
  },
  
  image: {
    position: "absolute",
    resizeMode: "contain",
    width: 100, height: 100,
    marginHorizontal: 143,
    marginTop: -40,
    zIndex: 1,
    borderRadius:50
  },
});
export default modalStyle