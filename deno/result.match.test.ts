import { assertEquals } from '../test_deps.ts';
import { Result } from '../mod.ts';

/** Example function that increments a number if it is positive and returns an
 * error otherwise. */
function maybeIncrementPositive(x: number): Result<number, string> {
  if (x > 0) {
    return Result.ok(x + 1);
  } else {
    return Result.error('fail');
  }
}

Deno.test({
  name: 'Result.ok(x).match({ok, error}) returns ok(x)',
  fn: () => {
    const n = maybeIncrementPositive(1).match({
      ok: (x) => x + 1,
      error: () => 0,
    });

    assertEquals(n, 3);
  },
});

Deno.test({
  name: 'Result.error(x).match({ok, error}) returns error(x)',
  fn: () => {
    const n = maybeIncrementPositive(0).match({
      ok: () => 0,
      error: (e) => e.length,
    });

    assertEquals(n, 4);
  },
});
