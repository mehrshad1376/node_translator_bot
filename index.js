
//add telbot package //get token from botfather 
const TelegramBot = require('node-telegram-bot-api');
const token = '7005922695:AAGFfsvltcoJNZmlRgYv2fJDy_cViBjqsOM';
const bot = new TelegramBot(token, {polling: true});

//import redis
const redis = require('redis')
const client = redis.createClient()
client.connect()

//import axios
const axios = require('axios')

//import actions and button
const actions = require('./component/actions')
const button = require('./component/buttons')

var bol = true;

bot.onText(/\/start/ , (msg)=>
{
    actions.botStart(bot , msg)
})
var ln
bot.on('callback_query', async (query)=>
{
    const chatID =query.message.chat.id

   if(query.data === 'google' || query.data === 'microsoft')
   {
    ln = query.data 
    console.log
    client.set(`user:${chatID}:engine`,query.data)
    actions.Editemessage('زبان مبدا خود را انتخاب کنید',bot ,query,button.selectStartLan)
   }
   if((query.data === 'fa' || query.data === 'en') && bol ===true)
    {
        bol =false
        client.set(`user:${chatID}:startlan`,query.data)
        actions.Editemessage('زبان مقصد خود را انتخاب کنید',bot ,query,button.selectDesLang)
    }
    else if(bol ===false ){
        bol =true
        client.set(`user:${chatID}:deslan`,query.data)
        bot.sendMessage(query.message.chat.id , 'لطفا متن خود را وارد کنید')
        
    }
})

bot.on('message',async (msg)=>
{
    var deslan
    var engine
    
    if(!msg.text.startsWith('/'))
    {
        async function getUserData() {
            try {
               deslan = await client.get(`user:${msg.chat.id}:deslan`);
               engine = await client.get(`user:${msg.chat.id}:engine`);
              return deslan;
            } catch (error) {
              console.error('Error fetching deslan:', error);
              return null;
            }
          }
          await getUserData()



        await actions.getApi(bot,msg.chat.id,'https://one-api.ir/translate/',engine,deslan,msg.text)
        
    }


})
bot.on('polling_error',(msg)=>
{
    console.log(msg)
})
