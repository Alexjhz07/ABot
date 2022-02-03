module.exports = {
    name: 'withdraw',
    aliases: ['rob'],
    permissions: [],
    cooldown: 5,
    description: "Withdraw some peanuts from the peanut bank",
    async execute(client, message, args, Discord, profileData) {
        if(args.length != 1) {
            return message.channel.send(`Error: Withdraw only accepts one argument`);
        }

        let amount;

        if (args[0].toUpperCase() == "ALL") {
            if(profileData.bank == 0) {
                return message.channel.send('Error: You have no peanuts to withdraw');
            }
            amount = profileData.bank;
        } else if (Number(args[0])) {
            amount = parseInt(args[0]);
        } 

        if(amount >= Number.MAX_SAFE_INTEGER || amount <= 0 || amount % 1 != 0) {
            return message.channel.send(`Error: ${args[0]} is out of bounds`);
        }

        if(0 > profileData.bank - amount) {
            return message.channel.send(`Error: You do not have enough in the bank to withdraw ${amount} peanuts`);
        }

        try {
            profileData.coins += amount;
            profileData.bank -= amount;
            profileData.save();
        } catch(err) {
            console.log(err);
            return message.channel.send(`Error: Could not complete the withdraw`);
        }

        return message.channel.send(`Successfully withdrew ${amount} peanuts from your account.\nCurrent wallet: ${profileData.coins} peanuts\nCurrent bank: ${profileData.bank} peanuts`);
    }
}