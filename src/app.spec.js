import { interpret } from 'xstate';
import { assert } from 'chai';

import { redditMachine } from './redditMachine';

describe('reddit machine (live)', () => {
    it('should load posts of a selected subreddit', done => {
        const redditService = interpret(redditMachine)
            .onTransition(state => {
                // when the state finally reaches 'selected' after fetch data,
                // the test has succeeded.
                if (state.matches('selected')) {
                    assert.isNotEmpty(state.context.subreddits);

                    done();
                }
            })
            .start(); // remember to start the service!

        // Test that when the 'SELECT' event is sent, the machine eventually
        // reaches the { selected: 'loaded' } state with posts
        redditService.send('SELECT', { name: 'reactjs' });
    });
});