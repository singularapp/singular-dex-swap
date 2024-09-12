export function random32bit() {
  const u = new Uint32Array(1);
  window.crypto.getRandomValues(u);
  const str = u[0].toString(16).toUpperCase();
  return "00000000".slice(str.length) + str;
}

export function randomHash(nChar) {
  let nBytes = Math.ceil((nChar = (+nChar || 8) / 2));
  let u = new Uint8Array(nBytes);
  window.crypto.getRandomValues(u);
  let zpad = (str) => "00".slice(str.length) + str;
  let a = Array.prototype.map.call(u, (x) => zpad(x.toString(16)));
  let str = a.join("").toUpperCase();
  if (nChar % 2) str = str.slice(1);
  return str;
}
