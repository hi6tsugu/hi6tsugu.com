(function () {
  const form = {
    source: document.getElementsByName('source')[0],
    targets: document.getElementsByName('target'),
    result: document.getElementsByName('result')[0],
  };
  const targetValues = ['all', 'some'];
  function handle() {
    const target = [...form.targets].find((e) => e.checked)?.value;
    form.result.value = '';
    if (!targetValues.includes(target)) {
      alert('対象を選択してください');
      return;
    }
    form.result.value = [...form.source.value].map(
      (c) => (target === 'some' && Math.round(Math.random())) ? c : `&#${c.codePointAt(0)};`
    ).join('');
  }
  document.getElementsByTagName('button')[0].addEventListener('click', handle);
})();
