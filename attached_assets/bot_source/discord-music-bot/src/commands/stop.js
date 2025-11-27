const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const player = require('../music/player');
const { embedColors, messages } = require('../../config/config.json');
const logger = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop playing music and clear the queue'),

    async execute(interaction) {
        // Check if user is in a voice channel
        if (!interaction.member.voice.channel) {
            return interaction.reply({
                content: messages.notInVoiceChannel,
                ephemeral: true
            });
        }

        // Check if bot is playing or has something in queue
        if (!player.isPlaying(interaction.guild.id) && player.getQueue(interaction.guild.id).length === 0) {
            return interaction.reply({
                content: messages.notPlaying,
                ephemeral: true
            });
        }

        try {
            const success = player.stop(interaction.guild.id);
            if (success) {
                const embed = new EmbedBuilder()
                    .setColor(embedColors.info)
                    .setDescription(messages.stopPlaying);

                await interaction.reply({ embeds: [embed] });
                logger.info(`Stopped playback and cleared queue in guild ${interaction.guild.id}`);
            } else {
                await interaction.reply({
                    content: 'Failed to stop the music.',
                    ephemeral: true
                });
            }
        } catch (error) {
            logger.error('Error in stop command:', error);
            await interaction.reply({
                content: 'An error occurred while trying to stop the music.',
                ephemeral: true
            });
        }
    },
};
