const GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF = `
diff --git a/README.md b/README.md
index 5cf2347..7cbbdcd 100644
--- a/README.md
+++ b/README.md
@@ -7,14 +7,14 @@ Quisque nec condimentum augue. Nunc id risus nec metus ullamcorper facilisis. Vi
Aenean egestas orci vitae diam blandit scelerisque.
Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam sit amet efficitur magna. In convallis dui non diam tristique posuere.

-Donec rutrum ligula id lectus rutrum, at ullamcorper sapien sodales.
-Morbi eget euismod dolor. Donec tempus tristique elit ac consequat. Aliquam erat volutpat.
-Maecenas auctor nisl nec turpis venenatis aliquam. Proin eu sem a ex rutrum mattis.
-Vestibulum quis dolor metus.
-Integer egestas quam non sem viverra, sed facilisis ex posuere. 
-Maecenas tristique imperdiet viverra. Donec a malesuada neque, id ornare sem.
-Suspendisse sem elit, lacinia ac odio ultricies, varius euismod ligula.
-Phasellus vel tellus vel tellus pellentesque interdum et a dui. Pellentesque vehicula orci nisl, ac elementum sapien dapibus eu.
+Suspendisse eleifend in justo ut commodo.
+Duis posuere varius sagittis. Phasellus at mauris elit.
+Aliquam volutpat bibendum nulla, in dapibus felis sagittis quis.
+Morbi faucibus risus tortor, eu varius tortor venenatis at.
+Duis dapibus lacinia diam, quis maximus ex facilisis non.
+Donec id luctus felis.
+Cras vitae lectus scelerisque magna egestas feugiat.
+Aenean sit amet erat orci. Aliquam non lorem ex.

Sed vitae turpis ut purus pharetra congue id nec mauris.
Aenean augue ipsum, tristique id risus eleifend, tempus efficitur metus. 
@@ -24,13 +24,6 @@ Aliquam rutrum iaculis tortor vel porttitor.
Fusce tristique neque purus, ac pulvinar lectus lobortis vitae. Suspendisse nibh tellus, cursus non laoreet nec, vestibulum at ex. Quisque ac iaculis dolor.
Nam tempor leo in diam convallis, consequat facilisis dolor hendrerit. Vestibulum commodo dolor a egestas volutpat.

-Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis hendrerit metus.
-Praesent finibus mollis nisl in luctus. Etiam sagittis auctor viverra.
-Fusce nec viverra sapien. Sed libero diam, imperdiet sit amet purus at, finibus pulvinar est.
-Curabitur sodales sagittis eros, nec porta justo elementum sed. Quisque sit amet velit cursus, porta turpis et, porttitor ipsum. Vestibulum metus elit, ultricies ac suscipit id, laoreet sit amet nibh.
-Donec gravida tellus nec diam malesuada condimentum. Sed tempus nisl odio.
-Nullam auctor, elit ac semper condimentum, massa metus accumsan odio, in convallis est dolor sed magna.
-
Sed malesuada erat tellus, ac viverra libero ultricies eget.
Proin tortor odio, sodales sit amet mauris et, hendrerit laoreet orci.
Cras non felis sapien. Nulla faucibus quam in mauris dictum pharetra.
@@ -42,3 +35,13 @@ Ut placerat felis ut nisl sagittis, at dictum quam pretium.
In sollicitudin, enim eget aliquet ornare, massa nibh dapibus massa, in tristique diam nunc ut lorem.
Pellentesque quis justo ac quam malesuada rutrum. Duis mollis, nulla in laoreet fermentum, orci nisl finibus tellus, eget tincidunt nibh magna et metus.
Donec hendrerit, magna sit amet fermentum laoreet, purus massa consectetur mauris, condimentum eleifend nibh enim quis ipsum.
+
+Praesent sapien dui, elementum pellentesque dignissim at, fringilla ac risus.
+Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
+Donec velit odio, congue pretium tincidunt sed, faucibus nec nisi.
+Curabitur laoreet, lacus et ultricies tristique, purus purus pulvinar tellus, vel semper lacus ipsum nec eros.
+Fusce ultricies quis massa vitae rhoncus.
+Vivamus ut scelerisque nunc. Suspendisse ultricies mauris nulla. Vestibulum vitae pellentesque eros.
+Phasellus in nisl posuere, elementum nunc nec, elementum mi. Cras in dui interdum, elementum lorem vel, mollis risus.
+In neque odio, interdum sit amet metus nec, lobortis tincidunt odio.
+Nam tristique vestibulum nulla eu faucibus. Proin ac eros eget lectus efficitur facilisis sed ac libero.
`;

