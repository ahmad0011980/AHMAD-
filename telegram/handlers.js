// ============================================
//    AHMII BAJWA BOT — TELEGRAM/HANDLERS.JS
// ============================================

'use strict';

const config = require('../config/config');
const pairManager = require('../pair/pairManager');
const sessionManager = require('../core/session');

// Safe fallback (fonts remove kar diya crash avoid karne ke liye)
const toSmallCaps = (text) => text;

// ─── /start Handler ───────────────────────────
const handleStart = async (bot, chatId, userId, firstName, verifiedUsers) => {

  const alreadyVerified = verifiedUsers.get(userId);

  const welcomeText =
`🤖 Welcome to Badshah MD Bot!

Hello ${firstName} 👋

THIS IS SHEHRYAR MD BOT

━━━━━━━━━━━━━━━━━━━━
👨‍💻 Developer: Badshah
🔖 Version: ${config.version}
━━━━━━━━━━━━━━━━━━━━

${alreadyVerified ? '✅ You are already verified!' : '🔐 Please verify below to continue 👇'}`;

  const keyboard = alreadyVerified
    ? {
        inline_keyboard: [
          [
            { text: 'CHANNEL 1', url: config.channels.channel1 },
            { text: 'CHANNEL 2', url: config.channels.channel2 },
          ],
        ],
      }
    : {
        inline_keyboard: [
          [
            { text: 'VERIFY', callback_data: 'verify' },
          ],
          [
            { text: 'CHANNEL 1', url: config.channels.channel1 },
            { text: 'CHANNEL 2', url: config.channels.channel2 },
          ],
        ],
      };

  await bot.sendMessage(chatId, welcomeText, {
    reply_markup: keyboard,
  });
};

// ─── Verify Handler ───────────────────────────
const handleVerify = async (bot, chatId, firstName) => {

  const text =
`✅ Verification Successful!

Welcome ${firstName}!
You now have full access.

Commands:
/reqpair <number>
/help
/status`;

  await bot.sendMessage(chatId, text);
};

// ─── Help Handler ────────────────────────────
const handleHelp = async (bot, chatId) => {

  const text =
`HELP MENU

/start - Start bot
/reqpair <number> - Pair WhatsApp
/status - Bot status
/help - Help menu`;

  await bot.sendMessage(chatId, text);
};

// ─── Status Handler ──────────────────────────
const handleStatus = async (bot, chatId) => {

  const text =
`BOT STATUS

Active: ${pairManager.activeCount()}
Pending: ${pairManager.pendingCount()}
Sessions: ${sessionManager.count()}
Uptime: ${Math.floor(process.uptime())}s`;

  await bot.sendMessage(chatId, text);
};

module.exports = {
  handleStart,
  handleVerify,
  handleHelp,
  handleStatus,
};
