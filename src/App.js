import React from 'react';
import { useMachine } from '@xstate/react';
import { redditMachine } from './redditMachine';
import Subreddit from './Subreddit'

const subreddits = ['Choose a item','frontend', 'reactjs', 'vuejs'];

const App = () => {
    const [current, send] = useMachine(redditMachine);
    const { subreddit } = current.context;

    function onSelect(e) {
        if (e.target.value === 'Choose a item') {
            send('RESET');
        } else {
            send('SELECT', { name: e.target.value });
        }
    }

    return (
        <main>
            <header>
                <select
                    onChange={onSelect}
                >
                    {subreddits.map(subreddit => {
                        return <option key={subreddit}>{subreddit}</option>;
                    })}
                </select>
            </header>
            <div>
                <h1>{current.matches("idle") ? "Select a subreddit" : null}</h1>
                {subreddit && <Subreddit service={subreddit} key={subreddit.id} />}
            </div>
        </main>
    );
};

export default App;
