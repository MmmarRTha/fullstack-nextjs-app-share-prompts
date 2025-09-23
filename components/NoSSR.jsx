"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const NoSSR = ({ children, fallback = null }) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false
});
