import { IAction, IState } from '../models/types';

export const reducer = (action: IAction, state: IState) => {
  const payload = action.payload;

  switch (action.type) {
    case 'addItems':
      const sortedItemsByTime = [...payload.items].sort((a, b) => Number(a.timeStamp) - Number(b.timeStamp));
      const newItems = { items: [ ...payload.items, ...state.items ] };
      const itemsToRender = { itemsToRender: sortedItemsByTime };

      return { ...newItems, ...itemsToRender };
    case 'reset':
      return { items: [] };
    default:
      return state;
  }
}