module.exports = {
    name: 'withdraw',
    aliases: ['rob'],
    permissions: [],
    cooldown: 0,
    description: "Withdraw some peanuts from the peanut bank",
    async execute(client, message, args, Discord, profileData) {
        if (args.length != 1) return message.channel.send(`Error: Withdraw only accepts one argument`);

        let amount;

        if (args[0].toUpperCase() == "ALL") {
            if (profileData.bank == 0) {
                return message.channel.send('Error: You have no peanuts to withdraw');
            }
            
            amount = profileData.bank;
        } else if (Number(args[0])) {
            amount = Math.round(args[0] * 1e2) / 1e2;
        }

        if (amount >= Number.MAX_SAFE_INTEGER || amount <= 0) {
            return message.channel.send(`Error: ${args[0]} is out of bounds`);
        }

        if (0 > profileData.bank - amount) {
            return message.channel.send(`Error: You do not have enough in the bank to withdraw ${amount.toFixed(2)} peanuts`);
        }

        profileData.coins += amount;
        profileData.bank -= amount;
        profileData.save();

        return message.channel.send(`Successfully withdrew ${amount.toFixed(2)} peanuts from your account.\nCurrent wallet: ${profileData.coins.toFixed(2)} peanuts\nCurrent bank: ${profileData.bank.toFixed(2)} peanuts`);
    }
}