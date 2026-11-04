import { describe, expect, it } from 'vitest';
import { runPage } from './page';

const PAGE = `<style>
  body { margin: 0; }
  .rad { display: flex; gap: 16px; align-items: center; }
  .rad div { width: 100px; height: 50px; }
  .rad .hog { height: 80px; }
  .rutnat { display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 20px 10px; width: 420px; }
  .rutnat p { margin: 0; height: 30px; }
  .bakvand { display: flex; flex-direction: row-reverse; justify-content: flex-end; }
  .bred { width: 400px; }
  @media (max-width: 500px) { .rad { flex-direction: column; } .bred { width: 100%; } }
</style>
<div class="rad"><div>A</div><div class="hog">B</div><div>C</div></div>
<div class="rutnat"><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p></div>
<div class="bakvand"><span>först</span><span>sist</span></div>
<div class="bred">Bred</div>`;

const run = async (code, width) =>
  (await runPage({ code: PAGE, tests: [{ code, width }] })).tests[0].actual;

describe('hjälparna för layout (i Chrome)', () => {
  it('ser rader även när elementen har olika höjd', async () => {
    expect(await run("rows('.rad div')")).toBe(1);
    expect(await run("perRow('.rad div')")).toBe(3);
    expect(await run("gapX('.rad div')")).toBe(16);
    expect(await run("heights('.rad div')")).toEqual([50, 80, 50]);
  });

  it('mäter ett rutnät', async () => {
    expect(await run("rows('.rutnat p')")).toBe(2);
    expect(await run("perRow('.rutnat p')")).toBe(3);
    expect(await run("widths('.rutnat p')")).toEqual([100, 200, 100, 100, 200]);
    expect(await run("gapX('.rutnat p')")).toBe(10);
    expect(await run("gapY('.rutnat p')")).toBe(20);
  });

  it('ger texterna i den ordning de syns', async () => {
    expect(await run("inOrder('.bakvand span')")).toEqual(['sist', 'först']);
    expect(await run("rect('.bred')")).toMatchObject({ left: 0, width: 400 });
  });

  it('rättar i en annan bredd så att @media slår till', async () => {
    expect(await run("rows('.rad div')", 375)).toBe(3);
    expect(await run("widths('.bred')", 375)).toEqual([375]);
    expect(await run('fitsScreen()')).toBe(true);
    expect(await run('fitsScreen()', 375)).toBe(false);
  });

  it('blandar bredder i samma körning', async () => {
    const result = await runPage({
      code: PAGE,
      tests: [
        { code: "rows('.rad div')", width: 375 },
        { code: "rows('.rad div')" },
      ],
    });
    expect(result.tests.map(test => test.actual)).toEqual([3, 1]);
  });
});
