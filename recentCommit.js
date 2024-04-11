import fetch from "node-fetch";

export default function Commits(owner, repo, token) {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits`;

  fetch(url, {
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "node.js",
    },
  })
    .then((res) => res.json())
    .then((commits) => {
      commits.reverse();

      commits.forEach((commit) => {
        console.log(`Commit SHA: ${commit.sha}`);
        console.log(`Commit message: ${commit.commit.message}`);
        console.log(
          `Contributor: ${commit.author ? commit.author.login : "Unknown"}`
        );
        console.log(`Timestamp: ${commit.commit.author.date}`);
        console.log("---");
      });
    })
    .catch((err) => {
      console.error("Error fetching commits:", err);
    });
}
