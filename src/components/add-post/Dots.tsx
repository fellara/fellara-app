import React, { useState, useEffect } from 'react';
import {
  Animated,
  Text,
  View,
  Platform,
  AppState,
  Easing,
  ViewProps,
} from 'react-native';

import {getRandomFloat} from '../../utils'

const UpAndDown = ({
  easing = Easing.ease,
  delay,
  transformation,
  children,
}: any) => {
  const [base] = useState(new Animated.Value(0));
  const [stateApp, setAppState] = useState<any>(undefined);
  React.useEffect(() => {
    AppState.addEventListener('change', setAppState);
    return () => AppState.removeEventListener('change', setAppState);
  }, []);
  React.useEffect(() => {
    const anim = Animated.sequence([
      Animated.delay(delay),
      Animated.loop(
        Animated.timing(base, {
          toValue: 1,
          duration: 2000,
          easing,
          useNativeDriver: Platform.OS !== 'web',
        })
      ),
    ]);
    anim.start();
    return () => anim.stop();
  }, [stateApp]);
  const translateY = base.interpolate({
    inputRange: [0, 0.45, 0.55, 1],
    outputRange: [5, -5, -5, 5],
  });
  const translateX = base.interpolate({
    inputRange: [0, 0.45, 0.55, 1],
    outputRange: [-3, 0, 0, -3],
  });
  const rotate = base.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const skewX = base.interpolate({
    inputRange: [0, 0.45, 0.55, 1],
    outputRange: ['0deg', '-5deg', '5deg', '0deg'],
  });
  const scale = base.interpolate({
    inputRange: [0, 0.45, 0.55, 1],
    outputRange: [1, 0.6, 0.6, 1],
  });
  const opacity = base.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 1, 0.6],
  });
  const transform: any = [];
  let opacityAnim: boolean = false;
  const trsf = (Array.isArray(transformation)
    ? transformation
    : [transformation]
  ).forEach(trsf => {
    switch (trsf) {
      case 'translateY':
        transform.push({ translateY });
        break;
      case 'scale':
        transform.push({ scale });
        break;
      case 'rotate':
        transform.push({ rotate });
        break;
      // case 'skew':
      //   transform.push({ skewX, skewY: skewX });
      //   break;
      case 'translateX':
        transform.push({ translateX });
        break;
      case 'opacity':
        opacityAnim = true;
        break;
      default:
        transform.push({ translateY });
    }
  });
  return (
    <Animated.View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          width: 0,
          top: -50,
          transform,
          position: 'absolute',
        },
        opacityAnim ? { opacity } : undefined,
      ]}>
      {children}
    </Animated.View>
  );
};

interface DotProps {
  color?: string;
  size?: number;
}
const dotSize = 250;
const dotColor = 'rgba(0, 0, 0, 0.09)';
const Dot = ({ color, size }: DotProps) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: (size || 0) / 2,
      backgroundColor: color,
    }}
  />
);
Dot.defaultProps = {
  color: dotColor,
  size: dotSize,
};


const ContainerContent = (props: View['props']) => (
  <View
    style={{
      flexDirection: 'row',
    }}
    {...props}
  />
);

type Transformation = 'scale' | 'translateY' | 'translateX' | 'opacity' | 'skew';

interface TypingProps {
  transformation?: Transformation | Transformation[];
  renderDot?: (props?: DotProps) => React.ReactNode;
  dotProps?: DotProps;
  containerProps?: ViewProps;
  containerContentProps?: ViewProps;
}
const Typing = ({
  transformation,
  renderDot,
  dotProps,
  containerContentProps,
  containerProps,
}: TypingProps) => (
    <ContainerContent {...containerContentProps}>
        {[0, 329, 658].map((delay: number) => (
        <UpAndDown {...{ transformation, delay }} key={delay}>
            {renderDot!(dotProps)}
        </UpAndDown>
        ))}
    </ContainerContent>
);
Typing.defaultProps = {
  renderDot: (props: DotProps) => <Dot {...props} />,
  transformation: 'translateY',
};

export default () => (
    <Typing transformation={['translateY', 'translateX', 'scale', 'opacity', 'skew', 'rotate']} />
);
