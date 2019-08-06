import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Hero } from '@web/design/components/Hero/Hero';
import { Color } from '@web/design/styles/color';
import { Text } from '@web/design/components/Text/Text';
import { Button } from '@web/design/components/Button/Button';

describe('<Hero/>', (): void => {
  let wrapper: ShallowWrapper;
  const title = 'title';
  const subtitle = 'subtitle';

  beforeEach((): void => {
    wrapper = shallow(
      <Hero
        title={title}
        subtitle={subtitle}
        backgroundColor={Color.LightOrange}
      />
    );

    jest.clearAllMocks();
  });

  it('renders the title', (): void => {
    const titleWrapper = wrapper.find(Text).at(0);
    expect(titleWrapper.prop('children')).toBe(title);
  });

  it('renders the subtitle', (): void => {
    const subtitleWrapper = wrapper.find(Text).at(1);
    expect(subtitleWrapper.prop('children')).toBe(subtitle);
  });

  it('sets the correct background color', (): void => {
    expect(wrapper).toHaveStyleRule('background-color', Color.LightOrange);
  });

  it("doesn't display button if button prop is undefined", (): void => {
    expect(wrapper.find(Button).exists()).toBe(false);
  });

  describe('button', (): void => {
    let onClickMock = jest.fn();
    const buttonLabel = 'buttonLabel';

    beforeEach((): void => {
      wrapper.setProps({
        button: { label: buttonLabel, onClick: onClickMock },
      });
    });

    it('has the correct button label', (): void => {
      expect(wrapper.find(Button).prop('children')).toBe(buttonLabel);
    });

    it('we pass the onClick correctly', (): void => {
      expect(wrapper.find(Button).prop('onClick')).toBe(onClickMock);
    });
  });
});
