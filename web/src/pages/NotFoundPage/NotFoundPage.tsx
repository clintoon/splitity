import React from 'react';
import { IllustrationDisplay } from '@web/design/components/IllustrationDisplay/IllustrationDisplay';
import PageNotFoundImg from '@web/design/svg/undraw_page_not_found.svg';

const PAGE_NOT_FOUND_TESTID = 'page not found';

const NotFoundPage = (): JSX.Element => {
  return (
    <div data-testid={PAGE_NOT_FOUND_TESTID}>
      <IllustrationDisplay
        img={<PageNotFoundImg />}
        text="The page you were looking for could not be found"
      />
    </div>
  );
};

export { NotFoundPage, PAGE_NOT_FOUND_TESTID };
