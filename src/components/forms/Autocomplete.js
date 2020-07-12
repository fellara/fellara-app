import React, { useEffect, useState, useRef } from 'react';
import {Text} from 'react-native'
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const CustomAutoComplete = (props) => {
  const [value, setValue] = useState(null);
  const [showed, setShowed] = useState(false);
  const [data, setData] = useState([{
    
  }]);

  let input = useRef()

  // const debouncedRequest = AwesomeDebouncePromise(props.loadOptions, 400);

  useEffect(() => {
    async function fetchData() {
      console.log(props.preventPreload && props.preventPreload(data));
    
      if (!props.preventPreload || !props.preventPreload(data)) {
        loadOptions('', true);
      }
    }
    fetchData();
  }, [props.preventPreload]);

  const onSelect = (index) => {
    setValue(data[index].title);
    props.onChange(data[index].id)
  };

  const loadOptions = async (query = '', fromEffect) => {
    let res = []
    if (props.loadOptions) res = await props.loadOptions(query, props.data)
    // input.current.show()
    if (!input.current.isFocused()) input.current.show()
    // if (!fromEffect && !showed) {
    //   setShowed(true)
    // }
    
    setData(res.data.results.map(d => ({id: d.id, title: d.name})));
  }

  const onChangeText = async (query) => {
    setValue(query);
    loadOptions(query)
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
    />
  );

  return (
    <Autocomplete
      placeholder={props.placeholder}
      value={value}
      onSelect={onSelect}
      ref={input}
      onChangeText={onChangeText}
    >
      {data.map(renderOption)}
    </Autocomplete>
  );
};

export default CustomAutoComplete