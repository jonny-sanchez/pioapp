import { useEffect, useRef } from "react";
import { ImageSourcePropType, View, Animated, Easing } from "react-native";

type BoxImageAnimatedFloatProps = {
  img: ImageSourcePropType;
  width?: number;
  height?: number;
};

export default function BoxImageAnimatedFloat({
  img,
  width = 50,
  height = 50,
}: BoxImageAnimatedFloatProps) {

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -8,              // sube poquito
          duration: 350,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,               // baja
          duration: 350,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop(); // cleanup
  }, []);

  return (
    <View style={{ width, height }}>
      <Animated.Image
        source={img}
        resizeMode="contain"
        style={{
          width: "100%",
          height: "100%",
          transform: [{ translateY }],
        }}
      />
    </View>
  );
}
