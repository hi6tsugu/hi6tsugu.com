(function () {
  const colors = ['red', 'green', 'blue', 'cyan', 'magenta', 'yellow'];
  const index = Date.now() % colors.length;
  document.body.setAttribute('data-theme', colors[index]);
})();
