import { StyleSheet, Platform } from 'react-native';
import Colors from './Colors';
import isIphoneXModel from './IsPhoneX';
import isTablet from './isTablet';
const WIDE_DEVICE = isIphoneXModel 

const fontStyles = StyleSheet.create(
  { 
    largeTitleBold: {
      fontSize: isTablet ? 40 : WIDE_DEVICE ? 38 : 34,
      fontWeight: "800",
      color: Colors.secondaryDark.alpha1
    },
    largeTitleLight: {
      fontSize: isTablet ? 40 : WIDE_DEVICE ? 38 : 34,      
      fontWeight: "700",
      color:  Colors.secondaryDark.alpha1
    },
    title1: {
      fontSize: isTablet ? 34 : WIDE_DEVICE ? 28 : 27,
      fontWeight: "700",
      color:  Colors.secondaryDark.alpha1  
    },
    title2: {
      fontSize:isTablet ? 28 : WIDE_DEVICE ? 22 : 21,
      fontWeight: "700",
      color:  Colors.secondaryDark.alpha1   
    },
    title3: {
      fontSize: isTablet ? 26 : WIDE_DEVICE ? 20 : 19,
      fontWeight: "600",
      color:  Colors.secondaryDark.alpha1
    },
    headline: {
      fontSize: isTablet ? 23 : WIDE_DEVICE ? 17 : 16,
      fontWeight: "700",
      color:  Colors.secondaryDark.alpha1
    },
    body: {
      fontSize: isTablet ? 23 : WIDE_DEVICE ? 17 : 16,
      fontWeight: Platform.OS == "ios" ? "500" : "400",
      color:  Colors.secondaryDark.alpha1
    },
    bodyLight: {
      fontSize:  isTablet ? 23 : WIDE_DEVICE ? 17 : 16,
      fontWeight: "400",
      color:  Colors.secondaryDark.alpha1
    },
    calloutBold: {
      fontSize: isTablet ? 22 : WIDE_DEVICE ? 16 : 15,
      fontWeight: "600",
      color:  Colors.secondaryDark.alpha1
    },
    calloutLight: {
      fontSize: isTablet ? 22 : WIDE_DEVICE ? 16 : 15,
      fontWeight: "400",
      color:  Colors.secondaryDark.alpha1
    },
    subhead: {
      fontSize: isTablet ? 21 : WIDE_DEVICE ? 15 : 14,
      fontWeight: "400",
      color:  Colors.secondaryDark.alpha1
    },
    subhead2: {
      fontSize: isTablet ? 21 : WIDE_DEVICE ? 14 : 13,
      fontWeight: "600",
      color:  Colors.secondaryDark.alpha1
    },
    footnoteBold: {
      fontSize: isTablet ? 19 : WIDE_DEVICE ? 13 : 12,
      fontWeight: "700",
      color:  Colors.secondaryDark.alpha1
    },
    footnoteLight: {
      fontSize: isTablet ? 19 : WIDE_DEVICE ? 13 : 12,
      fontWeight: "400",
      color:  Colors.secondaryDark.alpha1
    },
    caption1: {
      fontSize: isTablet ? 18 : WIDE_DEVICE ? 12 : 11,
      fontWeight: "500",
      color:  Colors.secondaryDark.alpha1
    },
    caption2: {
      fontSize: isTablet ? 17 : WIDE_DEVICE ? 11 : 11,
      fontWeight: "500",
      color:  Colors.secondaryDark.alpha1
    }
});

export default fontStyles

  