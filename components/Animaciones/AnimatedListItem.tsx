import React, { useEffect, useRef } from "react"
import { Animated, ViewStyle } from "react-native"

type Props = {
  children: React.ReactNode;
  index: number;
  delay?: number;
  style?: ViewStyle;
  duration?: number;
}

export default function AnimatedListItem({
  children,
  index,
  delay = 50,
  style,
  duration = 250
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(20)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: duration,
        delay: index * delay,
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: duration,
        delay: index * delay,
        useNativeDriver: true
      })
    ]).start()
  }, [])

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [{ translateY }]
        },
        style
      ]}
    >
      {children}
    </Animated.View>
  )
}
