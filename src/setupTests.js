/* eslint-disable no-undef */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// Adicione isso no setupTests.js ou no topo do arquivo de teste
import { TextEncoder, TextDecoder } from "util";
import "web-streams-polyfill/ponyfill";

// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
