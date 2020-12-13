import React from 'react';
import NotFound from '../../screens/notFound';
import Ups from '../../screens/ups';

export default function HTTPErrorHandler({ error, children }) {
  switch (error?.status) {
    case 500:
      return <Ups message={error?.message} />;
    case 404:
      return <NotFound />;
    default:
      return <>{children}</>;
  }
}
