var selectEngine = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
            [{ text: 'google', callback_data: 'google' } ,{ text: 'microsoft', callback_data: 'microsoft' }]
      ]
    })
  };


var selectStartLan = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
            [{ text: ' 🇮🇷 فارسی', callback_data: 'fa' } ,{ text: '🇺🇸 انگلیسی', callback_data: 'en' }]
      ]
    })
  };
var selectDesLang = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
            [{ text: ' 🇮🇷 فارسی', callback_data: 'fa' } ,{ text: '🇺🇸 انگلیسی', callback_data: 'en' }]
      ]
    })
  };



module.exports = {selectEngine ,selectStartLan ,selectDesLang}