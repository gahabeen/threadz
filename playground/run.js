const { api } = require('./api');

(async () => {
  const worker = api.interactWith('test').onStart(() => {
    console.log('worker started');
  }).go();
  // const result = await new Promise((resolve) => );

  // console.log('result', result);

})();