# MCP Terminal Server

A secure command-line interface server for the Model Context Protocol (MCP) that enables AI models to interact with your terminal while maintaining security and control.

## Features

- 🔒 Secure command execution with configurable permissions
- 📁 File system operations within allowed paths
- 🌍 Environment variable management
- 💻 Cross-platform support (Windows, macOS, Linux)
- 🔌 Remote system connections support via command execution

## Usage with Claude Desktop

Add the server configuration to your Claude Desktop config file:

```json
{
  "mcpServers": {
    "terminal": {
      "command": "npx",
      "args": [
        "@dillip285/mcp-terminal",
        "--allowed-paths",
        "/path/to/allowed/directory"
      ]
    }
  }
}
```

Restart Claude Desktop to apply the changes. You can now use the terminal capabilities through Claude with secure file access and command execution.

## Available Tools

- `execute_command`: Run terminal commands securely (including SSH and remote commands)


## Security

- All operations are restricted to specified allowed paths
- Commands are validated and sanitized before execution
- Environment variables are carefully managed
- Proper error handling for security-related issues

## Development

```bash
# Clone the repository
git clone https://github.com/dillip285/mcp-terminal.git

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Claude Desktop](https://claude.ai/download)

## Support

For bug reports and feature requests, please [open an issue](https://github.com/dillip285/mcp-terminal/issues).