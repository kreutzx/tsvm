import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
const I = process.env.MAKEFUN_INPUT_DIR ?? '/input', O = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
function run(p, q) {
  const S = new Int32Array(256), C = new Int32Array(64), M = new Int32Array(256), o = new Uint8Array(65536);
  let s = 0, c = 0, l = 0, i = 0, x = 0, t = 0;
  const n = p.length, e = y => [o.subarray(0, l), y];
  for (;;) {
    if (t === 1e6) return e(10);
    if (x < 0 || x >= n) return e(9);
    const k = p[x], m = k === 1 ? 1 : k === 2 ? 4 : k > 47 && k < 52 ? 2 : 0;
    if (x + m >= n) return e(9);
    t++;
    const z = x + 1 + m;
    x = z;
    switch (k) {
      case 0: return e(0);
      case 1:
        if (s > 255) return e(3);
        S[s++] = (p[z - 1] << 24) >> 24;
        break;
      case 2:
        if (s > 255) return e(3);
        S[s++] = p[z - 4] | p[z - 3] << 8 | p[z - 2] << 16 | p[z - 1] << 24;
        break;
      case 3:
        if (s < 1) return e(2);
        s--;
        break;
      case 4:
        if (s < 1) return e(2);
        if (s > 255) return e(3);
        S[s] = S[s - 1];
        s++;
        break;
      case 5:
        if (s < 2) return e(2);
        { const v = S[s - 1]; S[s - 1] = S[s - 2]; S[s - 2] = v; }
        break;
      case 6:
        if (s < 2) return e(2);
        if (s > 255) return e(3);
        S[s] = S[s - 2];
        s++;
        break;
      case 7:
        if (s < 3) return e(2);
        { const a = S[s - 3]; S[s - 3] = S[s - 2]; S[s - 2] = S[s - 1]; S[s - 1] = a; }
        break;
      case 23:
        if (s < 1) return e(2);
        S[s - 1] = -S[s - 1] | 0;
        break;
      case 27:
        if (s < 1) return e(2);
        S[s - 1] = ~S[s - 1];
        break;
      case 16: case 17: case 18: case 19: case 20: case 21: case 22:
      case 24: case 25: case 26: case 28: case 29: case 30: case 32: case 33: case 34: {
        if (s < 2) return e(2);
        const b = S[s - 1], a = S[s - 2];
        let r;
        if (k > 18 && k < 23) {
          if (!b) return e(4);
          r = k === 19 ? a === -2147483648 && b === -1 ? a : a / b | 0
            : k === 20 ? b === -1 ? 0 : a % b | 0
            : k === 21 ? (a >>> 0) / (b >>> 0) | 0 : (a >>> 0) % (b >>> 0) | 0;
        } else r = k === 16 ? a + b | 0 : k === 17 ? a - b | 0 : k === 18 ? Math.imul(a, b)
          : k === 24 ? a & b : k === 25 ? a | b : k === 26 ? a ^ b : k === 28 ? a << b
          : k === 29 ? a >> b : k === 30 ? a >>> b | 0 : k === 32 ? a === b ? 1 : 0
          : k === 33 ? a < b ? 1 : 0 : (a >>> 0) < (b >>> 0) ? 1 : 0;
        s -= 2;
        S[s++] = r;
        break;
      }
      case 48: case 49: case 50: {
        const v = ((p[z - 2] | p[z - 1] << 8) << 16) >> 16;
        let g = true;
        if (k !== 48) {
          if (s < 1) return e(2);
          const w = S[--s];
          g = k === 49 ? w === 0 : w !== 0;
        }
        if (g) x = z + v;
        break;
      }
      case 51:
        if (c === 64) return e(7);
        C[c++] = z;
        x = p[z - 2] | p[z - 1] << 8;
        break;
      case 52:
        if (c === 0) return e(8);
        x = C[--c];
        break;
      case 64:
        if (s < 1) return e(2);
        { const a = S[s - 1];
          if (a < 0 || a > 255) return e(6);
          S[s - 1] = M[a]; }
        break;
      case 65: {
        if (s < 2) return e(2);
        const a = S[s - 1], v = S[s - 2];
        if (a < 0 || a > 255) return e(6);
        s -= 2;
        M[a] = v;
        break;
      }
      case 80: {
        if (s < 1) return e(2);
        const w = String(S[s - 1]);
        if (l + w.length > 65536) return e(11);
        s--;
        for (let j = 0; j < w.length; j++) o[l++] = w.charCodeAt(j);
        break;
      }
      case 81:
        if (s < 1) return e(2);
        if (l + 1 > 65536) return e(11);
        o[l++] = S[--s] & 255;
        break;
      case 82:
        if (s > 255) return e(3);
        S[s++] = i < q.length ? q[i++] : -1;
        break;
      case 83:
        if (s < 1) return e(2);
        return e(S[--s] & 255);
      default: return e(5);
    }
  }
}
for (const d of readdirSync(I).sort()) {
  const [u, y] = run(readFileSync(I + '/' + d + '/program.bin'), readFileSync(I + '/' + d + '/input.bin'));
  mkdirSync(O + '/' + d, { recursive: true });
  writeFileSync(O + '/' + d + '/stdout.bin', u);
  writeFileSync(O + '/' + d + '/exit.txt', y + '\n');
}
