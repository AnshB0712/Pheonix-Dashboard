/* eslint-disable react/destructuring-assignment */
import { Text } from '@mantine/core';
import React from 'react';

function DisplayData({ data, Component, componentProps }) {
  if (!data) { return (<Text>Data is a falsy value</Text>); }

  if (!data.length) { return (<Text>Data is a Empty</Text>); }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    data.map((props, i) => <Component key={props?._id || i} data={{ ...props }} {...componentProps} />)
  );
}

export default DisplayData;
