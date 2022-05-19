import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../components/Login/Login';
import store from '../redux/configureStore';

describe('Components testing', () => {
  test('Splash component', () => {
    const tree = render(<Provider store={store}><BrowserRouter><Routes><Route path="/login" element={<Login />} /></Routes></BrowserRouter></Provider>);
    expect(tree).toMatchSnapshot();
  });
});
