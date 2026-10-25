(function () {
  const source = document.getElementsByName('source')[0];
  const result = document.getElementsByName('result')[0];
  const conditions = document.getElementsByTagName('input');
  const targets = ['all', 'some'];
  function entitize() {
    let target = '';
    const excludeds = {
      lineBreak: false,
    };
    for (const condition of conditions) {
      switch (condition.name) {
        case 'target':
          if (condition.checked && targets.includes(condition.value)) {
            target = condition.value;
          }
          break;
        case 'exclude-line-break':
          excludeds.lineBreak = condition.checked;
          break;
      }
    }
    if (target === '') {
      alert('対象を選択してください');
      return;
    }
    result.value = [...source.value].map((element) => {
      if (element === '\n' && excludeds.lineBreak) {
        return element;
      } else if (target === 'some' && Math.round(Math.random())) {
        return element;
      }
      return `&#${element.codePointAt(0)};`;
    }).join('');
  }
  document.getElementsByTagName('button')[0].addEventListener('click', entitize);
})();
