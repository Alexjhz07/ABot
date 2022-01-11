const Canvas = require('canvas');
const Discord = require('discord.js');
const background = 'https://i.imgur.com/zvWTUVu.jpg';
const dim = {
    height: 675,
    width: 1200,
    margin: 50
}
const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImage = async (member) => {
    let username = member.user.username;
    let discrim = member.user.discriminator;
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size});

    const canvas = Canvas.createCanvas(dim.width, dim.height);
    const context = canvas.getContext("2d");

    //Draw background
    const backimg = await Canvas.loadImage(background);
    context.drawImage(backimg, 0, 0);

    //Draw black tinted box
    context.fillStyle = "rgba(0,0,0,.8)";
    context.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin);

    const avimg = await Canvas.loadImage(avatarURL);
    context.save();

    //Load, draw, and clip avatar image
    context.beginPath();
    context.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0 , 2 * Math.PI, true);
    context.closePath();
    context.clip();
    context.drawImage(avimg, av.x, av.y);
    context.restore();

    //Write text
    context.fillStyle = "white";
    context.textAlign = "center";

    context.font = "50px Roboto";
    context.fillText("Welcome", dim.width / 2, dim.margin + 70);

    context.font = "60px Roboto";
    context.fillText(username + " " + discrim, dim.width / 2, dim.height - dim.margin - 125);

    context.font = "40px Roboto";
    context.fillText("to the server", dim.width / 2, dim.height - dim.margin - 50);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
    return attachment;
}

module.exports = generateImage;