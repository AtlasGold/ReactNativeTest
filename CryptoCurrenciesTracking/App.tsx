import Home from './home';
import { LogBox } from 'react-native';
export default function App() {
  LogBox.ignoreLogs(['Remote debugger']);
  return (
      <Home/>
  );
}

