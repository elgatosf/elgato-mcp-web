// Checks that all plugin manifests agree before a release. Usage: node scripts/check.mjs [repo dir]
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? ".";
const read = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));
const errors = [];
const expect = (ok, message) => ok || errors.push(message);

const cursor = read(".cursor-plugin/plugin.json");
const claude = read(".claude-plugin/plugin.json");
const market = read(".claude-plugin/marketplace.json");
const mcp = read("mcp.json");
const entry = market.plugins.find((p) => p.name === claude.name);

expect(cursor.name === claude.name, `name differs: cursor ${cursor.name}, claude ${claude.name}`);
expect(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(cursor.name), `name must be kebab-case: ${cursor.name}`);
expect(entry, `marketplace has no plugin named ${claude.name}`);
for (const [label, version] of [["claude", claude.version], ["marketplace", entry?.version]])
  expect(version === cursor.version, `version differs: cursor ${cursor.version}, ${label} ${version}`);
expect(/^\d+\.\d+\.\d+$/.test(cursor.version), `version is not semver: ${cursor.version}`);
expect(cursor.description === claude.description, "description differs between cursor and claude");
for (const m of [cursor, claude]) expect(m.mcpServers === "./mcp.json", "every manifest must use ./mcp.json");
expect(existsSync(join(root, cursor.logo ?? "")), `logo missing: ${cursor.logo}`);
for (const [name, server] of Object.entries(mcp.mcpServers ?? {}))
  expect(server.type === "http" && /^https:\/\//.test(server.url ?? ""), `${name}: must be type http with an https url`);
expect(Object.keys(mcp.mcpServers ?? {}).length > 0, "mcp.json has no servers");

const changelog = readFileSync(join(root, "CHANGELOG.md"), "utf8");
expect(changelog.includes(`## ${cursor.version} `), `CHANGELOG.md has no entry for ${cursor.version}`);

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${cursor.name} ${cursor.version}: manifests agree`);
