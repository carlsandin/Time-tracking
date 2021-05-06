const request = (query, variables, token) => {
  return fetch("http://localhost:5000/api", {
    method: "POST",
    headers: {
      Authorization: `Bearer: ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => res.json());
};

export default request;
