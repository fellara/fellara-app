import React from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

const CustomSelect = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(
    new IndexPath(props.options.map(option => option.value).indexOf(props.default) || 0)
  );

  const handleSelect = (index) => {
    setSelectedIndex(index);
    if (props.onSelect) props.onSelect(props.options[index].value)
  }

  return (
    <>
      <Select
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
        placeholder={props.placeholder}
        value={props.options[selectedIndex.row].title}
      >
        {props.options.map(option => <SelectItem key={option.value} title={option.title} />)}
      </Select>
    </>
  );
};

export default CustomSelect
