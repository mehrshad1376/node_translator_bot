//import buttn
const axios = require('axios')
const button = require('./buttons')
var messageID 
function botStart(bot , msg)
{
    messageID =msg.message_id
    bot.sendMessage(msg.chat.id , 'به ربات مترجم خوش آمدید.لطفا زبان مبدا خود را انتخاب کنید' ,button.selectEngine)
}

function Editemessage(text,bot ,query,but)
{
    bot.editMessageText(text,
        {
            chat_id : query.message.chat.id,
            message_id: query.message.message_id,
            reply_markup: but.reply_markup
        }
    )
}
async function getApi(bot,chatID,url,engine,desLang,msg)
{
    console.log(engine)
    console.log(desLang)
    const  res = await axios.get(`${url}?token=891910:644252b4a52d3&action=${engine}&lang=${desLang}&q=${msg}`)
    bot.sendMessage(chatID , res.data.result)
    console.log(res.data)

}

module.exports = {botStart ,Editemessage ,getApi}