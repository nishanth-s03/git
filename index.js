import dotenv from 'dotenv';
import Contribution from './contributionList.js';
import Commits from './recentCommit.js';

dotenv.config();

const args = process.argv.slice(2);
const owner = process.env.OWNER;
const repo = process.env.REPO;
const token = process.env.TOKEN;

if (args[0] === 'contribution') {
  Contribution(owner, repo, token);
} else if (args[0] === 'commits') {
  Commits(owner, repo, token);
} else {
  console.error('Unknown script:', args[0]);
}
