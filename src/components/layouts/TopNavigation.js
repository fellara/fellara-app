import React from 'react';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { View } from 'react-native';
import { useMediaQuery } from 'react-responsive'

import layouts, {MAX_WIDTH, POSTS_LIST_PADDING} from '../../constants/layouts'

const BackIcon = (props) => (
  !props.noBack
    ? <Icon {...props} name='arrow-back'/>
    : <Icon />
);

const renderBackAction = (props) => {
  return (
    
    <TopNavigationAction icon={BackIcon} 
      onPress={props.onBack}
    />
  )
};

const renderNoBack = (props) => {
  return (
    <View style={{
      marginLeft: 10,
    }} />
  )
};

const renderAccessoryLeft = (props) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      {!props.noBack ? renderBackAction(props) : renderNoBack()}
      {props.accessoryLeft && props.accessoryLeft}
    </View>
  )
};

const CustomTopNavigation = (props) => {
    const isDesktopOrLaptop = useMediaQuery({
      query: '(min-device-width: 1224px)'
    })

    const style = isDesktopOrLaptop ? {
      paddingHorizontal: (layouts.window.width - MAX_WIDTH) / 2 - POSTS_LIST_PADDING
    } : {}
    
    return (<TopNavigation
        accessoryLeft={() => renderAccessoryLeft(props)}
        accessoryRight={props.accessoryRight && props.accessoryRight}
        title={props.title}
        onBack={props.onBack}
        style={{
          ...style
        }}
    />
)};

export default CustomTopNavigation