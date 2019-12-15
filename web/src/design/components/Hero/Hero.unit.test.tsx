import React from 'react';
import {
  Hero,
  HERO_TITLE_TESTID,
  HERO_SUBTITLE_TESTID,
} from '@web/design/components/Hero/Hero';
import { Color } from '@web/design/styles/color';
import { BUTTON_TESTID } from '@web/design/components/Button/Button';
import { RenderResult, render, fireEvent } from '@testing-library/react';

const HERO_TITLE = 'hero title';
const HERO_SUBTITLE = 'hero subtitle';
const HERO_BUTTON_LABEL = 'hero label';

interface RenderHeroOptions {
  backgroundColor: Color;
  buttonLabel?: string;
}

interface RenderHeroResult {
  renderResult: RenderResult;
  onButtonClickMock: jest.Mock;
}

const renderHero = (options: RenderHeroOptions): RenderHeroResult => {
  const { backgroundColor, buttonLabel } = options;

  const onButtonClickMock = jest.fn();
  const button = buttonLabel
    ? { label: buttonLabel, onClick: onButtonClickMock }
    : undefined;

  const renderResult = render(
    <Hero
      title={HERO_TITLE}
      subtitle={HERO_SUBTITLE}
      backgroundColor={backgroundColor}
      button={button}
    />
  );

  return {
    renderResult,
    onButtonClickMock,
  };
};

describe('<Hero/>', (): void => {
  describe('no button', (): void => {
    it('renders title', (): void => {
      const { renderResult } = renderHero({
        backgroundColor: Color.Blue50,
      });
      expect(renderResult.getByTestId(HERO_TITLE_TESTID)).toHaveTextContent(
        HERO_TITLE
      );
    });

    it('renders subtitle', (): void => {
      const { renderResult } = renderHero({
        backgroundColor: Color.Blue50,
      });
      expect(renderResult.getByTestId(HERO_SUBTITLE_TESTID)).toHaveTextContent(
        HERO_SUBTITLE
      );
    });

    it('does not render button', (): void => {
      const { renderResult } = renderHero({
        backgroundColor: Color.Blue50,
      });
      expect(renderResult.container).not.toContainHTML('button');
    });
  });

  describe('with button', (): void => {
    it('renders title', (): void => {
      const { renderResult } = renderHero({
        backgroundColor: Color.Blue50,
        buttonLabel: HERO_BUTTON_LABEL,
      });
      expect(renderResult.getByTestId(HERO_TITLE_TESTID)).toHaveTextContent(
        HERO_TITLE
      );
    });

    it('renders subtitle', (): void => {
      const { renderResult } = renderHero({
        backgroundColor: Color.Blue50,
        buttonLabel: HERO_BUTTON_LABEL,
      });
      expect(renderResult.getByTestId(HERO_SUBTITLE_TESTID)).toHaveTextContent(
        HERO_SUBTITLE
      );
    });

    it('does renders button', (): void => {
      const { renderResult } = renderHero({
        backgroundColor: Color.Blue50,
        buttonLabel: HERO_BUTTON_LABEL,
      });
      expect(renderResult.container).toContainElement(
        renderResult.getByTestId(BUTTON_TESTID)
      );
    });

    it('does renders correct button label', (): void => {
      const { renderResult } = renderHero({
        backgroundColor: Color.Blue50,
        buttonLabel: HERO_BUTTON_LABEL,
      });
      expect(renderResult.getByTestId(BUTTON_TESTID)).toHaveTextContent(
        HERO_BUTTON_LABEL
      );
    });

    it("calls button's onClick when is pressed", (): void => {
      const { renderResult, onButtonClickMock } = renderHero({
        backgroundColor: Color.Blue50,
        buttonLabel: HERO_BUTTON_LABEL,
      });
      fireEvent.click(renderResult.getByTestId(BUTTON_TESTID));
      expect(onButtonClickMock).toHaveBeenCalled();
    });
  });
});
