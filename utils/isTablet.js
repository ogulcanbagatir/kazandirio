import {Dimensions} from 'react-native';
let isTablet = false
if(Dimensions.get("window").width > 490){
  isTablet = true
}
export default isTablet
