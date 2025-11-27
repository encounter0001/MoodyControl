const { Events } = require('discord.js');
const logger = require('../utils/logger');
const player = require('../music/player');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        // Handle bot disconnection
        if (oldState.member.id === oldState.client.user.id && !newState.channelId) {
            player.stop(oldState.guild.id);
            logger.info(`Bot disconnected from voice in guild ${oldState.guild.id}`);
            return;
        }

        // Get the voice channel the bot is in
        const botVoiceChannel = oldState.guild.members.me?.voice.channel;
        if (!botVoiceChannel) return;

        // Check if the bot is alone in the voice channel
        const membersInChannel = botVoiceChannel.members.filter(member => !member.user.bot);
        
        if (membersInChannel.size === 0) {
            // Start a 5-minute timer before disconnecting
            setTimeout(() => {
                // Recheck if the channel is still empty
                const currentMembers = botVoiceChannel.members.filter(member => !member.user.bot);
                if (currentMembers.size === 0) {
                    player.stop(oldState.guild.id);
                    logger.info(`Auto-disconnected from empty voice channel in guild ${oldState.guild.id}`);
                }
            }, 5 * 60 * 1000); // 5 minutes
            
            // Pause the music immediately when everyone leaves
            if (player.isPlaying(oldState.guild.id)) {
                player.pause(oldState.guild.id);
                logger.info(`Auto-paused music in empty voice channel in guild ${oldState.guild.id}`);
            }
        } else if (player.isPaused(oldState.guild.id) && membersInChannel.size > 0) {
            // Resume music when someone joins and music was paused
            player.resume(oldState.guild.id);
            logger.info(`Auto-resumed music in voice channel in guild ${oldState.guild.id}`);
        }

        // Handle stage channel voice states
        if (botVoiceChannel.isStageChannel()) {
            const botStageInstance = oldState.guild.members.me;
            
            // Request to speak if bot is in a stage channel
            if (botStageInstance.voice.suppress) {
                try {
                    await botStageInstance.voice.setSuppressed(false);
                    logger.info(`Requested to speak in stage channel in guild ${oldState.guild.id}`);
                } catch (error) {
                    logger.error(`Failed to request speaking in stage channel:`, error);
                }
            }
        }
    },
};
