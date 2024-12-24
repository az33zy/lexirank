# LexiRank

[![Version](https://badgen.net/npm/v/lexirank)](https://www.npmjs.com/package/lexirank)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/lexirank)](https://bundlephobia.com/package/lexirank)
[![License](https://badgen.net/github/license/az33zy/lexirank)](LICENSE)

Ranking system for ordered lists that leverages lexicographic ordering feature of strings.

## Installation

### NPM

```bash
npm i lexirank
```

### PNPM

```bash
pnpm add lexirank
```

### Yarn

```bash
yarn add lexirank
```

### Bun

```bash
bun add lexirank
```

## Usage

```js
import { LexiRank, AsciiPrintableCharSet } from "lexirank"

const lexirank = new LexiRank(new AsciiPrintableCharSet())

const mid = lexirank.mid() // "O"
const beforeMid = lexirank.before(mid) // "8"
const afterMid = lexirank.after(mid) // "f"
const between = lexirank.between("A", "C") // "B"
```

## License

[MIT](./LICENSE)
