const { Events } = require('discord.js');
const logger = require('../utils/logger');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        logger.info(`Ready! Logged in as ${client.user.tag}`);
        
        // Set the bot's activity
        client.user.setActivity('🎵 | Music', { type: 'LISTENING' });
        
        // Log some basic stats
        logger.info(`Serving ${client.guilds.cache.size} guilds`);
        logger.info(`Cached ${client.users.cache.size} users`);
        
        // Register slash commands globally
        const commands = client.commands.map(command => command.data);
        client.application.commands.set(commands)
            .then(() => {
                logger.info('Successfully registered application commands globally');
            })
            .catch(error => {
                logger.error('Error registering application commands:', error);
            });
    },
};
