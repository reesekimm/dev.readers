import React from 'react';

import { Header } from '../../index';

interface Props {
  children: React.ReactNode;
}

function BeseTemplate({ children }: Props): React.ReactElement {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default BeseTemplate;
