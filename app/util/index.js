import { Dimensions, Platform } from 'react-native';

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;

const basePx = 375;

export function px2dp(px) {
  return (px * deviceWidth) / basePx;
}

export const isIOS = Platform.OS === 'ios';