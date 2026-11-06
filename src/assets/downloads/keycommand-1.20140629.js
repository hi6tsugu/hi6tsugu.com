/**
 * KeyCommandJS
 *
 * @version 1.20140629
 * @author Ootani Hirotsugu <http://www.hi6tsugu.com/>
 */
var KeyCommand = (function () {

  /**
   * バージョン
   */
  var version = '1.20140629';

  /**
   * コマンド ID シード
   */
  var idSeed = 0;

  /**
   * 登録コマンドリスト
   */
  var commands = {};

  /**
   * 押下状態キーリスト
   */
  var heldKeys = {};

  /**
   * コマンドクラス
   */
  var Command = (function () {

    /**
     * キー文字列とキーコード
     */
    var stringToCodes = {
      'backspace': 8,
      'bs': 8,
      'tab': 9,
      'enter': 13,
      'return': 13,
      'shift': 16,
      'control': 17,
      'ctrl': 17,
      'alt': 18,
      'capslock': 20,
      'escape': 27,
      'esc': 27,
      'space': 32,
      'pageup': 33,
      'pgup': 33,
      'pagedown': 34,
      'pgdn': 34,
      'end': 35,
      'home': 36,
      'left': 37,
      '←': 37,
      'up': 38,
      '↑': 38,
      'right': 39,
      '→': 39,
      'down': 40,
      '↓': 40,
      'insert': 45,
      'ins': 45,
      'delete': 46,
      'del': 46,
      '0': 48,
      '1': 49,
      '2': 50,
      '3': 51,
      '4': 52,
      '5': 53,
      '6': 54,
      '7': 55,
      '8': 56,
      '9': 57,
      'a': 65,
      'b': 66,
      'c': 67,
      'd': 68,
      'e': 69,
      'f': 70,
      'g': 71,
      'h': 72,
      'i': 73,
      'j': 74,
      'k': 75,
      'l': 76,
      'm': 77,
      'n': 78,
      'o': 79,
      'p': 80,
      'q': 81,
      'r': 82,
      's': 83,
      't': 84,
      'u': 85,
      'v': 86,
      'w': 87,
      'x': 88,
      'y': 89,
      'z': 90,
      'f1': 112,
      'f2': 113,
      'f3': 114,
      'f4': 115,
      'f5': 116,
      'f6': 117,
      'f7': 118,
      'f8': 119,
      'f9': 120,
      'f10': 121,
      'f11': 122,
      'f12': 123
    };

    /**
     * コンストラクター
     *
     * @param {string} sequence シーケンスをキーごとに半角スペースで区切った文字列
     * @param {function} done キー入力がシーケンスと完全に一致したときに実行する処理
     *                        - {string[]} keyStrings シーケンスのキーを要素にした配列
     * @param {function} pass キー入力がシーケンスの先頭から一致しているときに実行する処理
     *                        - {string[]} keyStrings シーケンスのキーを要素にした配列
     *                        - {number} index キー入力と比較したシーケンスのキーの位置 (開始は 0)
     * @param {function} fail キー入力がシーケンスの先頭から一致しなくなったときに実行する処理
     *                        - {string[]} keyStrings シーケンスのキーを要素にした配列
     *                        - {number} index キー入力と比較したシーケンスのキーの位置 (開始は 0)
     * @param {boolean} listen コマンドの状態を設定するフラグ
     * @throws {string} エラーメッセージ
     */
    function Command(sequence, done, pass, fail, listen) {
      if (typeof sequence !== 'string') {
        throw '[KeyCommandJS] invalid sequence';
      }
      sequence = sequence.trim();
      if (sequence === '') {
        throw '[KeyCommandJS] invalid sequence';
      }
      this.keyStrings = sequence.replace(/ +/g, ' ').split(' ');
      this.keyCodes = [];
      for (var i = 0, length = this.keyStrings.length; i < length; ++ i) {
        var code = stringToCodes[this.keyStrings[i].toLowerCase()];
        if (!code) {
          throw '[KeyCommandJS] invalid key string in sequence';
        }
        this.keyCodes.push(code);
      }
      if (typeof done !== 'function') {
        throw '[KeyCommandJS] invalid done()';
      }
      if (typeof pass !== 'function') {
        throw '[KeyCommandJS] invalid pass()';
      }
      if (typeof fail !== 'function') {
        throw '[KeyCommandJS] invalid fail()';
      }
      if (typeof listen !== 'boolean') {
        throw '[KeyCommandJS] invalid listen';
      }
      this.done = done;
      this.pass = pass;
      this.fail = fail;
      this.listen = listen;
      this.index = 0;
    }

    /**
     * 入力
     *
     * @param {number} keyCode キーコード
     */
    Command.prototype.input = function (keyCode) {
      if (!this.listen) {
        return;
      }
      // 数字キーとテンキーの 0 - 9 を標準キーの 0 - 9 に置換
      if (keyCode >= 96 && keyCode <= 105) {
        keyCode -= 48;
      }
      if (keyCode !== this.keyCodes[this.index]) {
        if (this.index > 0) {
          this.fail(this.keyStrings, this.index);
          this.reset();
          // 1 文字目のキー入力として再度処理
          this.input(keyCode);
        }
        return;
      }
      this.pass(this.keyStrings, this.index);
      if (++ this.index === this.keyCodes.length) {
        this.done(this.keyStrings);
        this.reset();
      }
    };

    /**
     * 有効化
     */
    Command.prototype.enable = function () {
      this.listen = true;
    };

    /**
     * 無効化
     */
    Command.prototype.disable = function () {
      this.listen = false;
      this.reset();
    };

    /**
     * リセット
     */
    Command.prototype.reset = function () {
      this.index = 0;
    };

    return Command;
  })();

  /**
   * イベント処理の登録
   */
  var keydownListener = function (e) {
    e = e ? e : event;
    var target = e.target.tagName.toLowerCase();
    if (target !== 'body' && target !== 'html') {
      keyreleaseListener(e);
      return;
    }
    var keyCode = e.keyCode;
    if (heldKeys[keyCode]) {
      return;
    }
    heldKeys[keyCode] = true;
    for (var id in commands) {
      commands[id].input(keyCode);
    }
  };
  var keyupListener = function (e) {
    heldKeys[e ? e.keyCode : event.keyCode] = false;
  };
  var keyreleaseListener = function (e) {
    for (var keyCode in heldKeys) {
      heldKeys[keyCode] = false;
    }
  };
  var on = function (element, type, listener) {
    if (element.addEventListener) {
      element.addEventListener(type, listener, false);
    } else if (element.attachEvent) {
      element['e' + type + listener] = listener;
      element[type + listener] = function () {
        element['e' + type + listener](event);
      };
      element.attachEvent('on' + type, element[type + listener]);
    }
  };
  on(window, 'keydown', keydownListener);
  on(window, 'keyup', keyupListener);
  on(window, 'blur', keyreleaseListener);
  on(window, 'focus', keyreleaseListener);

  /**
   * コマンドの登録
   *
   * @param {string} sequence シーケンスをキーごとに半角スペースで区切った文字列
   * @param {function|object} arg キー入力がシーケンスと完全に一致したときに実行する処理、
   *                              またはキー入力とシーケンスの一致状況に応じた処理や状態フラグなどの設定オブジェクト
   * @returns {number|undefined} コマンド ID
   * @see Command
   */
  var set = function (sequence, arg) {
    if (typeof arg === 'function') {
      arg = { done: arg };
    } else if (typeof arg !== 'object' || arg === null) {
      console.error('[KeyCommandJS] set(): invalid arg');
      return;
    }
    var done = arg.done;
    var pass = arg.pass !== undefined ? arg.pass : function () { };
    var fail = arg.fail !== undefined ? arg.fail : function () { };
    var listen = arg.listen !== undefined ? arg.listen : true;
    var id = ++ idSeed;
    try {
      commands[id] = new Command(sequence, done, pass, fail, listen);
      return id;
    } catch (e) {
      console.error('[KeyCommandJS] set(): ' + e);
      return;
    }
  };

  /**
   * コマンドの削除
   *
   * @param {number} id コマンド ID
   */
  var clear = function (id) {
    delete commands[id];
  };

  /**
   * コマンドの有効化
   *
   * @param {number} id コマンド ID
   */
  var enable = function (id) {
    var command = commands[id];
    if (!(command instanceof Command)) {
      console.warn('[KeyCommandJS] enable(): invalid id');
      return;
    }
    command.enable();
  };

  /**
   * コマンドの無効化
   *
   * @param {number} id コマンド ID
   */
  var disable = function (id) {
    var command = commands[id];
    if (!(command instanceof Command)) {
      console.warn('[KeyCommandJS] disable(): invalid id');
      return;
    }
    command.disable();
  };

  /**
   * コマンドのリセット
   *
   * @param {number} id コマンド ID
   */
  var reset = function (id) {
    var command = commands[id];
    if (!(command instanceof Command)) {
      console.warn('[KeyCommandJS] reset(): invalid id');
      return;
    }
    command.reset();
  };

  return {
    set: set,
    clear: clear,
    enable: enable,
    disable: disable,
    reset: reset,
    version: function () { return version; }
  };
})();
