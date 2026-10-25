(function () {
  const source = document.getElementsByName('source')[0];
  const result = document.getElementsByName('result')[0];
  const conditions = document.getElementsByTagName('input');
  const escapeTargets = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
  };
  const unescapeTargets = {
    '&apos;': '\'',
    '&quot;': '"',
    '&gt;': '>',
    '&lt;': '<',
    '&amp;': '&',
  };
  function modify() {
    let value = source.value.replace(/\r\n|\r/g, '\n');
    for (const condition of conditions) {
      if (!condition.checked) {
        continue;
      }
      switch (condition.name) {
        case 'replace-indent':
          value = value.replace(/^[　\t]+/gm, (match) => '  '.repeat(match.length));
          break;
        case 'delete-whitespace-start':
          value = value.replace(/^\s+/gm, '');
          break;
        case 'delete-whitespace-end':
          value = value.replace(/\s+$/gm, '');
          break;
        case 'delete-line-blank':
          value = value.replace(/^\s*\n/gm, '');
          break;
        case 'replace-line-break':
          value = value.replace(/\n/g, ' ');
          break;
        case 'delete-line-break':
          value = value.replace(/\n/g, '');
          break;
        case 'escape':
          for (const t in escapeTargets) {
            value = value.replace(new RegExp(t, 'g'), escapeTargets[t]);
          }
          break;
        case 'unescape':
          for (const t in unescapeTargets) {
            value = value.replace(new RegExp(t, 'g'), unescapeTargets[t]);
          }
          break;
      }
    }
    result.value = value;
  }
  document.getElementsByTagName('button')[0].addEventListener('click', modify);
})();
