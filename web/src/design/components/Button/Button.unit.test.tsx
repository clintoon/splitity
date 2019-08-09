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
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  describe('basic', (): void => {
    let wrapper: ShallowWrapper;
    const onClickMock = jest.fn();

    beforeEach((): void => {
      wrapper = shallow(
        <Button styleOf={ButtonStyle.Primary} onClick={onClickMock}>
          label
        </Button>
      );
    });

    it('renders the button label', (): void => {
      expect(wrapper.find(ButtonBaseForTest).text()).toBe('label');
    });

    it('calls onClick prop when button is clicked', (): void => {
      wrapper.find(ButtonBaseForTest).simulate('click');
      expect(onClickMock).toHaveBeenCalledTimes(1);
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
      { size: ButtonSize.Small, padding: '6px 10px' },
      { size: ButtonSize.Medium, padding: '12px 18px' },
      { size: ButtonSize.Large, padding: '18px 26px' },
    ]);
  });
});
