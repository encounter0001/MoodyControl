const { 
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    AudioPlayerStatus,
    VoiceConnectionStatus,
    entersState
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const { audioQuality, ffmpegOptions } = require('../../config/config.json');
const logger = require('../utils/logger');

class MusicPlayer {
    constructor() {
        this.queues = new Map();
        this.players = new Map();
        this.connections = new Map();
    }

    async join(channel) {
        try {
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: true,
                selfMute: false
            });

            // Handle connection state changes
            connection.on(VoiceConnectionStatus.Disconnected, async () => {
                try {
                    await Promise.race([
                        entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                        entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                    ]);
                } catch (error) {
                    connection.destroy();
                    this.connections.delete(channel.guild.id);
                    logger.error(`Voice connection error in guild ${channel.guild.id}:`, error);
                }
            });

            this.connections.set(channel.guild.id, connection);
            return connection;
        } catch (error) {
            logger.error(`Error joining voice channel in guild ${channel.guild.id}:`, error);
            throw error;
        }
    }

    async play(guildId, track) {
        try {
            if (!this.queues.has(guildId)) {
                this.queues.set(guildId, []);
            }

            const queue = this.queues.get(guildId);
            queue.push(track);

            if (queue.length === 1) {
                await this.processQueue(guildId);
            }

            return queue.length - 1;
        } catch (error) {
            logger.error(`Error playing track in guild ${guildId}:`, error);
            throw error;
        }
    }

    async processQueue(guildId) {
        const queue = this.queues.get(guildId);
        if (!queue || queue.length === 0) return;

        const track = queue[0];
        try {
            const stream = ytdl(track.url, {
                filter: 'audioonly',
                highWaterMark: 1 << 25, // 32MB buffer
                quality: 'highestaudio',
                ...audioQuality
            });

            const resource = createAudioResource(stream, {
                inputType: 'opus',
                inlineVolume: true,
                ...ffmpegOptions
            });

            const player = createAudioPlayer();
            this.players.set(guildId, player);

            const connection = this.connections.get(guildId);
            connection.subscribe(player);

            player.play(resource);

            // Handle player state changes
            player.on(AudioPlayerStatus.Idle, () => {
                queue.shift();
                if (queue.length > 0) {
                    this.processQueue(guildId);
                } else {
                    this.queues.delete(guildId);
                    this.players.delete(guildId);
                }
            });

            player.on('error', error => {
                logger.error(`Player error in guild ${guildId}:`, error);
                queue.shift();
                if (queue.length > 0) {
                    this.processQueue(guildId);
                }
            });

        } catch (error) {
            logger.error(`Error processing queue in guild ${guildId}:`, error);
            queue.shift();
            if (queue.length > 0) {
                this.processQueue(guildId);
            }
        }
    }

    pause(guildId) {
        const player = this.players.get(guildId);
        if (player) {
            player.pause();
            return true;
        }
        return false;
    }

    resume(guildId) {
        const player = this.players.get(guildId);
        if (player) {
            player.unpause();
            return true;
        }
        return false;
    }

    skip(guildId) {
        const player = this.players.get(guildId);
        if (player) {
            player.stop();
            return true;
        }
        return false;
    }

    stop(guildId) {
        const player = this.players.get(guildId);
        if (player) {
            player.stop();
            this.queues.delete(guildId);
            this.players.delete(guildId);
            const connection = this.connections.get(guildId);
            if (connection) {
                connection.destroy();
                this.connections.delete(guildId);
            }
            return true;
        }
        return false;
    }

    setVolume(guildId, volume) {
        const player = this.players.get(guildId);
        if (player && player.state.resource) {
            const vol = Math.max(0, Math.min(2, volume / 100)); // Convert percentage to decimal (0-2)
            player.state.resource.volume.setVolume(vol);
            return true;
        }
        return false;
    }

    getQueue(guildId) {
        return this.queues.get(guildId) || [];
    }

    isPlaying(guildId) {
        const player = this.players.get(guildId);
        return player && player.state.status === AudioPlayerStatus.Playing;
    }

    isPaused(guildId) {
        const player = this.players.get(guildId);
        return player && player.state.status === AudioPlayerStatus.Paused;
    }

    getCurrentTrack(guildId) {
        const queue = this.queues.get(guildId);
        return queue && queue.length > 0 ? queue[0] : null;
    }
}

module.exports = new MusicPlayer();
