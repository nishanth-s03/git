import fetch from "node-fetch";

export default function Contribution(owner, repo, token) {
  const url = `https://api.github.com/repos/${owner}/${repo}/stats/contributors`;

  fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "node.js",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Not Found") {
        console.log("Repository not found");
      } else {
        data.forEach((contributor) => {
          console.log(`${contributor.author.login}: ${contributor.total}`);
        });
      }
    })
    .catch((err) => {
      console.error("Error fetching contributors:", err);
    });
}