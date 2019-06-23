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
    const tests = createDialogTests({ assert })
    const sites = [
      {
        url:
          'https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html',
        control: '#ex1 button',
      },
      {
        url: 'https://ui.reach.tech/dialog/',
        control: '#dialogcontent-initialfocus ~ .react-live button',
      },
    ]

    sites.forEach(site => {
      describe(site.url, () => {
        tests.forEach(([title, test]) => {
          it(title, async () => {
            await page.goto(site.url)

            await test({
              page,
              control: site.control,
            })
          })
        })
      })
    })
  })
})
