const { token } = require('../../config.json')

module.exports = {
    name: "restart",
    description: "Restart the bot",
    category: "owner",
    botPermission: [],
    authorPermission: [],
    ownerOnly: true,
    run: async (client, message, args) => {
        
    message.channel.send("Reloading.... This might take a second")
    console.clear()
    client.destroy()
    client.login(token)
    console.log('Sucesfully Restarted')
    message.channel.send("Reloaded sucesfully!")
    }
}