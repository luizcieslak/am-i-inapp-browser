# Am I inside in-app browser

Series of tests to detect an in-app browser (aka WebViews) and to escape from it.

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

Attempt 4: Using android intents:

```js
// android only
<a
	href='intent://navigate?url=www.http.cat#Intent;scheme=;package=com.android.browser;S.browser_fallback_url=http%3A%2F%2Fhttp.cat;end'
	target='_system'
>
	Link 5
</a>
```

## Results

**Is the in-app browser detectable?**

| App/OS  | LinkedIn | Facebook | Facebook Messenger | Instagram |
|---------|----------|----------|--------------------|-----------|
| Android | No*      | Yes      | Yes                | Yes       |
| iOS     | Yes      | Yes      | Yes                | Yes       |

LinkedIn For android does not use a custom instance of a WebView. It uses whatever the default browser is, keeping the storage, which is great.

WhatIsMyBrowser API (detection attempt 3) gave the same results as the simpler implementations.

**Is the in-app browser escapable?**

Only using chrome deep links (escape attempt 3). Currently all the other attemps failed.

`window.open()`, anchor tags with `target='_blank'`, `target='_system'` opens the other window within the same instance. 

`safari://url` deep link does not work.

`intent://` for android devices goes to Google Play Store with a spinner loading indefinitely (maybe I got the implementation wrongly).

This means that a explicit approach needs to be used in order to open another app inside a in-app browser. However, that does not work for Safari, which is a bummer.

In [statistics by StatCounter](https://gs.statcounter.com/) it gives you what is the market share of browsers, chrome being at ~64%. So, if you implement this funcitonality to escape from a in-app browser, you have this porcentace of change to make it work. I'm interested this proportion is the same for iOS devices only, since Safari is more a common browser used in this system, something that these statistics does not provide.

I have to state that I do not agree with this implementation since it reinforces the Google monopoly over the Web.

## Questions without answers

- How's the process of build a in-app browser functionality works and what's the effort to change the user-agent string to contain your app name with the version build number?
- Is it possible to have a "general" deep link generation that opens an URL in the default mobile browser? Like an intent for android development but for mobile web?
- How GitHub website/app does deep linking redirect? If u click in the "source code" link in the demo, it will open the GitHub app if you have that installed. In the anchor `href` there's no mention to the app whatsoever.

## References

https://leemartin.dev/twitter-please-identify-yourself-in-your-app-webview-user-agent-4f58dbadfa05

https://leemartin.dev/in-app-browsers-i-forgive-thee-not-f87b25f9418e

https://mobiforge.com/research-analysis/webviews-and-user-agent-strings

https://www.stoutner.com/the-x-requested-with-header/

https://developer.chrome.com/docs/multidevice/android/intents/

https://developer.apple.com/forums/thread/105641

https://blog.branch.io/technical-guide-to-android-chrome-intents/

https://twitter.com/NolanOBrien/status/1129041460026859520

SO Threads:

https://stackoverflow.com/questions/51917577/deep-link-to-open-safari-from-another-app

https://stackoverflow.com/questions/12013416/is-there-any-way-in-android-to-force-open-a-link-to-open-in-chrome

https://stackoverflow.com/questions/34491190/how-to-find-the-user-agent-string-for-linkedin-app-browser-from-ios

https://stackoverflow.com/questions/34359781/how-to-open-app-from-a-link-without-asking-user-to-decide-between-browser-or-app

https://android.stackexchange.com/questions/14869/the-name-of-the-default-android-browser
