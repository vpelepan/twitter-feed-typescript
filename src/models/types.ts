import { Tweet } from './tweet';

export type Subscriber<T> = (state: T) => void;

export interface IState {
  items: Tweet[];
  itemsToRender?: Tweet[];
  latestItemId: number;
  shouldFetch?: boolean;
}

export interface IAction {
  type: string;
  payload: IState;
}