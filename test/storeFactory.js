/* eslint-disable camelcase */
const tap = require('tap');
const p = require('../package.json');

const { storeFactory } = require('../lib/index');

tap.test(p.name, (suite) => {
  suite.test('storeFactory', (cs) => {
    cs.test('multi-choice', (mc) => {
      mc.test('basic - string options', (bas) => {
        const state = storeFactory({ options: 'a,b,c,d,e'.split(',') });

        bas.same(state.my.choices, []);
        state.do.chooseOption('a');

        bas.same(new Set(state.my.choices), new Set(['a']));

        state.do.chooseOption('b');
        bas.same(new Set(state.my.choices), new Set(['a', 'b']));

        state.do.chooseOption('c');
        bas.same(new Set(state.my.choices), new Set(['a', 'b', 'c']));

        state.do.chooseOption('b');
        bas.same(new Set(state.my.choices), new Set(['a', 'c']));

        bas.end();
      });

      mc.test('basic - object options', (bao) => {
        const state = storeFactory({
          options: [
            { id: 1, name: 'Stan' },
            { id: 2, name: 'Kyle' },
            { id: 3, name: 'Kenny' },
            { id: 4, name: 'Cartman' },
          ],
        });

        bao.same(state.my.choices, []);
        state.do.chooseOption({ id: 1, name: 'Stan' });

        bao.same(new Set(state.my.choices), new Set([{ id: 1, name: 'Stan' }]));

        state.do.chooseOption(
          { id: 2, name: 'Kyle' },
        );
        bao.same(new Set(state.my.choices), new Set([
          { id: 1, name: 'Stan' },
          { id: 2, name: 'Kyle' }]));

        state.do.chooseOption({ id: 3, name: 'Kenny' });
        bao.same(new Set(state.my.choices), new Set([{ id: 1, name: 'Stan' },
          { id: 2, name: 'Kyle' },
          { id: 3, name: 'Kenny' }]));

        state.do.chooseOption({ id: 2, name: 'Kyle' });
        bao.same(new Set(state.my.choices), new Set([{ id: 1, name: 'Stan' },
          { id: 3, name: 'Kenny' }]));

        bao.end();
      });
      mc.end();
    });
    cs.test('multi-choice by ID', (mc) => {
      mc.test('basic - object options', (bao) => {
        const state = storeFactory({
          options: [
            { id: 1, name: 'Stan' },
            { id: 2, name: 'Kyle' },
            { id: 3, name: 'Kenny' },
            { id: 4, name: 'Cartman' },
          ],
          optionToChoice: ({ id }) => id,
        });

        bao.same(state.my.choices, []);
        state.do.chooseOption({ id: 1, name: 'Stan' });

        bao.same(new Set(state.my.choices), new Set([1]));

        state.do.chooseOption(
          { id: 2, name: 'Kyle' },
        );
        bao.same(new Set(state.my.choices), new Set([1, 2]));

        state.do.chooseOption({ id: 3, name: 'Kenny' });
        bao.same(new Set(state.my.choices), new Set([1, 2, 3]));

        state.do.chooseOption({ id: 2, name: 'Kyle' });
        bao.same(new Set(state.my.choices), new Set([1, 3]));

        bao.end();
      });
      mc.end();
    });

    cs.end();
  });

  suite.end();
});
