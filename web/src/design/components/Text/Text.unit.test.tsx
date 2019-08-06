import React from 'react';
import { mount } from 'enzyme';
import {
  Text,
  TextAs,
  TextStyle,
  TextProps,
  TextAlign,
} from '@web/design/components/Text/Text';

type OptionalTextProps = Omit<Partial<TextProps>, 'children'>;
type TestProp = 'styleOf' | 'as' | 'textAlign' | 'margin';

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

  it('has correct default html tag and css properties', (): void => {
    const wrapper = mount(<Text>example</Text>);
    expect(wrapper.getDOMNode()).toMatchSnapshot();
  });

  describe('styleOf prop', (): void => {
    testStyleOfTextSnapshots(
      'has correct CSS properties for',
      'styleOf',
      Object.values(TextStyle).map(
        (propValue): OptionalTextProps => {
          return { styleOf: propValue };
        }
      )
    );
  });

  describe('as prop', (): void => {
    testStyleOfTextSnapshots(
      'has correct html tag for',
      'as',
      Object.values(TextAs).map(
        (propValue): OptionalTextProps => {
          return { as: propValue };
        }
      )
    );
  });

  describe('textAlign prop', (): void => {
    testStyleOfTextSnapshots(
      'has correct CSS properties for',
      'textAlign',
      Object.values(TextAlign).map(
        (propValue): OptionalTextProps => {
          return { textAlign: propValue };
        }
      )
    );
  });
});
