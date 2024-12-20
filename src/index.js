/**
 * @typedef {Object} CharacterSet
 * @property {() => string} min
 * @property {() => string} mid
 * @property {() => string} max
 * @property {(prevChar: string, nextChar: string) => string | null} between
 * @property {(str: string) => boolean} isValid
 */

/**
 * @implements {CharacterSet}
 */
export class AsciiPrintableCharSet {
  min() {
    return '!'; // 33
  }
  mid() {
    return 'O'; // 79
  }
  max() {
    return '~'; // 126
  }

  /**
   * @param {string} prevChar
   * @param {string} nextChar
   */
  between(prevChar, nextChar) {
    if (prevChar === nextChar) return null;

    const prevCharCode = prevChar.charCodeAt(0);
    const nextCharCode = nextChar.charCodeAt(0);

    if (prevCharCode === nextCharCode - 1) return null;

    const midCharCode =
      prevCharCode + Math.floor((nextCharCode - prevCharCode) / 2);

    const midChar = String.fromCharCode(midCharCode);

    return midChar;
  }

  /**
   * @param {string} str
   */
  isValid(str) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] < this.min() || str[i] > this.max()) {
        return false;
      }
    }
    return true;
  }
}

export class LexiRank {
  charSet;

  /**
   * @param {CharacterSet} charSet
   */
  constructor(charSet) {
    this.charSet = charSet;
  }

  between(prev = this.charSet.min(), next = this.charSet.max()) {
    this.assert(prev, next);

    let rank = '';
    let i = 0;

    while (true) {
      const prevChar = prev[i] ?? this.charSet.min();
      const nextChar = next[i] ?? this.charSet.max();

      const midChar = this.charSet.between(prevChar, nextChar);

      if (midChar === null) {
        rank += prevChar;
        i++;
        continue;
      }

      rank += midChar;
      break;
    }

    return rank;
  }

  /**
   * Alias for `.between(undefined, 'next')`
   * @param {string} next
   */
  before(next) {
    return this.between(undefined, next);
  }

  /**
   * Alias for `.between('prev', undefined)`
   * @param {string} prev
   */
  after(prev) {
    return this.between(prev, undefined);
  }

  mid() {
    return this.between();
  }

  /**
   * @param {string} prev
   * @param {string} next
   */
  assert(prev, next) {
    if (typeof prev !== 'string' || typeof next !== 'string') {
      throw new LexiRankInputError(`prev and next can only be string`);
    }

    if (prev === '' || next === '') {
      throw new LexiRankInputError(`prev and next can't be an empty string`);
    }

    if (prev >= next) {
      throw new LexiRankInputError(`prev should be smaller than next`);
    }

    if (!this.charSet.isValid(prev)) {
      throw new LexiRankInputError(`prev contains invalid characters`);
    }

    if (!this.charSet.isValid(next)) {
      throw new LexiRankInputError(`next contains invalid characters`);
    }
  }
}

export class LexiRankInputError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = 'LexiRankInputError';
  }
}
