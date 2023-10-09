import { User } from "./user.interface";

export enum GameState {
    WaitingForPlayers = 'waitingForPlayers',    // just started
    Ready = 'ready',                            // has 2 or more players
    Started = 'started',                        // game creater trigger game start
    Complete = 'complete'                       // game is over
}

export interface Game {
    id: string;
    name: string;
    host_id: string;
    players: Player[];
    questions: Question[];
    state: GameState.WaitingForPlayers | GameState.Ready | GameState.Started | GameState.Complete;
};

export interface Player extends User {
    points: number;
    isReady: boolean;
};

export interface Question {
    id: string;
    ask: string;
    answer: string;
    options: string[];
    category: string;
    reason: string;
};