# MCP Terminal

A secure Model Context Protocol (MCP) server for executing terminal commands. This server allows Large Language Models to safely execute commands within allowed paths.

## Installation

```bash
# Install globally
npm install -g mcp-terminal-cli

# Or use with npx
npx mcp-terminal-cli
```

## Usage with Claude Desktop

1. Add to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS, `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "terminal": {
      "command": "mcp-terminal"
    }
  }
}
```

## Security

- Commands are only executed within explicitly allowed paths
- All commands are validated before execution
- Environment variables are securely handled
- Proper error handling and logging
- Input sanitization

## Features

- Execute shell commands within allowed paths
- Cross-platform support (Windows, macOS, Linux)
- Environment variable configuration
- Error handling and validation
- Integration with Claude Desktop

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Start server
npm start
```

## License

MIT License - See LICENSE file for details