import React from 'react';
import { render } from '@testing-library/react';
import { Text, TEXT_TEST_ID } from '@web/design/components/Text/Text';

const TEXT_CHILD = 'I am some words';

describe('<Text/>', (): void => {
  it('displays text', (): void => {
    const { getByTestId } = render(<Text>{TEXT_CHILD}</Text>);
    expect(getByTestId(TEXT_TEST_ID)).toHaveTextContent(TEXT_CHILD);
  });
});
