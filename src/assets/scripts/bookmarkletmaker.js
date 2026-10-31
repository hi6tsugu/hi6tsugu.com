(function () {
  const form = {
    script: document.getElementsByName('script')[0],
    encodeLineBreak: document.getElementsByName('encode-line-break')[0],
    title: document.getElementsByName('title')[0],
    result: document.querySelector('output a'),
  };
  function handle() {
    const data = form.script.value.trim().replace(
      /(\s*\n\s*)+/g, form.encodeLineBreak.checked ? '%0A' : ' '
    );
    form.result.href = `javascript:(function () { ${data || "alert('Hello!');"} })();`;
    form.result.textContent = form.title.value.trim() || 'Bookmarklet';
  }
  document.getElementsByTagName('button')[0].addEventListener('click', handle);
})();
