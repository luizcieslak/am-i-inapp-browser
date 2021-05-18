// from: https://gist.github.com/BorisChumichev/7c0ea033daf33da73306a396ffa174d1
const hasValidDocumentElementRatio = [
	320 / 454, // 5, SE
	375 / 553, // 6, 7, 8
	414 / 622, // 6, 7, 8 Plus
	375 / 812, // X
	414 / 896, // Xs, Xr
].some(ratio => ratio === document.documentElement.clientWidth / document.documentElement.clientHeight)

const hasSafariInUA = /Safari/.test(navigator.userAgent)

const isiOSSafari = hasSafariInUA && hasValidDocumentElementRatio // <- this one is set to false for webviews

export default isiOSSafari
