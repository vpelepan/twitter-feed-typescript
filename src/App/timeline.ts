import  { Component } from './component';
import  { Item } from './tweet';
import  { spinner } from './spinner';
import { IState } from '../models/types';
import { state } from '../state/state';
import { fetchTimeline, resetData } from '../helpers/api';

export class Timeline extends Component<HTMLDivElement, HTMLElement> {
  private state: IState;
  private interval = <number>window.setInterval(() => {});
  private config: {
    destroySpinner: boolean;
    updateInterval: number;
    terminationLimit: number;
    defaultRequestLimit: number;
  } = {
    destroySpinner: false,
    updateInterval: 2000,
    terminationLimit: 10000,
    defaultRequestLimit: 1
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
    const { items, latestItemId, shouldFetch } = this.state;
    const { defaultRequestLimit, terminationLimit } = this.config;
    const isLimitReached = (items.length + defaultRequestLimit) >= terminationLimit;
    const requestDataLimit = isLimitReached ? terminationLimit - items.length : defaultRequestLimit;

    if (!shouldFetch) {
      this.stopLoadData();
      this.resetDatabase(true);
      return;
    }

    const data = await fetchTimeline(requestDataLimit, latestItemId);

    if (data.length) {
      state.dispatch({
        type: 'addItems',
        payload: {
          items: data,
          latestItemId: data[0].id,
          shouldFetch: !isLimitReached
        }
      });
    }
  }

  private async resetDatabase(shouldFetch: boolean) {
    const response = await resetData();

    state.dispatch({
      type: 'reset',
      payload: {
        items: [],
        latestItemId: 0,
        shouldFetch
      }
    });

    this.startLoadingData();

    return response;
  }
}