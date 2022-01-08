import { Dimensions } from "react-native"
import Constants from "expo-constants"

const ConstantsObj = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
  statusBarHeight: Constants.statusBarHeight
}

module.exports = ConstantsObj