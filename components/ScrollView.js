import React from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedGestureHandler, withSpring} from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import {clamp} from '../utils/Helper';

const {width,height} = Dimensions.get('screen')


export default function ScrollView (props) {
  const animVal = useSharedValue(0)

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_,ctx)=>{
      console.log('started')
      if(ctx.currentIndex == null){
        ctx.currentIndex = 0
      }
      ctx.x = ctx.final ? clamp(ctx.final, (props.data.length - 1) * -width * 0.8, 0 ) :  animVal.value
    },
    onActive: (event,ctx)=>{
      animVal.value = ctx.x + event.translationX
    },
    onEnd: (event, ctx) => {
      if(event.translationX > 0){
        if(ctx.final < 0){
          ctx.currentIndex--
        }
      }else{
        if(ctx.final > (-width * 0.8 * (props.data.length - 1))){
          ctx.currentIndex ++
        }
      }
      ctx.final = ctx.currentIndex * - width * 0.8
      animVal.value = withSpring(ctx.currentIndex * - width * 0.8)
    }
  })

  return(
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={styles.container}>
        {
          props.data.map((item, index)=>props.renderItem(item,index))
        }
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  }
})