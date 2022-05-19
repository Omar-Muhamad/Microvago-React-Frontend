import { render } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import SignUp from '../components/SignUp/SignUp';
import store from '../redux/configureStore';
import React from 'react';

describe('Components testing', () => {
  test('Splash component', () => {
    const tree = render(<Provider store={store}><BrowserRouter><Routes><Route path="/signup" element={<SignUp />} /></Routes></BrowserRouter></Provider>);
    expect(tree).toMatchSnapshot();
  });
});
