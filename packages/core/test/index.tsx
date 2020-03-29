import h, { JSX } from '@araki-packages/sandbox-monorepo-core';

const a = () => {
  return (
    <div>
      <h1>
        hogehoge
        hoge
        {'<div>hoge</div>'}
        hoge
        hoge
        hoge
      </h1>
      <p>world</p>
      <p>world</p>
      <p>world</p>
      <p>world</p>
      <p>world</p>
      <h1>hello</h1>
    </div>
  )
}
console.log(a);
const main = () => {
  const wrap = document.getElementById('app');
  if (wrap == null) return;
  wrap.appendChild(a());
}

main();