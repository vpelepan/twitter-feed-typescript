const baseURL = 'https://magiclab-twitter-interview.herokuapp.com/vladyslavpelepan/';

export const fetchTimeline = async (count: number, id: number) => {
  try {
    const result = await fetch(`${baseURL}api?count=${count}${'&afterId=' + id}`);

    if (!result.ok) {
      throw new Error(result.statusText);
    }

    return await result.json();
  } catch (error) {
    return [];
  }
}

export const resetData = () => fetch(`${baseURL}reset`);