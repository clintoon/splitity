import React from 'react';
import { Text, TextAlign, TextWeight } from '@web/design/components/Text/Text';

interface InfoItemProps {
  head: string;
  content: string;
}

const InfoItem = ({ head, content }: InfoItemProps): JSX.Element => {
  return (
    <div>
      <Text
        textAlign={TextAlign.Center}
        fontWeight={TextWeight.Bold}
        margin="0 0 8px 0"
      >
        {head}
      </Text>
      <Text textAlign={TextAlign.Center}>{content}</Text>
    </div>
  );
};

export { InfoItem };
