import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/colors';

export default function TabBarIcon(props) {
  return (
    <AntDesign
      name={props.name}
      size={24}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
