import React, {useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

const CustomSelect = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(
    new IndexPath(props.options.map(option => option.value).indexOf(props.value || props.default) || 0)
  );

  const handleSelect = (index) => {
    const idx = index.row
    
    setSelectedIndex(index);
    if (props.onChange) props.onChange(props.options[idx].value)
  }

  return (
    <>
      <Select
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
        placeholder={props.placeholder}
        value={props.options[selectedIndex.row]?.title}
        disabled={props.disabled}
      >
        {props.options.map(option => <SelectItem key={option.value} title={option.title} />)}
      </Select>
    </>
  );
};

export default CustomSelect
