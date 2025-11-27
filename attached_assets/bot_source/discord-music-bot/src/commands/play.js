const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const player = require('../music/player');
const { embedColors, messages } = require('../../config/config.json');
const logger = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song from YouTube')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('YouTube URL or search query')
                .setRequired(true)),
    
    async execute(interaction) {
        // Check if user is in a voice channel
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply({
                content: messages.notInVoiceChannel,
                ephemeral: true
            });
        }

        // Check bot permissions
        const permissions = voiceChannel.permissionsFor(interaction.client.user);
        if (!permissions.has('Connect') || !permissions.has('Speak')) {
            return interaction.reply({
                content: messages.noPermission,
                ephemeral: true
            });
        }

        await interaction.deferReply();

        try {
            const query = interaction.options.getString('query');
            let videoUrl = query;

            // If the query is not a URL, assume it's a search term
            if (!ytdl.validateURL(query)) {
                // For now, reply that direct search is not implemented
                // In a full implementation, you would use youtube-search-api here
                return interaction.editReply('Direct search is not implemented yet. Please provide a YouTube URL.');
            }

            // Get video information
            const videoInfo = await ytdl.getInfo(videoUrl);
            const track = {
                url: videoUrl,
                title: videoInfo.videoDetails.title,
                duration: parseInt(videoInfo.videoDetails.lengthSeconds),
                thumbnail: videoInfo.videoDetails.thumbnails[0].url,
                requestedBy: interaction.user.tag
            };

            // Join voice channel if not already connected
            if (!interaction.guild.members.me.voice.channel) {
                await player.join(voiceChannel);
            }

            // Add track to queue
            const position = await player.play(interaction.guild.id, track);

            // Create embed response
            const embed = new EmbedBuilder()
                .setColor(embedColors.success)
                .setTitle(position === 0 ? messages.nowPlaying : messages.addedToQueue)
                .setDescription(`[${track.title}](${track.url})`)
                .setThumbnail(track.thumbnail)
                .addFields(
                    { name: 'Duration', value: formatDuration(track.duration), inline: true },
                    { name: 'Requested by', value: track.requestedBy, inline: true }
                );

            if (position > 0) {
                embed.addFields({ name: 'Position in queue', value: position.toString(), inline: true });
            }

            await interaction.editReply({ embeds: [embed] });
            logger.info(`Added track "${track.title}" to queue in guild ${interaction.guild.id}`);

        } catch (error) {
            logger.error('Error in play command:', error);
            await interaction.editReply({
                content: 'An error occurred while trying to play the track.',
                ephemeral: true
            });
        }
    }
};

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
