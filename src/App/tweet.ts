import  { Component } from './component';
import { Tweet } from '../models/tweet';

export class Item extends Component<HTMLUListElement, HTMLLIElement> {
  private tweet: Tweet;

  constructor(public newData: Tweet) {
    super('timeline-item-template', 'timeline-list', true);

    this.tweet = {
      id: newData.id,
      image: newData.image,
      username: newData.username,
      text: newData.text,
      timeStamp: newData.timeStamp
    };

    this.render();
  }

  render() {
    const date = new Date(this.tweet.timeStamp).toLocaleTimeString();

    this.element.querySelector('.timeline-item--date')!.textContent = date;
    this.element.querySelector('.timeline-item--username')!.textContent = `@${this.tweet.username}`;
    this.element.querySelector('img')!.src = this.tweet.image;
    this.element.querySelector('.timeline-item--body')!.textContent = this.tweet.text;
  }
}