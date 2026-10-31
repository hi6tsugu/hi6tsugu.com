(function () {
  const form = {
    source: document.getElementsByName('source')[0],
    replaceTabIndent: document.getElementsByName('replace-tabindent')[0],
    deleteWhitespaceStart: document.getElementsByName('delete-whitespace-start')[0],
    deleteWhitespaceEnd: document.getElementsByName('delete-whitespace-end')[0],
    deleteBlankLine: document.getElementsByName('delete-blankline')[0],
    replaceLineBreak: document.getElementsByName('replace-linebreak')[0],
    deleteLineBreak: document.getElementsByName('delete-linebreak')[0],
    escape: document.getElementsByName('escape')[0],
    unescape: document.getElementsByName('unescape')[0],
    result: document.getElementsByName('result')[0],
  };
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
  function handle() {
    let data = form.source.value;
    if (form.replaceTabIndent.checked) {
      data = data.replace(/^\t+/gm, (m) => '  '.repeat(m.length));
    }
    if (form.deleteWhitespaceStart.checked) {
      data = data.replace(/^[^\S\n]+/gm, '');
    }
    if (form.deleteWhitespaceEnd.checked) {
      data = data.replace(/[^\S\n]+$/gm, '');
    }
    if (form.deleteBlankLine.checked) {
      data = data.replace(/^[^\S\n]*\n/gm, '');
    }
    if (form.replaceLineBreak.checked) {
      data = data.replace(/\n/g, ' ');
    }
    if (form.deleteLineBreak.checked) {
      data = data.replace(/\n/g, '');
    }
    if (form.escape.checked) {
      for (const [k, v] of Object.entries(escapeTargets)) {
        data = data.replace(new RegExp(k, 'g'), v);
      }
    }
    if (form.unescape.checked) {
      for (const [k, v] of Object.entries(unescapeTargets)) {
        data = data.replace(new RegExp(k, 'g'), v);
      }
    }
    form.result.value = data;
  }
  document.getElementsByTagName('button')[0].addEventListener('click', handle);
})();
