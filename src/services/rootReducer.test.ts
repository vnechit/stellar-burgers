import { rootReducer } from "./store";
import store from "./store";

describe('Testing rootReducer', () => {
  test('Calling rootReducer, returning the previous value', () => { 
    const before = store.getState();
    const after = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(after).toEqual(before);
  });
});
