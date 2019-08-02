import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import {
  Text,
  TextAs,
  TextStyle,
  TextProps,
} from '@web/design/components/Text/Text';

type OptionalTextProps = Omit<Partial<TextProps>, 'children'>;
type TestProp = 'styleOf' | 'as';

describe('<Text/>', (): void => {
  const testStyleOfTextSnapshots = (
    testName: string,
    testProp: TestProp,
    props: OptionalTextProps[]
  ): void => {
    props.forEach((prop): void => {
      it(`${testName} ${prop[testProp]}`, (): void => {
        const wrapper = mount(<Text {...prop}>example</Text>);
        expect(wrapper.getDOMNode()).toMatchSnapshot();
      });
    });
  };

  describe('styleOf prop', (): void => {
    testStyleOfTextSnapshots('has correct CSS properties for', 'styleOf', [
      { styleOf: TextStyle.Body },
      { styleOf: TextStyle.Title1 },
      { styleOf: TextStyle.Title2 },
      { styleOf: TextStyle.Title3 },
      { styleOf: TextStyle.Title4 },
      { styleOf: TextStyle.Title5 },
      { styleOf: TextStyle.Title6 },
    ]);
  });

  describe('as prop', (): void => {
    testStyleOfTextSnapshots('has correct html tag for', 'as', [
      { as: TextAs.Div },
      { as: TextAs.P },
      { as: TextAs.H1 },
      { as: TextAs.H2 },
      { as: TextAs.H3 },
      { as: TextAs.H4 },
      { as: TextAs.H5 },
      { as: TextAs.H6 },
    ]);
  });
});
