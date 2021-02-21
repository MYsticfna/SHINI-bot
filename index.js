const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command.js')

client.on('ready', () => {
  console.log('The client is ready!')
  command(client, ['ping', 'test'], (message) => {
    message.channel.send('Pong!')
  })

  command(client, 'servers', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      )
    })
  })

  command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })

  command(client, 'status', (message) => {
    const content = message.content.replace('!status ', '')
    // "!status hello world" -> "hello world"

    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    })
  })
  command(client, 'createtextchannel', (message) => {
    const name = message.content.replace('!createtextchannel ', '')

    message.guild.channels
      .create(name, {
        type: 'text',
      })
      .then((channel) => {
        const categoryId = '812032719801417829'
        channel.setParent(categoryId)
      })
  })

  command(client, 'createvoicechannel', (message) => {
    const name = message.content.replace('!createvoicechannel ', '')

    message.guild.channels
      .create(name, {
        type: 'voice',
      })
      .then((channel) => {
        const categoryId = '812032719801417829'
        channel.setParent(categoryId)
        channel.setUserLimit(10)
      })
    })
    command(client, 'serverinfo', (message) => {
      const { guild } = message
  
      const { name, region, memberCount, owner, afkTimeout } = guild
      const icon = guild.iconURL()
  
      const embed = new Discord.MessageEmbed()
        .setTitle(`Server info for "${name}"`)
        .setThumbnail(icon)
        .addFields(
          {
            name: 'Region',
            value: region,
          },
          {
            name: 'Members',
            value: memberCount,
          },
          {
            name: 'Owner',
            value: owner.user.tag,
          },
          {
            name: 'AFK Timeout',
            value: afkTimeout / 60,
          }
        )
  
      message.channel.send(embed)
        })
        command(client, ['inv', 'invite'], (message) => {
          message.channel.send('https://discord.com/oauth2/authorize?client_id=812036727740170240&permissions=8&scope=bot')
        })
      })
  
client.login(config.token)