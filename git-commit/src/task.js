import { spawn } from "child_process";

export function addTask(command, args) {
  return { command, args };
}

export function exec(task) {
  console.log(task.args);
  console.info(`Running ${[task.command, ...task.args].join(" ")}`);

  return new Promise((res, rej) => {
    const spawnedTask = spawn(task.command, task.args, { shell: true });

    spawnedTask.stderr.on("error", (error) => {
      console.error(`Task failed with message: ${error.message}`);
      rej();
    });

    spawnedTask.stdout.on("data", (data) => {
      console.info(`${data}`);
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
