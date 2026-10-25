(function () {
  const script = document.getElementsByName('script')[0];
  const title = document.getElementsByName('title')[0];
  const bookmarklet = document.querySelector('output a');
  const condition = document.getElementsByName('encode-line-break')[0];
  function bookmarkletmake() {
    const value = script.value.trim().replace(/(\s*\n\s*)+/g, condition.checked ? '%0A' : ' ');
    bookmarklet.href = `javascript:(function () { ${value || "alert('Hello!');"} })();`;
    bookmarklet.textContent = title.value.trim() || 'Bookmarklet';
  }
  document.getElementsByTagName('button')[0].addEventListener('click', bookmarkletmake);
})();
