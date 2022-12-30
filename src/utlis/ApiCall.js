const initialFetchApi = async (route, header) => {
  try {
    const response = await fetch(route, {
      method: "GET",
      headers: {
        Authorization: header,
      },
    });
    return await response.json();
  } catch (err) {}
};

const fetchDataFromApi = async (data, apiLink, callback) => {
  try {
    const response = await fetch(apiLink, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.text();
    callback(json);
  } catch (error) {}
};

export { fetchDataFromApi, initialFetchApi };
