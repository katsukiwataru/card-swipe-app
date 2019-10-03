import React from 'react';

interface Props {
  content: string;
}

const Hello: React.FC<Props> = ({ content }) => {
  return <div>{content}</div>;
};

export default Hello;
