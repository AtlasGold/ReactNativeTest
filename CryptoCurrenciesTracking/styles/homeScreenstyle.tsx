import { StyleSheet } from "react-native";

 const  HomeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  top:{
    flex: 1 ,
    paddingTop:50, 
    backgroundColor:'#111'
  },
  titleText:{
    color:'white',
    fontSize:24,
    fontWeight:'bold',
    padding:10

  },
  titleChart:{color:'white',marginTop:60,marginBottom:-10,marginHorizontal:0, fontSize:24}

});

export default HomeScreenStyle