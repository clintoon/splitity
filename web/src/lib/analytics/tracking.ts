import mixpanel from 'mixpanel-browser';
import { mixpanelConfig } from '@web/config/mixpanel';

const initializeTracking = () => {
  mixpanel.init(mixpanelConfig.token);
};

const identify = (userId: string) => {
  mixpanel.identify(userId);
};

const alias = (userId: string) => {
  mixpanel.alias(userId);
};

const track = (event: string, properties: object) => {
  mixpanel.track(event, properties);
};

export { identify, alias, track, initializeTracking };
