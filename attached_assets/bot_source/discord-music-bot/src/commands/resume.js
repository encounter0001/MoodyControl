const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const player = require('../music/player');
const { embedColors, messages } = require('../../config/config.json');
const logger = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resume the paused song'),

    async execute(interaction) {
        // Check if user is in a voice channel
        if (!interaction.member.voice.channel) {
            return interaction.reply({
                content: messages.notInVoiceChannel,
                ephemeral: true
            });
        }

        // Check if bot is in a paused state
        if (!player.isPaused(interaction.guild.id)) {
            return interaction.reply({
                content: 'The music is not paused.',
                ephemeral: true
            });
        }

        try {
            const success = player.resume(interaction.guild.id);
            if (success) {
                const embed = new EmbedBuilder()
                    .setColor(embedColors.success)
                    .setDescription(messages.resumeSong);

                await interaction.reply({ embeds: [embed] });
                logger.info(`Resumed playback in guild ${interaction.guild.id}`);
            } else {
                await interaction.reply({
                    content: 'Failed to resume the music.',
                    ephemeral: true
                });
            }
        } catch (error) {
            logger.error('Error in resume command:', error);
            await interaction.reply({
                content: 'An error occurred while trying to resume the music.',
                ephemeral: true
            });
        }
    },
};
