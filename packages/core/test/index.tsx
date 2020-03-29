import createElement from '@araki-packages/sandbox-monorepo-core';
const React = {
  createElement
};

const a = () => {
  return (
    <div>
      <>
        hogehoge
        hoge
        {'<div>hoge</div>'}
        hoge
        hoge
        hoge
      </>
      <p>world</p>
      <p>world</p>
      <p>world</p>
      <p>world</p>
      <p>world</p>
      <h1>hello</h1>
    </div>
  )
}
const main = () => {
  const wrap = document.getElementById('app');
  if (wrap == null) return;
  wrap.appendChild(a());
}

main();