import { IState, IAction, Subscriber } from '../models/types';
import { reducer } from '../reducers/reducer';

// State Management
class State<T> {
  protected subscribers: Subscriber<T>[] = [];
  subscribe(fn: Subscriber<T>) {
    this.subscribers = [...this.subscribers, fn];
  }
}

// Timeline State
class TimelineState extends State<IState> {
  private static instance: TimelineState;
  private state: IState;

  private constructor() {
    super();

    this.state = {
      items: [],
      latestItemId: 0
    }
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new TimelineState();
    return this.instance;
  }

  dispatch(action: IAction) {
    const prevState = this.state;
    const newState = { ...action.payload, ...reducer(action, this.state) };

    this.state = { ...prevState, ...newState };
    this.notifySubscribers();
  }

  private notifySubscribers() {
    for (const subscriberFn of this.subscribers) {
      subscriberFn({ ...this.state });
    }
  }
}

export const state = TimelineState.getInstance();