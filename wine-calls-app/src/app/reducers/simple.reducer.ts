import { Action } from '@ngrx/store';

export function simpleReducer(state: string = 'Hello World', action: Action) {
    switch (action.type) {
        case 'HELLO':
            return state = 'HELLO WORLDDDD';
        default:
            return state;
    }
}