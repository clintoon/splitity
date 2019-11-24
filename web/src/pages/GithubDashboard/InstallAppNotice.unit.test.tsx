import React from 'react';
import {
  RenderResult,
  render,
  within,
  fireEvent,
} from '@testing-library/react';
import {
  InstallAppNotice,
  INSTALL_APP_NOTICE_TESTID,
} from '@web/pages/GithubDashboard/InstallAppNotice';
import * as openPage from '@web/lib/actions/openPage';
import { BUTTON_TESTID } from '@web/design/components/Button/Button';
import { noop } from 'lodash';

interface RenderInstallAppNoticeResult {
  renderResult: RenderResult;
  onInstallGithubAppSpy: jest.SpyInstance;
}

const renderInstallAppNotice = (): RenderInstallAppNoticeResult => {
  const onInstallGithubAppSpy = jest
    .spyOn(openPage, 'onInstallGithubApp')
    .mockImplementation(noop);

  const renderResult = render(<InstallAppNotice />);

  return { renderResult, onInstallGithubAppSpy };
};

describe('<InstallAppNotice/>', (): void => {
  it('calls onInstallGithubApp when install app button is clicked', async (): Promise<
    void
  > => {
    const { renderResult, onInstallGithubAppSpy } = renderInstallAppNotice();
    const installAppNoticeElement = renderResult.getByTestId(
      INSTALL_APP_NOTICE_TESTID
    );

    const installAppButton = within(installAppNoticeElement).getByTestId(
      BUTTON_TESTID
    );

    fireEvent.click(installAppButton);

    expect(onInstallGithubAppSpy).toBeCalled();
  });
});
