import  { Component } from './component';
import  { Item } from './tweet';
import  { spinner } from './spinner';
import { IState } from '../models/types';
import { state } from '../state/state';
import { fetchTimelineData, resetData } from '../helpers/api';

export class Timeline extends Component<HTMLDivElement, HTMLElement> {
  private state: IState;
  private interval = <number>window.setInterval(() => {});
  private config: {
    updateInterval: number;
    dataCounter: number;
    termination: number;
    shouldRender: boolean;
    destroySpinner: boolean;
    keys: Set<any>;
  } = {
    updateInterval: 2000,
    dataCounter: 0,
    termination: 10000,
    shouldRender: true,
    destroySpinner: false,
    keys: new Set()
  }

  constructor() {
    super('timeline-template', 'app', true);

    this.state = {
      items: [],
      shouldFetch: true,
      latestItemId: 0
    };

    this.configure();
    this.startLoadingData();
    this.render();
  }

  render() {}

  configure() {
    state.subscribe((state: IState) => {
      const newState = { ...this.state, ...state };
      this.state = newState;

      this.renderItems(newState);

      if (state.items.length && !this.config.destroySpinner) {
        this.config.destroySpinner = true;
        spinner.destroySpinner();
      }
    });
  }

  private renderItems(newState: IState) {
    if (newState.itemsToRender) {
      for (const item of newState.itemsToRender) {
        new Item(item);
      }
    }
  }

  private startLoadingData() {
    this.interval = window.setInterval(() => this.fetchData(), this.config.updateInterval);
  }

  private stopLoadData() {
    clearInterval(this.interval);
  }

  private async fetchData() {
    const { items } = this.state;
    const lastItemId = (items[0] && items[0].id) || 0;

    if (this.config.dataCounter >= this.config.termination) {
      this.stopLoadData();
      this.resetDatabase();
      return;
    }

    const data = await fetchTimelineData(lastItemId);

    if (data.length) {
      this.config.dataCounter = data[0].id;

      state.dispatch({
        type: 'addItems',
        payload: {
          items: data,
          latestItemId: data[0].id
        }
      });
    }
  }

  private async resetDatabase() {
    this.config.dataCounter = 0;

    const response = await resetData();

    state.dispatch({
      type: 'reset',
      payload: { items: [], latestItemId: 0 }
    });

    this.startLoadingData();

    return response;
  }
}