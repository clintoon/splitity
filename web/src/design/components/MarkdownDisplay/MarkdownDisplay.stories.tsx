import React from 'react';
import { storiesOf } from '@storybook/react';
import { MarkdownDisplay } from './MarkdownDisplay';

const markdown = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia porttitor urna ac venenatis. Integer suscipit dui sem, a viverra ipsum ultricies et. Donec ornare, felis eu auctor eleifend, metus massa aliquam tortor, id consequat purus nisl eget sem. Nulla finibus, augue sit amet vehicula mollis, lectus odio tempor metus, a tristique leo elit non libero. Fusce non ornare neque. Etiam risus turpis, auctor id tincidunt nec, laoreet non odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus eu commodo nibh.

Fusce aliquet, mauris non dignissim varius, risus sapien sagittis tortor, sed imperdiet lorem metus eu nunc. Curabitur semper, mi ut elementum viverra, nisl tortor pellentesque felis, et ultrices orci libero eu diam. Vestibulum commodo luctus accumsan. Etiam fringilla tempus feugiat. Nulla facilisi. Nam finibus nisl ut purus luctus lacinia. Nullam ullamcorper massa ut quam scelerisque finibus. In hac habitasse platea dictumst.

Morbi aliquet in ipsum vel finibus. Quisque a magna ligula. Duis ullamcorper mattis erat, in interdum turpis vestibulum in. In pharetra neque ligula, et consequat massa suscipit a. Sed maximus et mauris in tristique. Sed a luctus augue, eget blandit massa. Phasellus porta ac lacus sit amet tempus. Morbi vitae aliquam diam, id congue nunc. In pulvinar volutpat ultrices. Vivamus volutpat sapien eu urna interdum dapibus. In lectus lorem, congue eu neque quis, ullamcorper tristique ipsum. Donec a consequat eros. Proin fringilla nibh non dapibus posuere.

Nulla venenatis risus at purus pharetra suscipit. In hac habitasse platea dictumst. Phasellus vel vestibulum ante, nec volutpat nisl. In sagittis justo justo, ac aliquam nulla rhoncus ac. Nulla scelerisque dolor eu condimentum sagittis. Proin nulla lacus, sagittis ac cursus et, ornare vel nulla. Nullam a quam volutpat, tempor ipsum id, pharetra mauris. In hac habitasse platea dictumst. Nam eget nibh quam. Nulla vestibulum lacinia felis a rhoncus. Cras euismod lacus quis tempor maximus. Fusce non volutpat dolor.

In diam libero, interdum rhoncus dictum id, ullamcorper in metus. Aenean ornare, tortor in porttitor gravida, neque velit sodales nisi, sed elementum mi eros id mi. Phasellus fringilla odio ut ullamcorper bibendum. Curabitur tincidunt erat neque, et lobortis velit maximus maximus. Pellentesque ultricies tempor dictum. Donec velit sapien, iaculis nec urna quis, fringilla auctor sapien. Praesent pulvinar accumsan sem vitae iaculis. Nulla facilisi. Cras ac eleifend libero.`;

storiesOf('MarkdownDisplay', module).add(
  'Documentation',
  (): JSX.Element => <MarkdownDisplay source={markdown} />
);
