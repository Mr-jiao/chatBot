/**
 * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
 *  - https://github.com/chatie/wechaty
 */
const http = require('http')

const {
  Wechaty,
  ScanStatus,
  log,
} = require('wechaty')

/**
 * You can ignore the next line becasue it is using for CodeSandbox
 */
require('./.util/helper')

function onScan (qrcode, status) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    require('qrcode-terminal').generate(qrcode, { small: true })  // show qrcode on console

    const qrcodeImageUrl = [
      'https://api.qrserver.com/v1/create-qr-code/?data=',
      encodeURIComponent(qrcode),
    ].join('')

    log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)

  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status)
  }
}

function onLogin (user) {
  log.info('StarterBot', '%s login', user)
}

function onLogout (user) {
  log.info('StarterBot', '%s logout', user)
}

async function onMessage (msg) {
  const contact = msg.from()
  const text = msg.text()
  const room = msg.room()
  const isSelf = msg.self()

  if (room) {
    const topic = await room.topic()
    console.log(`Room: ${topic} ContactFrom: ${contact.name()} Text: ${text}`)

    if (isSelf) {
      return
    }

    if (topic === '随随便便') {
      const options = {
        hostname: 'api.unknown-o.com',
        port: 8,
        path: '/smartchat/?key=free&msg=' + encodeURIComponent(text),
        method: 'GET'
      }

      const req = http.request(options, (res) => {
        let resText = ''
        res.on('data', (chunk) => {
          resText += JSON.parse(chunk.toString()).msg
        })

        res.on('end', () => {
          msg.say(resText)
        })
      })

      req.on('error', (e) => {
        console.error(`请求遇到问题: ${e}`)
      })
      req.end();
    }
  } else {
    console.log(`ContactFrom: ${contact.name()} Text: ${text}`)
  }
}

const bot = new Wechaty({
  name: 'ding-dong-bot',
  /**
   * Specify a puppet for a specific protocol (Web/Pad/Mac/Windows, etc).
   *
   * You can use the following providers:
   *  - wechaty-puppet-hostie
   *  - wechaty-puppet-puppeteer
   *  - wechaty-puppet-padplus
   *  - wechaty-puppet-macpro
   *  - etc.
   *
   * Learn more about Wechaty Puppet Providers at:
   *  https://github.com/wechaty/wechaty-puppet/wiki/Directory
   */
  puppet: 'wechaty-puppet-padplus',
})

bot.on('scan',    onScan)
bot.on('login',   onLogin)
bot.on('logout',  onLogout)
bot.on('message', onMessage)

bot.start()
  .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  .catch(e => log.error('StarterBot', e))
