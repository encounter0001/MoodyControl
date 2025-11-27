const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const player = require('../music/player');
const { embedColors, messages } = require('../../config/config.json');
const logger = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Adjust the music volume')
        .addIntegerOption(option =>
            option.setName('level')
                .setDescription('Volume level (0-200)')
                .setMinValue(0)
                .setMaxValue(200)
                .setRequired(true)),

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
            const volume = interaction.options.getInteger('level');
            const success = player.setVolume(interaction.guild.id, volume);

            if (success) {
                const embed = new EmbedBuilder()
                    .setColor(embedColors.success)
                    .setTitle('Volume Adjusted')
                    .setDescription(`Volume set to ${volume}%`)
                    .addFields({
                        name: 'Volume Level',
                        value: createVolumeBar(volume),
                        inline: true
                    });

                await interaction.reply({ embeds: [embed] });
                logger.info(`Volume set to ${volume}% in guild ${interaction.guild.id}`);
            } else {
                await interaction.reply({
                    content: 'Failed to adjust the volume.',
                    ephemeral: true
                });
            }
        } catch (error) {
            logger.error('Error in volume command:', error);
            await interaction.reply({
                content: 'An error occurred while trying to adjust the volume.',
                ephemeral: true
            });
        }
    },
};

function createVolumeBar(volume) {
    const barLength = 20;
    const filledBars = Math.round((volume / 200) * barLength);
    const emptyBars = barLength - filledBars;
    
    let volumeIndicator;
    if (volume > 150) volumeIndicator = '🔊';
    else if (volume > 50) volumeIndicator = '🔉';
    else if (volume > 0) volumeIndicator = '🔈';
    else volumeIndicator = '🔇';

    return volumeIndicator + ' ' + 
           '█'.repeat(filledBars) + 
           '░'.repeat(emptyBars) + 
           ` ${volume}%`;
}
