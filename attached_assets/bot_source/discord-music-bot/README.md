# Discord Music Bot

A high-quality Discord music bot with premium sound quality, zero latency, and customizable features.

## Features

- 🎵 Premium Sound Quality (384kbps audio)
- ⚡ Ultra-low latency playback
- 📋 Rich command system
- 🎚️ Advanced volume control
- 📊 Interactive queue management
- 🎛️ Automatic voice channel handling
- 🔄 Auto-resume on reconnect
- 📱 User-friendly embed messages

## Commands

- `/play <query>` - Play a song from YouTube URL
- `/pause` - Pause the current song
- `/resume` - Resume the paused song
- `/stop` - Stop playing and clear the queue
- `/skip` - Skip the current song
- `/queue [page]` - Show the music queue
- `/volume <level>` - Adjust the volume (0-200%)
- `/help [command]` - Show help information

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Discord bot token:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   ```

4. Start the bot:
   ```bash
   npm start
   ```

## Requirements

- Node.js 16.9.0 or higher
- Discord.js v14
- FFmpeg

## Dependencies

- discord.js
- @discordjs/voice
- @discordjs/opus
- ytdl-core
- ffmpeg-static
- sodium
- winston
- dotenv

## Technical Details

### Audio Quality Settings

- Bitrate: 384kbps
- Sample Rate: 48kHz
- Channels: 2 (Stereo)

### Performance Optimizations

- Optimized FFmpeg settings for minimal latency
- Efficient queue management
- Automatic resource cleanup
- Error recovery mechanisms

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Support

If you need help or want to report issues, please create an issue in the GitHub repository.

## Acknowledgments

- Discord.js team for the excellent library
- FFmpeg for audio processing
- YouTube for content access
