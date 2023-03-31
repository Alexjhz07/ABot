const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'colors',
    aliases: [],
    permissions: [],
    cooldown: 0,
    description: 'Colored text for discord (Only works on some devices)',
    async execute(client, message, args, Discord, profileData) {

        // Tabs are visible in text, may need to use a package like dedent or create own function to remove leading white spaces
        return message.channel.send(`
**Normal Text**
Lorem ipsum dolor

**Inline Code Block**
\`Lorem ipsum dolor\`

**Spanning Code Block**
\`\`\`Lorem ipsum dolor\`\`\`
**Green with Diff**
\`\`\`diff
+Lorem ipsum dolor
\`\`\`
**Green with json (Need quotes)**
\`\`\`json
"Lorem ipsum dolor"
\`\`\`
**Blue with bash (Needs quotes)**
\`\`\`bash
"Lorem ipsum dolor"
\`\`\`
**Cyan with yaml**
\`\`\`yaml
Lorem ipsum dolor
\`\`\`
**Yellow with http**
\`\`\`http
Lorem ipsum dolor
\`\`\`
**Orange with arm (Only 'first' word is orange)**
\`\`\`arm
Lorem_ipsum dolor
\`\`\`
**Red with diff**
\`\`\`diff
-Lorem ipsum dolor
\`\`\`
**Red with css**
\`\`\`css
[Lorem ipsum dolor]
\`\`\`
**Yellow with fix**
\`\`\`fix
Lorem ipsum dolor
\`\`\`
**Yellow with elm (Only Capital words)**
\`\`\`elm
Lorem ipsum Dolor
\`\`\`
**Blue with ini**
\`\`\`ini
[Lorem ipsum dolor]
\`\`\`
**Blue with css (Period before each word)**
\`\`\`css
.Lorem ipsum .dolor
\`\`\`
        `)
    }
}