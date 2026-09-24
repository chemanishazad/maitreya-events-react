/**
 * PM2 app for Maitreya Events — copied to /opt/maitreya/ecosystem.config.cjs on every deploy.
 * Runs on 127.0.0.1:3100 (point the existing nginx site for maitreyaevents.com here).
 * Independent of any other PM2 apps on the server.
 */
const fs = require("fs");
const path = require("path");

const BASE = process.env.MAITREYA_ROOT || "/opt/maitreya";
const current = path.join(BASE, "current");

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
        PORT: "3100",
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
