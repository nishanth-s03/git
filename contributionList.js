import fetch from "node-fetch";

export default function Contribution(owner, repo, token) {
  const url = `https://api.github.com/repos/${owner}/${repo}/stats/contributors`;

  function fetchContributors(attempt = 1) {
    fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        "User-Agent": "node.js",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          data.forEach((contributor) => {
            console.log(`${contributor.author.login}: ${contributor.total}`);
          });
        } else if (data.message) {
          console.log(`Error: ${data.message}`);
        } else if (Object.keys(data).length === 0) {
          if (attempt <= 5) {
            console.log(`Empty response, retrying... (Attempt ${attempt})`);
            setTimeout(() => fetchContributors(attempt + 1), 3000); // Retry after 3 seconds
          } else {
            console.log("Empty response after multiple attempts.");
          }
        } else {
          console.log("Unexpected response format:", data);
        }
      })
      .catch((err) => {
        console.error("Error fetching contributors:", err);
      });
  }

  fetchContributors();
}
