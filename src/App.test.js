import { render, screen, waitForElement } from '@testing-library/react';
import App from './App';
import "jest-dom/extend-expect";
import axios from "axios";
 

// Test 
test('Import files to be found', () => {
  render(<App />);
  const linkElement = screen.getByText(/Import files/i);
  expect(linkElement).toBeInTheDocument();
});
 
// test call API

test("testing calling API once , and with correct URL", async () => {

  const url = '"http://127.0.0.1:3002/Files"';
  expect(axios.get).toHaveBeenCalledWith(url);
  expect(axios.get).toHaveBeenCalledTimes(1);
});
