/*
    Credits for the original source code: https://github.com/saanuregh/discord.js-pagination
    Minor fixes made to ensure compatibility with the current version of Discord.js (v.14)
*/

const paginationEmbed = async (msg, pages, toUser = false, timeout = 60000, emojiList = ['⏪', '⏩']) => {
	if (!msg && !msg.channel) throw new Error('Channel is inaccessible');
	if (!pages) throw new Error('Pages are not given');
	if (emojiList.length !== 2) throw new Error('Need two emojis');

    // Page count tracker
	let page = 0;

    // Checks if we want to send to the user DM or channel
	const curPage = toUser ? 
    await msg.author.send( {embeds: [pages[page].setFooter( {text: `Page ${page + 1} / ${pages.length}`} )]} ) :
    await msg.channel.send( {embeds: [pages[page].setFooter( {text: `Page ${page + 1} / ${pages.length}`} )]} );

	for (const emoji of emojiList) await curPage.react(emoji);

    // Check if emote is in list and that user who reacted is not a bot
    const filter = (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot;

	const reactionCollector = curPage.createReactionCollector(
		{ filter, dispose: true, idle: timeout }
	);

    // On user reaction, switch the page
	reactionCollector.on('collect', (reaction) => {
		if (!toUser) reaction.users.remove(msg.author); // Discord does not allow bots to remove DM reactions
		switch (reaction.emoji.name) {
			case emojiList[0]:
				page = page > 0 ? --page : pages.length - 1;
				break;
			case emojiList[1]:
				page = page + 1 < pages.length ? ++page : 0;
				break;
			default:
				break;
		}
		curPage.edit( {embeds: [pages[page].setFooter( {text: `Page ${page + 1} / ${pages.length}`} )]} );
	});

    // On user reaction removal in DM, switch the page
    reactionCollector.on('remove', (reaction) => {
        if (toUser) {
            switch (reaction.emoji.name) {
                case emojiList[0]:
                    page = page > 0 ? --page : pages.length - 1;
                    break;
                case emojiList[1]:
                    page = page + 1 < pages.length ? ++page : 0;
                    break;
                default:
                    break;
            }
            curPage.edit( {embeds: [pages[page].setFooter( {text: `Page ${page + 1} / ${pages.length}`} )]} );
        }
    });
       
    // When the collector times out, remove all reactions if on server
	reactionCollector.on('end', () => {
		if (!curPage.deleted && !toUser) {
			curPage.reactions.removeAll()
		}
	});

	return curPage;
};

module.exports = paginationEmbed;