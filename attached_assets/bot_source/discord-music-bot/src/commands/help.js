const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { embedColors } = require('../../config/config.json');
const logger = require('../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show all available commands')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('Get detailed help for a specific command')
                .setRequired(false)),

    async execute(interaction) {
        const commands = interaction.client.commands;
        const specificCommand = interaction.options.getString('command');

        try {
            if (specificCommand) {
                const command = commands.get(specificCommand);
                if (!command) {
                    return interaction.reply({
                        content: `No command found named \`${specificCommand}\``,
                        ephemeral: true
                    });
                }

                const embed = new EmbedBuilder()
                    .setColor(embedColors.info)
                    .setTitle(`Command: /${command.data.name}`)
                    .setDescription(command.data.description)
                    .addFields(
                        {
                            name: 'Usage',
                            value: `/${command.data.name} ${command.data.options?.map(opt => 
                                opt.required ? `<${opt.name}>` : `[${opt.name}]`
                            ).join(' ') || ''}`
                        }
                    );

                if (command.data.options?.length > 0) {
                    embed.addFields({
                        name: 'Options',
                        value: command.data.options.map(opt => 
                            `\`${opt.name}\`: ${opt.description} ${opt.required ? '(Required)' : '(Optional)'}`
                        ).join('\n')
                    });
                }

                await interaction.reply({ embeds: [embed] });
            } else {
                const embed = new EmbedBuilder()
                    .setColor(embedColors.info)
                    .setTitle('🎵 Music Bot Commands')
                    .setDescription('Here are all available commands. Use `/help <command>` for detailed information about a specific command.')
                    .addFields(
                        {
                            name: '🎵 Music Controls',
                            value: [
                                '`/play <query>` - Play a song from YouTube',
                                '`/pause` - Pause the current song',
                                '`/resume` - Resume the paused song',
                                '`/stop` - Stop playing and clear the queue',
                                '`/skip` - Skip the current song',
                                '`/queue [page]` - Show the music queue',
                                '`/volume <level>` - Adjust the volume (0-200%)'
                            ].join('\n')
                        },
                        {
                            name: '📋 Other',
                            value: '`/help [command]` - Show this help message or get detailed help for a specific command'
                        }
                    )
                    .setFooter({ 
                        text: `${commands.size} commands available • Premium Sound Quality` 
                    });

                await interaction.reply({ embeds: [embed] });
            }

            logger.info(`Help command used by ${interaction.user.tag} in guild ${interaction.guild.id}`);
        } catch (error) {
            logger.error('Error in help command:', error);
            await interaction.reply({
                content: 'An error occurred while trying to display the help information.',
                ephemeral: true
            });
        }
    },
};
