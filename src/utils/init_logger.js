// -----------------------------------------------------
// -> Logger

const path = require("path");
const fs = require("fs");
const util = require("util");

const { io } = require("../app/websocket");

const { project_root } = require("../config");
const log_path = path.join(project_root, "log");

const {
  nowFormatLoggerPrint,
  nowFormatLoggerFileName,
} = require("../helpers/date");

// create log directory
if (!fs.existsSync(log_path)) {
  fs.mkdirSync(log_path, { recursive: true });
}

// modification console.log
console.log = (...arg) => {
  const prepare = [];
  for (let i = 0; i < arg.length; i++) {
    prepare.push(util.format(arg[i]));
  }

  // render (break)
  const out = `[${nowFormatLoggerPrint()}] ` + prepare.join(" ") + "\n";
  const out_clean = String(out)
    .replace(/\033/g, "")
    .replace(/\[90m/g, "")
    .replace(/\[4m/g, "")
    .replace(/\[24m/g, "")
    .replace(/\[39m/g, "")
    .replace(/\[94m/g, "")
    .replace(/\[37m/g, "")
    .replace(/\[95m/g, "")
    .replace(/\[32m/g, "");
  io.emit("SERVER:LOG", out_clean);

  fs.appendFileSync(
    path.join(log_path, nowFormatLoggerFileName() + ".log"),
    out_clean,
    {
      encoding: "utf-8",
    }
  );
  process.stdout.write(out);
};
