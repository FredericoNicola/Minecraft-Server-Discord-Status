# Discord Bot Server Status Checker

This Discord bot allows you to monitor the status of your Minecraft server and display it on Discord. It periodically checks the server's status and player count, updating the bot's presence accordingly.

## Features

- Monitors the status of a Minecraft server.
- Displays the server's status (online/offline) and player count in real-time on Discord.
- Updates Discord bot's presence dynamically based on the server's status and player count.

## Prerequisites

Before running the bot, ensure you have the following:

- Node.js installed on your machine.
- Discord bot token. You can obtain it by creating a bot application on the Discord Developer Portal.
- Minecraft server IP address.

## Installation

1. Clone this repository to your local machine:

```bash
git clone [https://github.com/FredericoNicola/discord-bot-server.git]

```
2. Navigate to your project folder

```bash 
cd discord-bot-server
```

3. Install dependecies
   
```bash
npm install
```

## Steps to configure

Go to config.js:
- Paste your discord API key on token
- Paste your minecraft server IP on serverIP

## To start

```bash
node .
```
