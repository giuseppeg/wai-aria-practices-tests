const assert = require('assert')
const puppeteer = require('puppeteer')
const createDialogTests = require('../../common/dialog')

const headless = process.env.HEADLESS !== 'false'

async function run() {
  const tests = createDialogTests({ assert })
  const sites = [
    {
      url:
        'https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html',
      control: '#ex1 button',
    },
    {
      url: 'https://ui.reach.tech/dialog/',
      control: '#dialogcontent-initialfocusref ~ .jsx-demo button',
    },
  ]

  for (let site of sites) {
    console.log(site.url)
    await Promise.all(
      tests.map(async ([title, test]) => {
        const browser = await puppeteer.launch({ headless })
        const page = await browser.newPage()

        await page.goto(site.url)

        try {
          await test({
            page,
            control: site.control,
          })
          console.log(`- ${title}...PASS`)
        } catch (error) {
          console.log(`- ${title}...FAIL`)
          throw error
        }

        await page.close()
        await browser.close()
      })
    )
  }
}

run()
