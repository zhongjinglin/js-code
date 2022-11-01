function _get(url, onSuccess, onError) {
  const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
  xhr.open('GET', url, true)
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.onreadystatechange = function(){
    if (xhr.readyState !== 4) return
    if (xhr.status === 200 || xhr.status === 304) {
      onSuccess(xhr.responseText)
    } else {
      onError(xhr.responseText)
    }
  }
  xhr.send()
}