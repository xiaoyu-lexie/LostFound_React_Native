import axios from "axios";

const authenticate = async (mode, email, password) => {
  const url = "http://192.168.1.8:5003/graphql";

  try {
    if (mode === "login") {
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          query {
            loginUser(email: "${email}", password: "${password}") {
              token,
              email,
              expiresIn
            }
          }
          `,
        }),
      }).then((res) => res.json());
      // console.log("sign in data", data);

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return data;
    } else {
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          mutation {
            addUser(email: "${email}", password: "${password}") {
              token,
              email,
              expiresIn
            }
          }
          `,
        }),
      }).then((res) => res.json());
      // console.log("sign up data", data);

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      return data;
    }
  } catch (err) {
    throw new Error(err.message);
    console.log("auth err", err.message);
  }
};

export default authenticate;
