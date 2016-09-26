UnWX
===

> a simple unpackage scripts for weapp wx file.



| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

| Packet Head       | File Info Packet                                                      | File Data                         |
| ----------------- | --------------------------------------------------------------------- | --------------------------------- |
| packet head       | filenumber \| path length \| path \| current pos \| file data length \| ..  | file data \| .. |
| 1 \| 4 \| 4 \| 4 \| 1 |  4         \| 4               \|  path length  \| 4                   \| hello.js data length \| ..| console.log(..)  \|..|

Usage:

```bash
npm install -g unwx
```

```
unwx -i output.wx
```

License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

© 2016 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the MIT license. See `LICENSE` in this directory.

[待我代码编成，娶你为妻可好](http://www.xuntayizhan.com/blog/ji-ke-ai-qing-zhi-er-shi-dai-wo-dai-ma-bian-cheng-qu-ni-wei-qi-ke-hao-wan/)
