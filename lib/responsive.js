import { Dimensions, Platform, StatusBar } from 'react-native';
import { isIphoneX } from "react-native-iphone-x-helper";

const { width, height } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android'

const deviceHeight = isIphoneX()
  ? height - 78 // iPhone X style SafeAreaView size in portrait
  : Platform.OS === 'android'
    ? height - StatusBar.currentHeight
    : height;

function RV(value) {
  const realScreenSize = (deviceHeight * width)
  const standardSize = 375 * 812
  // const result = (value * realScreenSize) / standardSize
  var multiple = 1.0
  if (height < 812 && width > 375) {
    multiple = (1.0 * width) / (isAndroid ? 385 : 375)
  } else if (height < 812) {
    multiple = 1.1
  }
  const result = (value * height) / 820
  return Math.round(result * multiple)
}

function RVW(value) {
  const result = (value * width) / 375
  return Math.round(result)
}

export { RV, RVW }