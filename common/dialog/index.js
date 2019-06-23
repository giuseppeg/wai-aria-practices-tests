const { findFocusedNode, sleep } = require('../utils')

module.exports = ({ assert }) => [
  [
    'Can close the modal with Escape and restores focus',
    async function test({ page, control }) {
      control = typeof control === 'string' ? await page.$(control) : control
      assert.ok(control)

      control.focus()
      let snapshot = await page.accessibility.snapshot()
      const restoreFocusNode = findFocusedNode(snapshot)

      control.click()

      const dialog = await page.$('[role="dialog"]')
      assert.ok(dialog)
      // TODO Should implement a wait until helper to retry selecting elements.
      await sleep(100)

      await page.keyboard.press('Escape')
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
