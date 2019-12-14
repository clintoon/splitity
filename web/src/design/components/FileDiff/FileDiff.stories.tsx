import React from 'react';
import { FileDiff } from '@web/design/components/FileDiff/FileDiff';
import { storiesOf } from '@storybook/react';
import parseDiff from 'parse-diff';

const singleChunkFileDiff = parseDiff(`
diff --git a/web/src/pages/GithubDashboard/PullRequestSelection.tsx b/web/src/pages/GithubDashboard/PullRequestSelection.tsx
index 179dad9..797c9c3 100644
--- a/web/src/pages/GithubDashboard/PullRequestSelection.tsx
+++ b/web/src/pages/GithubDashboard/PullRequestSelection.tsx
@@ -40,7 +40,9 @@ const redirectSplitPR = (
   repoNameWithOwner: string,
   prNumber: number
 ): void => {
-  history.push(\`\${GithubRoutePath.AppRoot}/\${repoNameWithOwner}/\${prNumber}\`);
+  history.push(
+    \`\${GithubRoutePath.AppRoot}/\${repoNameWithOwner}/pull/\${prNumber}\`
+  );
`)[0];

storiesOf('FileDiff', module)
  .add(
    'Documentation',
    (): JSX.Element => (
      <FileDiff
        filename={{
          to: singleChunkFileDiff.to,
          from: singleChunkFileDiff.from as string,
        }}
        chunks={singleChunkFileDiff.chunks}
      />
    )
  )
  .add(
    'Multiple chunks',
    (): JSX.Element => {
      return <div />;
    }
  );
