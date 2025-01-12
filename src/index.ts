#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { 
  ListToolsRequestSchema, 
  CallToolRequestSchema 
} from "@modelcontextprotocol/sdk/types.js";
import { execa } from 'execa';
import { z } from 'zod';
import { config } from 'dotenv';
config();

// Schema for command execution
const ExecuteCommandSchema = z.object({
  command: z.string(),
  args: z.array(z.string()).optional(),
  cwd: z.string().optional(),
});

const server = new Server(
  {
    name: "mcp-terminal",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "execute_command",
        description: "Execute a command in the local system",
        inputSchema: {
          type: "object",
          properties: {
            command: { type: "string", description: "Command to execute" },
            args: { 
              type: "array", 
              items: { type: "string" },
              description: "Command arguments"
            },
            cwd: { 
              type: "string", 
              description: "Working directory for command execution"
            }
          },
          required: ["command"],
        },
      }
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "execute_command") {
      const { command, args: cmdArgs = [], cwd } = ExecuteCommandSchema.parse(args);
      
      try {
        const result = await execa(command, cmdArgs, {
          cwd,
          shell: true,
        });

        return {
          content: [
            {
              type: "text",
              text: result.stdout || result.stderr || 'Command executed successfully with no output',
            },
          ],
          isError: false,
        };
      } catch (execaError: any) {
        return {
          content: [
            {
              type: "text",
              text: execaError?.message || 'Command execution failed',
            },
          ],
          isError: true,
        };
      }
    }

    return {
      content: [
        {
          type: "text",
          text: `Unknown tool: ${name}`,
        },
      ],
      isError: true,
    };
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error?.message || 'Unknown error occurred'}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server using stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);

console.error("MCP Terminal Server running...");