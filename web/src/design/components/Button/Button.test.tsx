import React from 'react';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import {
  Button,
  ButtonSize,
  ButtonStyle,
  ButtonBaseForTest,
} from '@web/design/components/Button/Button';
import { Color } from '@web/design/styles/color';

describe('<Button/>', (): void => {
  describe('basic', (): void => {
    let wrapper: ShallowWrapper;

    beforeEach((): void => {
      wrapper = shallow(<Button styleOf={ButtonStyle.Primary}>label</Button>);
    });

    it('renders the button label', (): void => {
      expect(wrapper.text()).toBe('label');
    });
  });

  describe('styleOf prop', (): void => {
    const testStyleOfPropColor = (
      testValues: { styleOf: ButtonStyle; backgroundColor: string }[]
    ): void => {
      testValues.forEach(({ styleOf, backgroundColor }): void => {
        describe(`${styleOf} color`, (): void => {
          let wrapper: ReactWrapper;

          beforeEach((): void => {
            wrapper = mount(<Button styleOf={styleOf}>label</Button>);
          });

          it(`applies ${styleOf} style`, (): void => {
            expect(wrapper.find(ButtonBaseForTest)).toHaveStyleRule(
              'background-color',
              backgroundColor
            );
          });
        });
      });
    };

    testStyleOfPropColor([
      { styleOf: ButtonStyle.Primary, backgroundColor: Color.Orange },
      {
        styleOf: ButtonStyle.Secondary,
        backgroundColor: Color.LightGray,
      },
    ]);
  });

  describe('size prop', (): void => {
    const testSizePropPadding = (
      testValues: { size: ButtonSize; padding: string }[]
    ): void => {
      testValues.forEach(({ size, padding }): void => {
        describe(`${size} size`, (): void => {
          let wrapper: ReactWrapper;

          beforeEach((): void => {
            wrapper = mount(
              <Button styleOf={ButtonStyle.Primary} size={size}>
                label
              </Button>
            );
          });

          it(`has correct padding`, (): void => {
            expect(wrapper.find(ButtonBaseForTest)).toHaveStyleRule(
              'padding',
              padding
            );
          });
        });
      });
    };

    testSizePropPadding([
      { size: ButtonSize.Small, padding: '4px' },
      { size: ButtonSize.Medium, padding: '8px' },
      { size: ButtonSize.Large, padding: '12px' },
    ]);
  });
});
