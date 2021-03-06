export function includesNonCase (value1, value2) {
  return value1.toString().toLowerCase().includes(value2.toLowerCase())
}

export function removeCategory (keyword) {
  return keyword.substring(keyword.indexOf(':') + 2)
}
export function removeCategoryValue (keyword) {
  return keyword.substring(0, keyword.indexOf(':'))
}

function getQuarter (d) {
  d = d || new Date()
  var q = [1, 2, 3, 4]
  return q[Math.floor(d.getMonth() / 3)]
}

export function isMatchGoLiveDate (itemDate, filter) {
  const filterPeriod = removeCategory(filter)
  const now = new Date()
  const goLive = new Date(itemDate)
  var year = now.getFullYear()

  switch (filterPeriod) {
    case 'This month':
      return goLive.getMonth() === now.getMonth() &&
        goLive.getFullYear() === now.getFullYear()

    case 'Last month':
      let lastMonth = now.getMonth() - 1
      if (lastMonth === -1) {
        lastMonth = 11
        --year
      }
      return goLive.getMonth() === lastMonth &&
        goLive.getFullYear() === year

    case 'This quarter':
      return getQuarter(goLive) === getQuarter() &&
        goLive.getFullYear() === now.getFullYear()

    case 'Last quarter':
      let lastQuarter = getQuarter() - 1
      if (lastQuarter === 0) {
        lastQuarter = 4
        --year
      }

      return getQuarter(goLive) === lastQuarter &&
        goLive.getFullYear() === year

    case 'This year':
      return goLive.getFullYear() === now.getFullYear()

    case 'Last year':
      return goLive.getFullYear() === --year
  }
  return false
}

export function copyURLToClipboard () {
  var dummy = document.createElement('input')
  var text = window.location.href
  document.body.appendChild(dummy)
  dummy.value = text
  dummy.select()
  document.execCommand('copy')
  document.body.removeChild(dummy)
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

export function fromHTML (val) {
  return val ? val.replace(/<br\s*[/]?>/gi, '\n') : ''
}

export function toOneLine (val) {
  const suffix = val && val.length > 230 ? '...' : ''
  var regex = /(<([^>]+)>)/ig
  return val ? `${val.replace(/<br\s*[/]?>/gi, ' - ').replace(regex, '').substring(0, 230)} ${suffix}` : ''
}
