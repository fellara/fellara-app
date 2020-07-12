import React, { useEffect, useState, useRef } from 'react';
import {Text} from 'react-native'
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const CustomAutoComplete = (props) => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([{}]);

  let input = useRef()

  // const debouncedRequest = AwesomeDebouncePromise(props.loadOptions, 400);

  useEffect(() => {
    async function fetchData() {
      if (!props.preventPreload || !props.preventPreload(data)) {
        loadOptions(props.value || props.default || '', true);
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
    console.log(query);
    
    if (props.loadOptions) res = await props.loadOptions(query, props.data)
    const cleaned = res.data.results.map(d => ({id: d.id, title: d.name}))
    setData(cleaned);
    if (fromEffect && (props.value || props.default)) setValue(cleaned[0]?.title)
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
      disabled={props.disabled && props.disabled(props.data)}
      onSelect={onSelect}
      ref={input}
      onChangeText={onChangeText}
    >
      {data.map(renderOption)}
    </Autocomplete>
  );
};

export default CustomAutoComplete