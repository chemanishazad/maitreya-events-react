/**
 * PM2 app for Maitreya Events — copied to /opt/maitreya/ecosystem.config.cjs on every deploy.
 * Runs on 127.0.0.1:$PORT — PORT from the server env file, default 3100 (nginx proxies here).
 * Independent of any other PM2 apps on the server.
 */
const fs = require("fs");
const path = require("path");

const BASE = process.env.MAITREYA_ROOT || "/opt/maitreya";
const current = path.join(BASE, "current");

// PORT comes from the server's env file (synced from the ENV_FILE secret); default 3100
let port = "3100";
try {
  const m = fs.readFileSync(path.join(BASE, "shared", ".env"), "utf8").match(/^\s*PORT\s*=\s*"?(\d+)"?/m);
  if (m) port = m[1];
} catch {}

let release = "unknown";
try {
  release = fs.readFileSync(path.join(current, "REVISION"), "utf8").trim();
} catch {}

module.exports = {
  apps: [
    {
      name: "maitreya-events",
      cwd: current,
      script: "server.js",
      // 2 workers → reloads without downtime
      exec_mode: "cluster",
      instances: 2,
      // Runtime env (synced from the ENV_FILE GitHub secret on each deploy)
      node_args: `--env-file=${path.join(BASE, "shared", ".env")}`,
      env: {
        NODE_ENV: "production",
        SITE_ENV: "production",
        RELEASE_SHA: release,
        PORT: port,
        HOSTNAME: "127.0.0.1",
      },
      max_memory_restart: "700M",
      kill_timeout: 8000,
      listen_timeout: 15000,
      exp_backoff_restart_delay: 200,
      time: true,
      out_file: path.join(BASE, "logs", "out.log"),
      error_file: path.join(BASE, "logs", "error.log"),
      merge_logs: true,
    },
  ],
};
