import { spawn } from "child_process";

const args = process.argv;
const extraParams = args.slice(2);

const validCommands = ["m", "p"];

for (const params of extraParams) {
  const data = params.split(":");

  if (data.length !== 2 || !validCommands.includes(data[0])) {
    throw new Error(`Invalid param "${params}". Run flag help to see all commands`);
  }
}

const gcommitData = extraParams[0].split(":");
const commitMessage = gcommitData[0] === "m" ? gcommitData[1] : null;

const gpushData = extraParams[1].split(":");
const branchName = gpushData[0] === "p" ? gpushData[1] : null;

const gitAdd = addTask("git add .");
const gitCommit = commitMessage && addTask(`git commit -m ${commitMessage}`);
const gitPush = branchName && addTask(`git push origin ${branchName}`);

async function runTasks() {
  await exec(gitAdd);
  gitCommit && (await exec(gitCommit));
  gitPush && (await exec(gitPush));
}

runTasks();

function addTask(command, args) {
  return { command, args };
}

function exec(task) {
  console.info(`Running ${task.command}`);

  return new Promise((res, rej) => {
    const spawnedTask = spawn(task.command, task.args, { shell: true });

    spawnedTask.stderr.on("error", (error) => {
      console.error(`Task failed with message: ${error.message}`);
      rej();
    });

    spawnedTask.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Task exit with status ${code}`);
        rej();
      } else {
        res(code);
      }
    });
  });
}
