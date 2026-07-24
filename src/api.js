export async function fetchSampleUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  } catch (err) {
    console.error("Error:", err.message);
    return [];
  } finally {
    console.log("Done loading.");
  }
}

export function fetchSampleUsersPromise() {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((users) =>
      users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }))
    )
    .catch((err) => {
      console.error("Error:", err.message);
      return [];
    });
}