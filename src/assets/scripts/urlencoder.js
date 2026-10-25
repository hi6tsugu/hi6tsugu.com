(function () {
  const source = document.getElementsByName('source')[0];
  const result = document.getElementsByName('result')[0];
  const conditions = document.getElementsByTagName('input');
  const actions = ['encode-%20', 'encode-+', 'decode'];
  function urlencode() {
    let value = source.value;
    let action = '';
    for (const condition of conditions) {
      if (condition.checked && actions.includes(condition.value)) {
        action = condition.value;
      }
    }
    if (action === '') {
      alert('1 つ選択してください');
      return;
    }
    try {
      if (action === 'decode') {
        value = decodeURIComponent(value.replace(/\+/g, ' '));
      } else {
        value = encodeURIComponent(value).replace(
          /[!'()*]/g, (match) => `%${match.charCodeAt(0).toString(16).toUpperCase()}`
        );
        if (action === 'encode-+') {
          value = value.replace(/%20/g, '+');
        }
      }
      result.value = value;
    } catch (e) {
      alert('文字列に問題があるため変換できませんでした\n' + e);
    }
  }
  document.getElementsByTagName('button')[0].addEventListener('click', urlencode);
})();
