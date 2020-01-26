import mixpanel from 'mixpanel-browser';
import { mixpanelConfig } from '@web/config/mixpanel';

const initializeTracking = (): void => {
  mixpanel.init(mixpanelConfig.token);
};

const identify = (userId: string): void => {
  mixpanel.identify(userId);
};

const alias = (userId: string): void => {
  mixpanel.alias(userId);
};

const track = (event: string, properties?: object): void => {
  mixpanel.track(event, properties);
};

export { identify, alias, track, initializeTracking };
