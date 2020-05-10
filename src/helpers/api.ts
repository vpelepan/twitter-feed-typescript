const baseURL = 'https://magiclab-twitter-interview.herokuapp.com/vladyslavpelepan/';

export const fetchTimelineData = async (id: number) => {
  try {
    const result = await fetch(`${baseURL}api?count=5${'&afterId=' + id}`);

    if (!result.ok) {
      throw new Error(result.statusText);
    }

    return await result.json();
  } catch (error) {
    return [];
  }
}

export const resetData = () => fetch(`${baseURL}reset`);