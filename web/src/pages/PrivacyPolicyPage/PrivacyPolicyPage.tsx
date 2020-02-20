import React from 'react';
import { MarkdownDisplay } from '@web/design/components/MarkdownDisplay/MarkdownDisplay';
import privacyPolicy from './privacy_policy.md';

const PRIVACY_POLICY_TESTID = 'privacy policy page';

const PrivacyPolicyPage = (): JSX.Element => {
  return (
    <div data-testid={PRIVACY_POLICY_TESTID}>
      <MarkdownDisplay source={privacyPolicy} />
    </div>
  );
};

export { PrivacyPolicyPage, PRIVACY_POLICY_TESTID };
