(function () {
  const result = document.getElementsByName('result')[0];
  const conditions = document.getElementsByTagName('input');
  function randomize() {
    const values = [];
    let seed = '';
    let count = 0;
    let total = 0;
    for (const condition of conditions) {
      switch (condition.name) {
        case 'seed-number':
          if (condition.checked) {
            seed += '0123456789';
          }
          break;
        case 'seed-lowercase':
          if (condition.checked) {
            seed += 'abcdefghijklmnopqrstuvwxyz';
          }
          break;
        case 'seed-uppercase':
          if (condition.checked) {
            seed += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          }
          break;
        case 'seed-symbol':
          if (condition.checked) {
            seed += '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
          }
          break;
        case 'count':
          count = Number(condition.value.replace(
            /[０-９]/g, (match) => String.fromCharCode(match.charCodeAt(0) - 0xFEE0)
          ));
          if (!Number.isInteger(count)) {
            count = 0;
          }
          break;
        case 'total':
          total = Number(condition.value.replace(
            /[０-９]/g, (match) => String.fromCharCode(match.charCodeAt(0) - 0xFEE0)
          ));
          if (!Number.isInteger(total)) {
            total = 0;
          }
          break;
      }
    }
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
    for (let x = 0; x < total; ++ x) {
      values[x] = '';
      for (let y = 0; y < count; ++ y) {
        values[x] += String(seed[Math.floor(Math.random() * seed.length)]);
      }
    }
    result.value = values.join('\n');
  }
  document.getElementsByTagName('button')[0].addEventListener('click', randomize);
})();
