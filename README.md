<p align="center"><img src="assets/banner.jpg" alt="Elgato Web MCP: products, prices and stock, support, downloads, guides and a cart for your AI agent. mcp.elgato.com/web" width="100%"></p>

# Elgato Web MCP

Connect your AI agent to the Elgato store: products, prices and stock, support answers, software downloads, Elgato guides, and a cart with checkout link, with the same data as [elgato.com](https://www.elgato.com).

This repository is the plugin for **Cursor**, **Grok Bot** and **Claude Code**. It points at Elgato's hosted [Model Context Protocol](https://modelcontextprotocol.io/) server; there is nothing to run locally and no API key.

Developer page with every tool and its inputs: **https://mcp.elgato.com/web**

## Install

**Cursor:** Cursor Settings → Plugins, search for **Elgato Web MCP**, click Install. Or run `/add-plugin elgato-mcp-web` in chat.

**Grok Bot:** Plugins → search for **Elgato Web MCP** → Add. Or tell your bot: “Add the MCP server https://mcp.elgato.com/web”.

**Claude Code:**

```
/plugin marketplace add elgatosf/elgato-mcp-web
/plugin install elgato-mcp-web@elgato
```

**Any other MCP client:** add the server URL `https://mcp.elgato.com/web` (streamable HTTP).

## MCP

```json
{
  "mcpServers": {
    "elgato-mcp-web": {
      "type": "http",
      "url": "https://mcp.elgato.com/web"
    }
  }
}
```

No login is needed.

## What agents can do

| Area | Tools |
| --- | --- |
| Products | Browse the catalog, search, product details, compare products |
| Price and stock | Price, discount, availability and free shipping per region |
| Support | Help Center answers, store policies, latest software downloads |
| Guides | Search and read Elgato Explorer guides |
| Cart | Add, change and remove items, cart summary with checkout link (paying happens on elgato.com) |
| Jobs | Open positions at Elgato |

The hosted server is the source of truth for tool names and inputs; see the [developer page](https://mcp.elgato.com/web).

## Releases

All manifests share one version. To release: update the version in `.cursor-plugin/plugin.json`, `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`, add an entry to `CHANGELOG.md`, run `node scripts/check.mjs`, then tag `vX.Y.Z` and publish a GitHub release. Cursor reviews each update before it reaches users.

## License

[MIT](LICENSE)
