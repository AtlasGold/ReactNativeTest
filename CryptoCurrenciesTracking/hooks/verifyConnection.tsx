import NetInfo from "@react-native-community/netinfo";


export async function verifyConnection() {
  return (await NetInfo.fetch()).isConnected;
}