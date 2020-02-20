import React from 'react';
import { MarkdownDisplay } from '@web/design/components/MarkdownDisplay/MarkdownDisplay';
import termsAndConditions from './terms_and_conditions.md';

const TERMS_AND_CONDITIONS_TESTID = 'terms and conditions page';

const TermsAndConditionsPage = (): JSX.Element => {
  return (
    <div data-testid={TERMS_AND_CONDITIONS_TESTID}>
      <MarkdownDisplay source={termsAndConditions} />
    </div>
  );
};

export { TermsAndConditionsPage, TERMS_AND_CONDITIONS_TESTID };
