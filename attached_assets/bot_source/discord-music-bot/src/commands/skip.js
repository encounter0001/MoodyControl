const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const player = require('../music/player');
const { embedColors, messages } = require('../../config/config.json');
const logger = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song'),

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
            const currentTrack = player.getCurrentTrack(interaction.guild.id);
            const success = player.skip(interaction.guild.id);

            if (success) {
                const embed = new EmbedBuilder()
                    .setColor(embedColors.info)
                    .setDescription(messages.skipSong)
                    .addFields({
                        name: 'Skipped',
                        value: `[${currentTrack.title}](${currentTrack.url})`
                    });

                // Add information about the next track if available
                const queue = player.getQueue(interaction.guild.id);
                if (queue.length > 0) {
                    embed.addFields({
                        name: 'Up Next',
                        value: `[${queue[0].title}](${queue[0].url})`
                    });
                }

                await interaction.reply({ embeds: [embed] });
                logger.info(`Skipped track "${currentTrack.title}" in guild ${interaction.guild.id}`);
            } else {
                await interaction.reply({
                    content: 'Failed to skip the current track.',
                    ephemeral: true
                });
            }
        } catch (error) {
            logger.error('Error in skip command:', error);
            await interaction.reply({
                content: 'An error occurred while trying to skip the track.',
                ephemeral: true
            });
        }
    },
};
