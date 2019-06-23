# WAI-ARIA Authoring Practices End-to-end tests

A suite of end-to-end tests to check if your application or website is compliant with the [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1).

The tests are written to work with Puppeteer and aim to be plug-n-play, i.e. they can test any application or website (some constraints apply).

This repo provides generic test suites that you can run against your applications of websites to test that behaviors of your widget adhere to the [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1).

Note this is not a static analysis tool that checks for valid HTML [aria] attributes or semantic HTML.

## Proof of concept

Note this is a proof of concept. Your help and validation is very important to move this project forward.

The goal of this project is to provide a . Many don't even spend time on accessibility and such a tool could encourage folks to fix issues in a "test driven development" manner.

To start off I am going to try to write tests for [modal dialogs](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal). You can find the code for it in `common/dialog/index.js`.

## npm

```
npm i -D wai-aria-practices-tests
```

## Examples

Bootstrap the project:

```
npm i
```

Run the tests with node:

```
npm run example:node
```

Run the tests with Jest:

```
npm run example:jest
```

## How it works

The idea is to write generic test that rely only on accessibility properties like aria-roles and, when necessary accept CSS selectors to retrieve elements.

Each suite in `common` is generic and uses the Node.js `assert` library API to make assertions.

Integrations for jest, AVA etc. would need to map to the `assert` interface. You can see an example in the `examples/jest` suite.

## License

MIT
