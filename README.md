# jwplayer-api [![Build Status](https://travis-ci.org/shuat/jwplayer-managment-api.svg?branch=master)](https://travis-ci.org/shuat/jwplayer-managment-api)

> A wrapper for jwplayer managment API


## Install

```
$ npm install --save jwplayer-managment-api
```


## Usage

```js
const JwPlayerApi = require('jwplayer-api');
const jwPlayerApi = new JwPlayerApi({
  key: "********",
  secret: "********"
})

const url = "videos/create";
const params = {
  title,
  sourcetype: "url",
  sourceurl: "https://videoUrl.mp4",
  sourceformat: 'mp4',
  tags: "tag"
}

jwPlayerApi.makeRequest('/videos/create',params).then(console.log).catch(console.error)

// OR 

console.log(jwPlayerApi.generateUrl('/videos/create',params))
```

## License

MIT © 2019 Bitbean LLC

