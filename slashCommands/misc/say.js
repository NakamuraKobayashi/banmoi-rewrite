


module.exports = {
 name:"say",
description:'Bot nói nội dung chỉ định',
 usage: "say <nội dung>",
 options: [
    {
        name: 'query',
        description: 'Nội dung muốn bot nói',
        type: 'STRING',
        required: true,
    }
],

 run: async (client, interaction, args) => {
    const text = interaction.options.getString('query');

interaction.reply({ 
    content: '✅|Thao tác thành công',
     ephemeral: true })
        
     

interaction.channel.send(text)     

    }
      
  }
