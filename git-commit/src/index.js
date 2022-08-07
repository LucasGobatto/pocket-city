#!/usr/bin/env node

import { exec, addTask } from "./task.js";

const validCommands = ["-m", "-message", "-p", "-push"];

const args = process.argv;
const extraParams = args.slice(2);

const gCommitIndex = args.findIndex((param) => param === validCommands[0] || param === validCommands[1]);
const gPushIndex = args.findIndex((param) => param === validCommands[2] || param === validCommands[3]);

if (validCommands.includes(args[gCommitIndex + 1]) || !args[gCommitIndex + 1]) {
  throw new Error('Flag message must come with a value like "-m commit-message"');
}

if (validCommands.includes(args[gPushIndex + 1]) || !args[gPushIndex + 1]) {
  throw new Error('Flag push must come with the branch name "-p branch-name"');
}

if (gPushIndex > -1 && gCommitIndex === -1) {
  throw new Error('Flag push must come with a commit message name "-p branch-name -m commit-message"');
}

const commitMessage = extraParams[gCommitIndex - 1];
const branchName = extraParams[gPushIndex - 1];

const gitAdd = addTask("git", ["add", "."]);
const gitCommit = commitMessage && addTask("git", ["commit", "-m", commitMessage]);
const gitPush = branchName && addTask("git", ["push", "origin", branchName]);

async function runTasks() {
  await exec(gitAdd);

  if (gitCommit) {
    await exec(gitCommit);
  }

  if (gitPush) {
    await exec(gitPush);
  }
}

runTasks();
