const { prefix } = require('../config.json');

module.exports = {
  name: 'relink',
  description: "Edit an existing users platform and username",
  args: true,
  usage: '<platform> <username>',
  async execute(message,args,Users){
    const platforms = [ 'PC', 'XBOX', 'PS4' ];
		const [ userPlatform, userID ] = args;
		const { author: { id } } = message;
  
    if (!platforms.includes(userPlatform.toUpperCase())) {
			return message.channel.send(
				`Selected Plaform: ${userPlatform} is not valid.\nPlease select from ${platforms
					.join(', ')
					.toUpperCase()}`
			);
		}

    if (userID.length < 6 || userID.length > 20) {
			return message.channel.send(`Selected username, ${userID} is not of valid length.`);
    }
    
    const affectedRows = await Users.update({platform:userPlatform,username: userID}, {where: {discord:id}})
    if(affectedRows > 0){
      return message.reply(
        `\nUser: ${message.author} updated.\nPlatform: ${userPlatform.toUpperCase()}\nUsername: ${userID.toUpperCase()}`
      )
    }

    return message.reply(
      `Could not update ${message.author}. User was not found, please add user with \`${prefix}link\``
    )
  }
}