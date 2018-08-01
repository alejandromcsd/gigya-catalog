export function includesNonCase (value1, value2) {
  return value1.toString().toLowerCase().includes(value2.toLowerCase())
}

export function removeCategory (keyword) {
  return keyword.substring(keyword.indexOf(':') + 2)
}

export function reduceToList (properties, fieldName) {
  return properties.reduce((customers, item) =>
    customers.includes(item[fieldName])
      ? customers
      : [...customers, item[fieldName]], []).sort()
}

export function getFilename (url) {
  return url.substring(url.lastIndexOf('/') + 1)
}

export function toHTML (inputText) {
  var replacedText, replacePattern1, replacePattern2, replacePattern3

  // URLs starting with http://, https://, or ftp://
  // eslint-disable-next-line
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
  replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>')

  // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  // eslint-disable-next-line
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>')

  // Change email addresses to mailto:: links.
  // eslint-disable-next-line
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>')

  return replacedText
}

export function isMobile () {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
}
