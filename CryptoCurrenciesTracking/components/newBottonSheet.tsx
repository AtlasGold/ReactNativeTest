import { Dimensions, Image } from "react-native";
import React, { useCallback, useImperativeHandle } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import modalStyle from "../styles/modalStyle";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

type NewBottomSheetProps = {
  children?: React.ReactNode;
  logo?: string;
};

export type NewBottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};
const NewBottomSheet = React.forwardRef<
  NewBottomSheetRefProps,
  NewBottomSheetProps
>(({ children, logo }, ref) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination: number) => {
    "worklet";
    active.value = destination !== 0;

    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
    scrollTo,
    isActive,
  ]);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(0);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

  const rNewBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[modalStyle.bottomSheetContainer, rNewBottomSheetStyle]}
      >
        <Image source={{ uri: logo }} style={modalStyle.image} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
});

export default NewBottomSheet;
