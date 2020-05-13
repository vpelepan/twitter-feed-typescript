import  { Component } from './component';

class Spinner extends Component<HTMLDivElement, HTMLDivElement> {
  private static instance: Spinner;

  constructor() {
    super('spinner-template', 'app', true);
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Spinner();
    return this.instance;
  }

  destroySpinner() {
    this.element.remove();
  }

  render() {}
}

export const spinner = Spinner.getInstance();