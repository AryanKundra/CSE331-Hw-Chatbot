import * as assert from 'assert';
import {createMutableMap } from './map';

describe('MutableMap', function() {
  it('containsKey', function() {
    const map = createMutableMap<number>();

    // 0-1-many: base case, 0 recursive calls (only 1 possible input)
    assert.deepStrictEqual(map.containsKey('a'), false);

    // 0-1-many: 1 recursive call
    map.set('a', 1);
    assert.deepStrictEqual(map.containsKey('a'), true);
    assert.deepStrictEqual(map.containsKey('b'), false);

    // 0-1-many: 2+ recursive calls
    map.set('b', 2);
    assert.deepStrictEqual(map.containsKey('a'), true);
    assert.deepStrictEqual(map.containsKey('b'), true);
    assert.deepStrictEqual(map.containsKey('c'), false);
  });

  it('getVal', function() {
    const map = createMutableMap<number>();

    // 0-1-many: 0 recursive calls - throws error
    assert.throws(() => map.getVal('a'), Error);

    // 0-1-many: 1 recursive call
    map.set('a', 1);
    assert.deepStrictEqual(map.getVal('a'), 1);
    assert.throws(() => map.getVal('b'), Error);

    // 0-1-many: 2+ recursive calls
    map.set('b', 2);
    assert.deepStrictEqual(map.getVal('a'), 1);
    assert.deepStrictEqual(map.getVal('b'), 2);
    assert.throws(() => map.getVal('c'), Error);
  });

  it('set', function() {
    const map = createMutableMap<number>();

    // 0-1-many: base case, 0 recursive calls (only 1 possible input)
    assert.deepStrictEqual(map.set('a', 1), false);
    assert.deepStrictEqual(map.getVal('a'), 1);

    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(map.set('a', 2), true);
    assert.deepStrictEqual(map.getVal('a'), 2);
    assert.deepStrictEqual(map.set('b', 3), false);
    assert.deepStrictEqual(map.getVal('b'), 3);

    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(map.set('c', 4), false);
    assert.deepStrictEqual(map.getVal('a'), 2);
    assert.deepStrictEqual(map.getVal('b'), 3);
    assert.deepStrictEqual(map.getVal('c'), 4);
  });

  it('clear', function() {
    const map = createMutableMap<number>();

    // 0-1-many: base case, 0 recursive calls (only 1 possible input)
    map.clear();
    assert.deepStrictEqual(map.containsKey('a'), false);

    // 0-1-many: 1 recursive call
    map.set('a', 1);
    map.clear();
    assert.deepStrictEqual(map.containsKey('a'), false);

    // 0-1-many: 2+ recursive calls
    map.set('a', 1);
    map.set('b', 2);
    map.set('c', 3);
    map.clear();
    assert.deepStrictEqual(map.containsKey('a'), false);
    assert.deepStrictEqual(map.containsKey('b'), false);
    assert.deepStrictEqual(map.containsKey('c'), false);
  });
});