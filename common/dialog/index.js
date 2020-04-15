const { findFocusedNode, sleep } = require('../utils')

const dialogSelector = '[role="dialog"], dialog, [aria-modal]'

module.exports = ({ assert }) => [
  [
    'Moves focus inside of the dialog',
    async function test({ page, control }) {
      control = typeof control === 'string' ? await page.$(control) : control
      assert.ok(control)

      await control.click()

      const dialog = await page.waitForSelector(dialogSelector)
      assert.ok(dialog)

      assert.ok(
        await page.evaluate(dialog => {
          const activeElement = dialog.ownerDocument.activeElement
          return activeElement === dialog || dialog.contains(activeElement)
        }, dialog)
      )
    },
  ],
  [
    'After Shift+Tab focus is still inside of the dialog',
    async function test({ page, control }) {
      // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-keyboard
      // See note on shortcuts
      await page.bringToFront()

      control = typeof control === 'string' ? await page.$(control) : control
      assert.ok(control)

      await control.click()

      const dialog = await page.waitForSelector(dialogSelector)
      assert.ok(dialog)

      await page.keyboard.down('Shift')
      await page.keyboard.press('Tab')
      await page.keyboard.up('Shift')

      assert.ok(
        await page.evaluate(dialog => {
          return dialog.contains(dialog.ownerDocument.activeElement)
        }, dialog)
      )
    },
  ],
  [
    'When on the last focusable element, after Tab focus is still inside of the dialog',
    async function test({ page, control }) {
      // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-keyboard
      // See note on shortcuts
      await page.bringToFront()

      control = typeof control === 'string' ? await page.$(control) : control
      assert.ok(control)

      await control.click()

      const dialog = await page.waitForSelector(dialogSelector)
      assert.ok(dialog)

      await page.keyboard.down('Shift')
      await page.keyboard.press('Tab')
      await page.keyboard.up('Shift')

      await page.keyboard.press('Tab')

      assert.ok(
        await page.evaluate(dialog => {
          return dialog.contains(dialog.ownerDocument.activeElement)
        }, dialog)
      )
    },
  ],
  [
    'Can close the dialog with Escape and restores focus',
    async function test({ page, control }) {
      // https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-keyboard
      // See note on shortcuts
      await page.bringToFront()

      control = typeof control === 'string' ? await page.$(control) : control
      assert.ok(control)

      await control.focus()
      let snapshot = await page.accessibility.snapshot()
      const restoreFocusNode = findFocusedNode(snapshot)

      await control.click()

      const dialog = await page.waitForSelector(dialogSelector)
      assert.ok(dialog)

      await page.keyboard.press('Escape')

      await page.waitForSelector(dialogSelector, {
        hidden: true
      })

      snapshot = await page.accessibility.snapshot()

      assert.deepEqual(restoreFocusNode, findFocusedNode(snapshot))

      // Probably this is better than checking the accessibility tree.
      assert.ok(
        await page.evaluate(control => {
          return control.ownerDocument.activeElement === control
        }, control)
      )
    },
  ],
]
