(function () {
  const colorNames = ['red', 'green', 'blue', 'cyan', 'magenta', 'yellow'];
  const colorIndex = Date.now() % colorNames.length;
  document.body.setAttribute('data-theme', colorNames[colorIndex]);
})();
