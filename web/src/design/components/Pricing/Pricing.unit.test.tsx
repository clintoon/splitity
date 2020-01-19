import React from 'react';
import { Pricing } from './Pricing';
import { RenderResult, render } from '@testing-library/react';

const TITLE = 'title123';

const PLAN1_HEAD = 'Open source & personal accounts';
const PLAN1_CONTENT = 'Public and personal account repos are free';
const PLAN1_PRICE = 0;

const PLAN2_HEAD = 'Organization accounts';
const PLAN2_CONTENT = 'Unlimited repos on organization accounts';
const PLAN2_PRICE = 123;

interface RenderPricingResult {
  renderResult: RenderResult;
}

const renderPricing = (): RenderPricingResult => {
  const renderResult = render(
    <Pricing
      title={TITLE}
      plans={[
        {
          head: PLAN1_HEAD,
          content: PLAN1_CONTENT,
          price: PLAN1_PRICE,
        },
        {
          head: PLAN2_HEAD,
          content: PLAN2_CONTENT,
          price: PLAN2_PRICE,
        },
      ]}
    />
  );
  return { renderResult };
};

describe('<Pricing/>', (): void => {
  it('renders the title', (): void => {
    const { renderResult } = renderPricing();
    expect(renderResult.queryByText(TITLE)).not.toBe(null);
  });

  it('renders the first plan', (): void => {
    const { renderResult } = renderPricing();
    expect(renderResult.queryByText(PLAN1_HEAD)).not.toBe(null);
    expect(renderResult.queryByText(PLAN1_CONTENT)).not.toBe(null);
    expect(renderResult.queryByText(`$${PLAN1_PRICE}`)).not.toBe(null);
  });

  it('renders the second plan', (): void => {
    const { renderResult } = renderPricing();
    expect(renderResult.queryByText(PLAN2_HEAD)).not.toBe(null);
    expect(renderResult.queryByText(PLAN2_CONTENT)).not.toBe(null);
    expect(renderResult.queryByText(`$${PLAN2_PRICE}`)).not.toBe(null);
  });
});
