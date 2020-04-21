import { Component } from './App/Component';

// App Class
class App extends Component<HTMLDivElement, HTMLElement> {
  constructor() {
    super('feed-container', 'app', true);
  }
}

new App();