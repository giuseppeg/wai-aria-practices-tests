const puppeteer = require('puppeteer')
const createDialogTests = require('../../common/dialog')

const headless = process.env.HEADLESS !== 'false'

// TODO these adapters should be exported.
const assert = {
  ok: thing => expect(thing).toBeTruthy(),
  deepEqual: (a, b) => expect(a).toEqual(b),
}

describe('Suite', () => {
  let browser, page

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless })
    page = await browser.newPage()
  })

  afterEach(async () => {
    await page.close()
    await browser.close()
  })

  describe('Dialog', () => {
    createDialogTests({ assert }).map(([title, test]) => {
      it(title, async () => {
        await page.goto(
          'https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html'
        )

        await test({
          page,
          control: '#ex1 button',
        })
      })
    })
  })
})
