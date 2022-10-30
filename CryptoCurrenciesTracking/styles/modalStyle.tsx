import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

 const modalStyle = StyleSheet.create({
  bottomSheetContainer: 
  {
    zIndex: 1,
    width: "100%",
    elevation: 24,
    top: SCREEN_HEIGHT,
    shadowRadius: 16.0,
    shadowColor: "#ccc",
    shadowOpacity: 0.58,
    position: "absolute",
    height: SCREEN_HEIGHT,
    backgroundColor: "transparent",
    shadowOffset:
    {
      width: 0,
      height: 12,
    },

  },

  insideBottomSheet:
  {
    flex: 1, 
    borderRadius:50,
    backgroundColor: 'transparent'

  },
  
  image: 
  { 
    zIndex: 1,
    marginTop: -40,
    borderRadius:50,
    position: "absolute",
    resizeMode: "contain",
    marginHorizontal: 143,    
    width: 100, height: 100
   
  },
});
export default modalStyle