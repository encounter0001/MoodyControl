const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const player = require('../music/player');
const { embedColors, messages } = require('../../config/config.json');
const logger = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Show the current music queue')
        .addIntegerOption(option =>
            option.setName('page')
                .setDescription('Page number of the queue')
                .setMinValue(1)),

    async execute(interaction) {
        const queue = player.getQueue(interaction.guild.id);
        
        if (!queue || queue.length === 0) {
            return interaction.reply({
                content: messages.queueEmpty,
                ephemeral: true
            });
        }

        try {
            const itemsPerPage = 10;
            const page = (interaction.options.getInteger('page') || 1) - 1;
            const maxPages = Math.ceil(queue.length / itemsPerPage);

            if (page >= maxPages) {
                return interaction.reply({
                    content: `Invalid page. There are only ${maxPages} pages.`,
                    ephemeral: true
                });
            }

            const currentTrack = player.getCurrentTrack(interaction.guild.id);
            const queueItems = queue.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
            let totalDuration = queue.reduce((acc, track) => acc + track.duration, 0);

            const embed = new EmbedBuilder()
                .setColor(embedColors.info)
                .setTitle('Music Queue')
                .setDescription(`**Now Playing:**\n[${currentTrack.title}](${currentTrack.url})`)
                .addFields(
                    {
                        name: 'Up Next:',
                        value: queueItems.length > 0
                            ? queueItems.map((track, index) => 
                                `${page * itemsPerPage + index + 1}. [${track.title}](${track.url}) | \`${formatDuration(track.duration)}\` | Requested by: ${track.requestedBy}`
                            ).join('\n')
                            : 'No more tracks in queue'
                    },
                    {
                        name: 'Queue Info',
                        value: `Total tracks: ${queue.length}\nTotal duration: ${formatDuration(totalDuration)}\nPage ${page + 1}/${maxPages}`
                    }
                )
                .setFooter({ 
                    text: `Use /queue <page> to view different pages • ${queue.length} tracks in queue` 
                });

            await interaction.reply({ embeds: [embed] });
            logger.info(`Displayed queue page ${page + 1} in guild ${interaction.guild.id}`);

        } catch (error) {
            logger.error('Error in queue command:', error);
            await interaction.reply({
                content: 'An error occurred while trying to display the queue.',
                ephemeral: true
            });
        }
    },
};

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
