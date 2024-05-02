// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const axios = require('axios')
const { token, serverIP } = require('./config.json');
var net = require('net');
var Promise = require('bluebird');
const { EventEmitter } = require('stream');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
let playerOnline;


// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('Getting info, wait', { type: "PLAYING" });
    ConCheck(); // Start the connection check loop when the client is ready
});

// Login to Discord with your client's token
client.login(token);

function checkConnection(host, port, timeout) {
    return new Promise(function (resolve, reject) {
        timeout = timeout || 1000; // default of 10 seconds
        var socket = net.createConnection(port, host, function () {
            clearTimeout(timer);
            resolve();
            socket.destroy();
        });
        var timer = setTimeout(function () {
            reject("timeout");
            socket.destroy();
        }, timeout);
        socket.on('error', function (err) {
            clearTimeout(timer);
            reject(err);
        });
    });
}

function pingForPlayers() {

	// Ping API for server data.
	axios.get(`https://api.mcsrvstat.us/1/${serverIP}`).then(res => {
        playerOnline = res.data.players.online;
        
	}).catch(err => console.log('Error pinging api.mcsrvstat.us for data:', err))
}

var help = 0;
var lastPlayerCount = 0;
var helper = 0;
var serverup = false;

function ConCheck() {
    setInterval(function () {
        pingForPlayers()
        checkConnection(serverIP, 25565)
            .then(function () {
                help = 1
                console.log('ping')
                serverup = true
            })
            .catch(function (err) {
                help = 2
            });

        if (help == 1 && helper !== help ) {
            helper = help
            console.log(help)
            serverUp()
        }

        if (help == 2 && helper !== help) {
            helper = help
            console.log("cheguei")
            serverDown()
        }

        if (lastPlayerCount !== playerOnline && serverup === true) {
            console.log('a mudar por players')
            lastPlayerCount = playerOnline
            serverUp()
        }

    }, 60000)
}

function serverUp() {
    client.user.setActivity(`Server Online ✅, Player online: ${playerOnline}`, { type: "PLAYING" })
    console.log('A mudar')
}

function serverDown() {
    client.user.setActivity('Server Down ❌', { type: "PLAYING" })
}