const GITHUB_SINGLE_FILE_SINGLE_CHUNK = `
diff --git a/README.md b/README.md
deleted file mode 100644
index 5cf2347..0000000
--- a/README.md
+++ /dev/null
@@ -1,44 +0,0 @@
-# A repo to test split my prs github app!
-Lorem ipsum dolor sit amet, consectetur adipiscing elit.
-Morbi tempus mi a nibh luctus, convallis euismod mi porttitor.
-Integer elit ante, luctus a posuere non, mollis sed purus. Vivamus nibh neque, pellentesque sit amet nisi dapibus, egestas tincidunt augue. Ut ornare porta sem. Morbi semper erat ante, et tempor metus lobortis nec.
-Pellentesque mattis efficitur felis eu dictum. Aenean commodo iaculis diam quis consectetur.
-Quisque nec condimentum augue. Nunc id risus nec metus ullamcorper facilisis. Vivamus condimentum posuere sollicitudin.
-Aenean egestas orci vitae diam blandit scelerisque.
-Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam sit amet efficitur magna. In convallis dui non diam tristique posuere.
-
-Donec rutrum ligula id lectus rutrum, at ullamcorper sapien sodales.
-Morbi eget euismod dolor. Donec tempus tristique elit ac consequat. Aliquam erat volutpat.
-Maecenas auctor nisl nec turpis venenatis aliquam. Proin eu sem a ex rutrum mattis.
-Vestibulum quis dolor metus.
-Integer egestas quam non sem viverra, sed facilisis ex posuere. 
-Maecenas tristique imperdiet viverra. Donec a malesuada neque, id ornare sem.
-Suspendisse sem elit, lacinia ac odio ultricies, varius euismod ligula.
-Phasellus vel tellus vel tellus pellentesque interdum et a dui. Pellentesque vehicula orci nisl, ac elementum sapien dapibus eu.
-
-Sed vitae turpis ut purus pharetra congue id nec mauris.
-Aenean augue ipsum, tristique id risus eleifend, tempus efficitur metus. 
-Curabitur eu nunc quis ligula rutrum mollis vitae non sapien. Nulla lacinia porta libero, lobortis pharetra massa gravida et.
-In lectus metus, lacinia a nunc pharetra, gravida vehicula arcu. Nulla facilisi. Nam ultricies nisi a massa faucibus tempor.
-Aliquam rutrum iaculis tortor vel porttitor. 
-Fusce tristique neque purus, ac pulvinar lectus lobortis vitae. Suspendisse nibh tellus, cursus non laoreet nec, vestibulum at ex. Quisque ac iaculis dolor.
-Nam tempor leo in diam convallis, consequat facilisis dolor hendrerit. Vestibulum commodo dolor a egestas volutpat.
-
-Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam quis hendrerit metus.
-Praesent finibus mollis nisl in luctus. Etiam sagittis auctor viverra.
-Fusce nec viverra sapien. Sed libero diam, imperdiet sit amet purus at, finibus pulvinar est.
-Curabitur sodales sagittis eros, nec porta justo elementum sed. Quisque sit amet velit cursus, porta turpis et, porttitor ipsum. Vestibulum metus elit, ultricies ac suscipit id, laoreet sit amet nibh.
-Donec gravida tellus nec diam malesuada condimentum. Sed tempus nisl odio.
-Nullam auctor, elit ac semper condimentum, massa metus accumsan odio, in convallis est dolor sed magna.
-
-Sed malesuada erat tellus, ac viverra libero ultricies eget.
-Proin tortor odio, sodales sit amet mauris et, hendrerit laoreet orci.
-Cras non felis sapien. Nulla faucibus quam in mauris dictum pharetra.
-Nullam interdum quis quam quis tristique. Nam pretium, odio sed feugiat sollicitudin, metus nisi dignissim purus, vel bibendum nibh purus a nisi. Cras ut placerat tellus.
-Integer at malesuada felis.
-Integer tempus massa vitae felis suscipit porttitor.
-Vivamus suscipit pharetra turpis at interdum.
-Ut placerat felis ut nisl sagittis, at dictum quam pretium.
-In sollicitudin, enim eget aliquet ornare, massa nibh dapibus massa, in tristique diam nunc ut lorem.
-Pellentesque quis justo ac quam malesuada rutrum. Duis mollis, nulla in laoreet fermentum, orci nisl finibus tellus, eget tincidunt nibh magna et metus.
-Donec hendrerit, magna sit amet fermentum laoreet, purus massa consectetur mauris, condimentum eleifend nibh enim quis ipsum.
`;

