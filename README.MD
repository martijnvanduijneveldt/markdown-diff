# markdown-diff
This module generates a difference between two markdown files while keeping renderable in a markdown format

> WIP : feel free to open pull requests

## Installation
Install with `npm`:
``` bash
$ npm install markdown-diff --save
```

Install with `yarn`:
``` bash
$ yarn add markdown-diff --save
```

## Usage
- Import
```js
import { markdownDiff } from 'markdown-diff';
```

- Usage
```js 
const res = markdownDiff('oldStr', 'newStr');
```

## Example 

### Simple sentence
```
Simple sentence and delete
Simple sentence with insert and
```
Simple sentence <ins>with insert </ins>and<del> delete</del>

### Lists
```
Before :
- ele one
- ele two
After  :
- ele one
- ele two
- ele three
```
- ele one
- ele two
- <ins>ele three</ins>

## TODO
- [ ] Blockquote nested line
- [ ] Espace token
- [ ] Html token
- [ ] Hr token
- [ ] Tag token

## License
[MIT](LICENSE)
