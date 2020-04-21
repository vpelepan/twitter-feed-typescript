import  { Component } from './Component';

// Twitter Feed Class
export class Feed extends Component<HTMLDivElement, HTMLElement> {
  constructor() {
    super('feed-list', 'feed-container', true);
  }
}