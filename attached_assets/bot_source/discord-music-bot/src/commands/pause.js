const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const player = require('../music/player');
const { embedColors, messages } = require('../../config/config.json');
const logger = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the current song'),

    async execute(interaction) {
        // Check if user is in a voice channel
        if (!interaction.member.voice.channel) {
            return interaction.reply({
                content: messages.notInVoiceChannel,
                ephemeral: true
            });
        }

        // Check if bot is playing music
        if (!player.isPlaying(interaction.guild.id)) {
            return interaction.reply({
                content: messages.notPlaying,
                ephemeral: true
            });
        }

        try {
            const success = player.pause(interaction.guild.id);
            if (success) {
                const embed = new EmbedBuilder()
                    .setColor(embedColors.info)
                    .setDescription(messages.pauseSong);

                await interaction.reply({ embeds: [embed] });
                logger.info(`Paused playback in guild ${interaction.guild.id}`);
            } else {
                await interaction.reply({
                    content: 'Failed to pause the music.',
                    ephemeral: true
                });
            }
        } catch (error) {
            logger.error('Error in pause command:', error);
            await interaction.reply({
                content: 'An error occurred while trying to pause the music.',
                ephemeral: true
            });
        }
    },
};
