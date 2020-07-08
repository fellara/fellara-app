import React, {useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

const CustomSelect = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(
    new IndexPath(props.options.map(option => option.value).indexOf(props.default) || 0)
  );

  useEffect(() => {
    console.log(props);
  }, [props.options, props.default])

  const handleSelect = (index) => {
    console.log(props.options[index].value, index);
    
    setSelectedIndex(index);
    if (props.onChange) props.onChange(props.options[index - 1].value)
  }

  return (
    <>
      <Select
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
        placeholder={props.placeholder}
        value={props.options[selectedIndex.row]?.title}
      >
        {props.options.map(option => <SelectItem key={option.value} title={option.title} />)}
      </Select>
    </>
  );
};

export default CustomSelect
