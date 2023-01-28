/* eslint-disable react/destructuring-assignment */
import React from 'react';
import EmptyStateComponent from './EmptyStateComponent';

function DisplayData({
  data, Component, componentProps, isLoading,
}) {
  if (isLoading) return <EmptyStateComponent index="3" />;

  if (!data) return <EmptyStateComponent index="0" />;

  if (!data.length) return <EmptyStateComponent index="2" />;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    data.map((props, i) => <Component key={props?._id || i} data={{ ...props }} {...componentProps} />)
  );
}

export default DisplayData;
