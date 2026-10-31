(function () {
  const form = {
    source: document.getElementsByName('source')[0],
    actions: document.getElementsByName('action'),
    result: document.getElementsByName('result')[0],
  };
  const actionValues = ['encode-%20', 'encode-+', 'decode'];
  function handle() {
    const action = [...form.actions].find((e) => e.checked)?.value;
    form.result.value = '';
    if (!actionValues.includes(action)) {
      alert('1 つ選択してください');
      return;
    }
    try {
      let data = form.source.value;
      if (action === 'decode') {
        data = decodeURIComponent(data.replace(/\+/g, ' '));
      } else {
        data = encodeURIComponent(data).replace(
          /[!'()*]/g, (m) => `%${m.charCodeAt(0).toString(16).toUpperCase()}`
        );
        if (action === 'encode-+') {
          data = data.replace(/%20/g, '+');
        }
      }
      form.result.value = data;
    } catch (e) {
      alert(`文字列に問題があるため変換できませんでした\n${e}`);
    }
  }
  document.getElementsByTagName('button')[0].addEventListener('click', handle);
})();
