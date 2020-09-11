import React from 'react';

export interface Props {
  children: React.ReactElement | string;
}

function Button({ children }: Props): React.ReactElement {
  return <button>{children}</button>;
}

export default Button;
