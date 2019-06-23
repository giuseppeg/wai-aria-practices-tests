const assert = require('assert')
const puppeteer = require('puppeteer')
const createDialogTests = require('../../common/dialog')

const headless = process.env.HEADLESS !== 'false'

async function run() {
  const browser = await puppeteer.launch({ headless })
  const page = await browser.newPage()

  await Promise.all(
    createDialogTests({ assert }).map(async ([title, test]) => {
      await page.goto(
        'https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html'
      )

      await test({
        page,
        control: '#ex1 button',
      })
    })
  )

  await page.close()
  await browser.close()
}

run()
