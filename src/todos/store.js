import { merge } from 'rxjs';
import { map, scan, startWith } from 'rxjs/operators';
import { createEventHandler } from 'recompose';

import reducer from './reducer';

const { handler: create, stream: create$ } = createEventHandler();
const { handler: toggleComplete, stream: toggleComplete$ } = createEventHandler();

const todos$ = merge(
    create$.pipe(map(text => ({
        type: 'CREATE_TODO',
        data: {
            text,
        }, 
    }))),
    toggleComplete$.pipe(map(index => ({
        type: 'TOGGLE_COMPLETE_TODO',
        data: {
            index,
        },
    })))
)
    .pipe(startWith(reducer(undefined, { type: 'INIT' })))
    .pipe(scan(reducer));

export default {
    observable$: todos$,
    actions: {
        create,
        toggleComplete,
    },
};
