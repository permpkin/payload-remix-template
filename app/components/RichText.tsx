import React from 'react';
import Serialize from './Serialize';

const RichText: React.FC<{className?: string, content: any}> = ({ className, content }) => {
  if (!content) {
    return null;
  }

  return (
    <div className={className}>
      {Serialize(content)}
    </div>
  );
};

export default RichText;