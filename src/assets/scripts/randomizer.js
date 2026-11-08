(function () {
  const form = {
    seedNumber: document.getElementsByName('seed-number')[0],
    seedLowercase: document.getElementsByName('seed-lowercase')[0],
    seedUppercase: document.getElementsByName('seed-uppercase')[0],
    seedSymbol: document.getElementsByName('seed-symbol')[0],
    count: document.getElementsByName('count')[0],
    total: document.getElementsByName('total')[0],
    result: document.getElementsByName('result')[0],
  };
  function toInteger(value) {
    const data = Number(value.replace(
      /[０-９]/g, (m) => String.fromCharCode(m.charCodeAt(0) - 0xFEE0)
    ));
    return Number.isInteger(data) ? data : 0;
  }
  function handle() {
    const seed = (form.seedNumber.checked ? '0123456789' : '')
      + (form.seedLowercase.checked ? 'abcdefghijklmnopqrstuvwxyz' : '')
      + (form.seedUppercase.checked ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '')
      + (form.seedSymbol.checked ? '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~' : '');
    const count = toInteger(form.count.value);
    const total = toInteger(form.total.value);
    form.result.value = '';
    if (seed === '') {
      alert('種類を 1 つ以上選択してください。');
      return;
    }
    if (count < 1) {
      alert('文字数を 1 以上の正数で入力してください');
      return;
    }
    if (total < 1) {
      alert('個数を 1 以上の正数で入力してください');
      return;
    }
    form.result.value = Array(total).fill('').map((s) => {
      for (let i = 0; i < count; ++ i) {
        s += String(seed[Math.floor(Math.random() * seed.length)]);
      }
      return s;
    }).join('\n');
  }
  document.getElementsByTagName('button')[0].addEventListener('click', handle);
})();