const GITHUB_MULTIPLE_FILE_DIFF = `
diff --git a/web/jest.config.js b/web/jest.config.js
index e429610..60a90dd 100644
--- a/web/jest.config.js
+++ b/web/jest.config.js
@@ -7,4 +7,5 @@ module.exports = {
 },
 clearMocks: true,
 restoreMocks: true,
+  resetModules: true,
};
diff --git a/web/setupTest.ts b/web/setupTest.ts
index 666127a..18d9215 100644
--- a/web/setupTest.ts
+++ b/web/setupTest.ts
@@ -1 +1,7 @@
import '@testing-library/jest-dom/extend-expect';
+import { PROCESS_ENV_GITHUB_APP_NAME } from '@web/testing/testGlobals';
+
+// Setup globals
+process.env = Object.assign(process.env, {
+  GITHUB_APP_NAME: PROCESS_ENV_GITHUB_APP_NAME,
+});
diff --git a/web/src/lib/actions/openPage.unit.test.ts b/web/src/lib/actions/openPage.unit.test.ts
new file mode 100644
index 0000000..3970dc8
--- /dev/null
+++ b/web/src/lib/actions/openPage.unit.test.ts
@@ -0,0 +1,34 @@
+import { onAddReposClick, onInstallGithubApp } from '@web/lib/actions/openPage';
+import { PROCESS_ENV_GITHUB_APP_NAME } from '@web/testing/testGlobals';
+
+const GITHUB_INSTALLATION_ID = 123;
+
+describe('openPage', (): void => {
+  describe('onAddReposClick', (): void => {
+    it('opens new tab with correct url', (): void => {
+      const windowOpenSpy = jest
+        .spyOn(window, 'open')
+        .mockImplementation((): null => null);
+
+      onAddReposClick(GITHUB_INSTALLATION_ID);
+
+      expect(windowOpenSpy).toBeCalledWith(
+        \`https://github.com/settings/installations/\${GITHUB_INSTALLATION_ID}\`
+      );
+    });
+  });
+
+  describe('onInstallGithubApp', (): void => {
+    it('opens new tab with correct url', (): void => {
+      const windowOpenSpy = jest
+        .spyOn(window, 'open')
+        .mockImplementation((): null => null);
+
+      onInstallGithubApp();
+
+      expect(windowOpenSpy).toBeCalledWith(
+        \`https://github.com/apps/\${PROCESS_ENV_GITHUB_APP_NAME}\`
+      );
+    });
+  });
+});
diff --git a/web/src/testing/testGlobals.ts b/web/src/testing/testGlobals.ts
new file mode 100644
index 0000000..85ea7e9
--- /dev/null
+++ b/web/src/testing/testGlobals.ts
@@ -0,0 +1,3 @@
+const PROCESS_ENV_GITHUB_APP_NAME = 'split-my-prs-test';
+
+export { PROCESS_ENV_GITHUB_APP_NAME };
`;

export {
  GITHUB_SINGLE_FILE_MULTIPLE_CHUNKS_DIFF,
  GITHUB_SINGLE_FILE_SINGLE_CHUNK,
  GITHUB_MULTIPLE_FILE_DIFF,
};
