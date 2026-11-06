/**
 * ImportJS
 *
 * @version 1.20131006
 * @author Ootani Hirotsugu <http://www.hi6tsugu.com/>
 */
var Import = (function () {

  /**
   * バージョン
   */
  var version = '1.20131006';

  /**
   * インポートの基点パス
   */
  var path = '';

  /**
   * インポートしたファイルリスト
   */
  var files = [];

  (function () {
    var scripts = document.getElementsByTagName('script');
    var src = scripts[scripts.length - 1].getAttribute('src');
    var index = src.lastIndexOf('/');
    if (index !== -1) {
      path = src.substring(0, index + 1);
      files.push(src.substring(index + 1));
    } else {
      files.push(src);
    }
  })();

  /**
   * 多重インポートの判定
   *
   * @param {string} filename ファイル名
   * @returns {boolean} すでにインポートしていれば true、そうでなければ false
   * @throws {string} filename が無効な場合に発生
   */
  var isImported = function (filename) {
    if (!filename || typeof filename !== 'string') {
      throw '[ImportJS] isImported(): invalid filename';
    }
    for (var i = files.length - 1; i >= 0; -- i) {
      if (filename === files[i]) {
        return true;
      }
    }
    return false;
  };

  /**
   * JS ファイルの追加
   *
   * @param {string} filepath 追加する JS ファイルのパス
   * @throws {string} filepath が無効な場合に発生
   */
  var addJs = function (filepath) {
    if (typeof document.getElementsByTagName('body')[0] !== 'undefined') {
      return;
    }
    if (!filepath || typeof filepath !== 'string') {
      throw '[ImportJS] addJs(): invalid filepath';
    }
    var index = filepath.lastIndexOf('/');
    var filename = (index !== -1) ? filepath.substring(index + 1) : filepath;
    if (!isImported(filename)) {
      var src = filepath;
      if (filepath.search(/^\/.+/) === -1 && filepath.search(/^https?:\/\/.+/) === -1) {
        src = path + filepath;
      }
      document.writeln('<script src="' + src + '"><\/script>');
      files.push(filename);
    }
  };

  /**
   * CSS ファイルの追加
   *
   * @param {string} filepath 追加する CSS ファイルのパス
   * @param {string} media 追加する CSS を適用するメディア、デフォルト値は all
   * @throws {string} filepath または media が無効な場合に発生
   */
  var addCss = function (filepath, media) {
    if (typeof document.getElementsByTagName('body')[0] !== 'undefined') {
      return;
    }
    if (!filepath || typeof filepath !== 'string') {
      throw '[ImportJS] addCss(): invalid filepath';
    }
    media = media || 'all';
    if (typeof media !== 'string') {
      throw '[ImportJS] addCss(): invalid media';
    }
    var index = filepath.lastIndexOf('/');
    var filename = (index !== -1) ? filepath.substring(index + 1) : filepath;
    if (!isImported(filename)) {
      var href = filepath;
      if (filepath.search(/^\/.+/) === -1 && filepath.search(/^https?:\/\/.+/) === -1) {
        href = path + filepath;
      }
      document.writeln('<link rel="stylesheet" href="' + href + '" media="' + media + '">');
      files.push(filename);
    }
  };

  return {
    version: function () { return version; },
    path: function () { return path; },
    js: addJs,
    css: addCss
  };
})();
