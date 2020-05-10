interface ITweet {
  id: number;
  image: string;
  username: string;
  text: string;
  timeStamp: number;
}

export class Tweet implements ITweet {
  constructor(
    public id: number,
    public image: string,
    public username: string,
    public text: string,
    public timeStamp: number
  ) {}
}