'use client';

import type { FC } from 'react';

const ErrorPage: FC<{ error: Error }> = () => (
  <div className="container">
    <h2>500: Internal Server Error</h2>
    <h3>This Page has thrown a non-recoverable Error</h3>
  </div>
);

export default ErrorPage;
