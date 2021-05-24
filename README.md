# Am I inside in-app browser

Series of tests to detect an in-app browser and attempts to escape from it.

## Introduction

Either due a lack of features or even by simply not sharing the cookies and other forms of storage with the default browser in mobile devices, working with in-app browsers are usually not a good experience for web developers and for the final user as well.

This repository is a study of attemps to:

1. Detect if the page is inside a in-app browser
2. Open a link outside of it

## Detection

Attempt 1: https://github.com/f2etw/detect-inapp

Attempt 2: https://gist.github.com/BorisChumichev/7c0ea033daf33da73306a396ffa174d1

Attempt 3: https://developers.whatismybrowser.com/api/docs/v2/

Attempt 4: https://www.npmjs.com/package/is-ua-webview

### Notes about detection

3 of 4 attemps here uses the user-agent as base for detection. Some applications that has this feature built changes the user-string to contain the name of the app, which makes this detection much more easier.

The last one take in account the width/height proportions of a window opened in Safari app and the Safari in-app browser.

## Escape

Attempt 1: anchor tag with target `_system`, trying to mimic [cordova](https://cordova.apache.org/docs/en/3.1.0/cordova/inappbrowser/window.open.html) functionality into the browser:

```html
<a href="https://http.cat" target="_system">Link 1</a>
```

Attempt 2: Variant of attempt 1 using `window.open()` instead of a anchor tag, also using the third argument of it to force a new window:

```js
<button onClick={() => window.open('https://http.cat', '_system', 'location=yes')}>Link 2</button>
```

Attempt 3: Using a Google Chrome deep link:

```js
// for android
<a href="googlechrome://navigate?url=http.cat" target="_system">Link 3</a>
// for iOS
<a href="googlechrome://http.cat" target="_system">Link 4</a>
```

## Results

## Questions without answers

- How's the process of build a in-app browser functionality works and what's the effort to change the user-agent string to contain your app name with the version build number?
- Is it possible to have a "general" deep link generation that opens an URL in the default mobile browser? Like an intent for android development but for mobile web?

## References

https://leemartin.dev/twitter-please-identify-yourself-in-your-app-webview-user-agent-4f58dbadfa05

https://leemartin.dev/in-app-browsers-i-forgive-thee-not-f87b25f9418e

https://mobiforge.com/research-analysis/webviews-and-user-agent-strings

https://www.stoutner.com/the-x-requested-with-header/

SO Threads:

https://developer.apple.com/forums/thread/105641

https://stackoverflow.com/questions/51917577/deep-link-to-open-safari-from-another-app

https://stackoverflow.com/questions/12013416/is-there-any-way-in-android-to-force-open-a-link-to-open-in-chrome

https://stackoverflow.com/questions/34491190/how-to-find-the-user-agent-string-for-linkedin-app-browser-from-ios

https://stackoverflow.com/questions/34359781/how-to-open-app-from-a-link-without-asking-user-to-decide-between-browser-or-app
