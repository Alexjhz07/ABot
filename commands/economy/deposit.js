module.exports = {
    name: 'deposit',
    aliases: ['stash', 'dep'],
    permissions: [],
    cooldown: 5,
    description: "Stash away some peanuts into the peanut bank for the future generation",
    async execute(client, message, args, Discord, profileData) {
        if(args.length != 1) {
            return message.channel.send(`Error: Deposit only accepts one argument`);
        }

        let amount;

        if (args[0].toUpperCase() == "ALL") {
            if(profileData.coins == 0) {
                return message.channel.send('Error: You have no money to deposit');
            }
            amount = profileData.coins;
        } else if (Number(args[0])) {
            amount = parseInt(args[0]);
        } 

        if(amount >= Number.MAX_SAFE_INTEGER || amount <= 0 || amount % 1 != 0) {
            return message.channel.send(`Error: ${args[0]} is out of bounds`);
        }

        if(0 > profileData.coins - amount) {
            return message.channel.send(`Error: You do not have enough to deposit ${amount} peanuts into your stash`);
        }

        try {
            profileData.bank += amount;
            profileData.coins -= amount;
            profileData.save();
        } catch(err) {
            console.log(err);
            return message.channel.send(`Error: Could not complete the deposit`);
        }

        return message.channel.send(`Successfully deposited ${amount} peanuts into your peanut reserves.\nCurrent pocket pile: ${profileData.coins} peanuts\nCurrent bank: ${profileData.bank} peanuts`);
    }
}