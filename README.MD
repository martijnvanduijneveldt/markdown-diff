# markdown-diff
This module generates a difference between two markdown files while keeping renderable in a markdown format

WIP : feel free to open pull requests

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

```
Before : Simple sentence and delete
After  : Simple sentence with insert and

Output : Simple sentence <ins>with insert </ins>and<del> delete</del>
```
```
Before : helo
After  : hello

Output : hel<ins>l</ins>o
```
```
Before :
- ele one
- ele two
After  :
- ele one
- ele two
- ele three

Output :
- ele one
- ele two
- <ins>ele three</ins>
```

## License
[MIT](LICENSE)
