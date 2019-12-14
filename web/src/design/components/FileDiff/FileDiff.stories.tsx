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

const multipleChunkFileDiff = parseDiff(`
diff --git a/yarn.lock b/yarn.lock
index 8eb5c2e..c4807ae 100644
--- a/yarn.lock
+++ b/yarn.lock
@@ -2,6 +2,18 @@
 # yarn lockfile v1
 
 
+"@apollographql/apollo-tools@^0.4.0":
+  version "0.4.0"
+  resolved "https://registry.yarnpkg.com/@apollographql/apollo-tools/-/apollo-tools-0.4.0.tgz#8a1a0ab7a0bb12ccc03b72e4a104cfa5d969fd5f"
+  integrity sha512-7wEO+S+zgz/wVe3ilFQqICufRBYYDSNUkd1V03JWvXuSydbYq2SM5EgvWmFF+04iadt+aQ0XCCsRzCzRPQODfQ==
+  dependencies:
+    apollo-env "0.5.1"
+
+"@apollographql/graphql-playground-html@1.6.24":
+  version "1.6.24"
+  resolved "https://registry.yarnpkg.com/@apollographql/graphql-playground-html/-/graphql-playground-html-1.6.24.tgz#3ce939cb127fb8aaa3ffc1e90dff9b8af9f2e3dc"
+  integrity sha512-8GqG48m1XqyXh4mIZrtB5xOhUwSsh1WsrrsaZQOEYYql3YN9DEu9OOSg0ILzXHZo/h2Q74777YE4YzlArQzQEQ==
+
 "@babel/code-frame@7.0.0":
   version "7.0.0"
   resolved "https://registry.yarnpkg.com/@babel/code-frame/-/code-frame-7.0.0.tgz#06e2ab19bdb535385559aabb5ba59729482800f8"
@@ -2279,6 +2291,15 @@
     "@octokit/types" "^1.0.0"
     universal-user-agent "^4.0.0"
 
+"@octokit/graphql@^4.3.1":
+  version "4.3.1"
+  resolved "https://registry.yarnpkg.com/@octokit/graphql/-/graphql-4.3.1.tgz#9ee840e04ed2906c7d6763807632de84cdecf418"
+  integrity sha512-hCdTjfvrK+ilU2keAdqNBWOk+gm1kai1ZcdjRfB30oA3/T6n53UVJb7w0L5cR3/rhU91xT3HSqCd+qbvH06yxA==
+  dependencies:
+    "@octokit/request" "^5.3.0"
+    "@octokit/types" "^2.0.0"
+    universal-user-agent "^4.0.0"
+
 "@octokit/plugin-enterprise-rest@^3.6.1":
   version "3.6.2"
   resolved "https://registry.yarnpkg.com/@octokit/plugin-enterprise-rest/-/plugin-enterprise-rest-3.6.2.tgz#74de25bef21e0182b4fa03a8678cd00a4e67e561"
@@ -2331,6 +2352,13 @@
   dependencies:
     "@types/node" "^12.11.1"
 
+"@octokit/types@^2.0.0":
+  version "2.0.1"
+  resolved "https://registry.yarnpkg.com/@octokit/types/-/types-2.0.1.tgz#0caf0364e010296265621593ac9a37f40ef75dad"
+  integrity sha512-YDYgV6nCzdGdOm7wy43Ce8SQ3M5DMKegB8E5sTB/1xrxOdo2yS/KgUgML2N2ZGD621mkbdrAglwTyA4NDOlFFA==
+  dependencies:
+    "@types/node" ">= 8"
+
 "@protobufjs/aspromise@^1.1.1", "@protobufjs/aspromise@^1.1.2":
   version "1.1.2"
   resolved "https://registry.yarnpkg.com/@protobufjs/aspromise/-/aspromise-1.1.2.tgz#9b8b0cc663d669a7d8f6f5d0893a14d348f30fbf"
@@ -2919,6 +2947,13 @@
     "@testing-library/dom" "^6.3.0"
     "@types/testing-library__react" "^9.1.0"
 
+"@types/accepts@*", "@types/accepts@^1.3.5":
+  version "1.3.5"
+  resolved "https://registry.yarnpkg.com/@types/accepts/-/accepts-1.3.5.tgz#c34bec115cfc746e04fe5a059df4ce7e7b391575"
+  integrity sha512-jOdnI/3qTpHABjM5cx1Hc0sKsPoYCp+DP/GJRGtDlPd7fiV9oXGGIcjW/ZOxLIvjGz8MA+uMZI9metHlgqbgwQ==
+  dependencies:
+    "@types/node" "*"
+
 "@types/anymatch@*":
   version "1.3.1"
   resolved "https://registry.yarnpkg.com/@types/anymatch/-/anymatch-1.3.1.tgz#336badc1beecb9dacc38bea2cf32adf627a8421a"
@@ -2965,6 +3000,14 @@
     "@types/connect" "*"
     "@types/node" "*"
 
+"@types/body-parser@1.17.1":
+  version "1.17.1"
+  resolved "https://registry.yarnpkg.com/@types/body-parser/-/body-parser-1.17.1.tgz#18fcf61768fb5c30ccc508c21d6fd2e8b3bf7897"
+  integrity sha512-RoX2EZjMiFMjZh9lmYrwgoP9RTpAjSHiJxdp4oidAQVO02T7HER3xj9UKue5534ULWeqVEkujhWcyvUce+d68w==
+  dependencies:
+    "@types/connect" "*"
+    "@types/node" "*"
+
 "@types/bytebuffer@^5.0.40":
   version "5.0.40"
   resolved "https://registry.yarnpkg.com/@types/bytebuffer/-/bytebuffer-5.0.40.tgz#d6faac40dcfb09cd856cdc4c01d3690ba536d3ee"
@@ -2980,6 +3023,23 @@
   dependencies:
     "@types/node" "*"
 
+"@types/cookies@*":
+  version "0.7.4"
+  resolved "https://registry.yarnpkg.com/@types/cookies/-/cookies-0.7.4.tgz#26dedf791701abc0e36b5b79a5722f40e455f87b"
+  integrity sha512-oTGtMzZZAVuEjTwCjIh8T8FrC8n/uwy+PG0yTvQcdZ7etoel7C7/3MSd7qrukENTgQtotG7gvBlBojuVs7X5rw==
+  dependencies:
+    "@types/connect" "*"
+    "@types/express" "*"
+    "@types/keygrip" "*"
+    "@types/node" "*"
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
      return (
        <FileDiff
          filename={{
            to: multipleChunkFileDiff.to,
            from: multipleChunkFileDiff.from as string,
          }}
          chunks={multipleChunkFileDiff.chunks}
        />
      );
    }
  );
