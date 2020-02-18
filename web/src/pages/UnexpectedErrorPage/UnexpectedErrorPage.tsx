import React from 'react';
import { IllustrationDisplay } from '@web/design/components/IllustrationDisplay/IllustrationDisplay';
import BugFixingImg from '@web/design/svg/undraw_bug_fixing.svg';

const UNEXPECTED_ERROR_PAGE_TESTID = 'unexpected error page';

const UnexpectedErrorPage = (): JSX.Element => {
  return (
    <div data-testid={UNEXPECTED_ERROR_PAGE_TESTID}>
      <IllustrationDisplay
        img={<BugFixingImg />}
        text="Something went wrong 🤦‍♂️. Please refresh your page to try again. If the problem persists, feel free to reach out to us at support@splitity.com"
      />
    </div>
  );
};

export { UnexpectedErrorPage, UNEXPECTED_ERROR_PAGE_TESTID };
