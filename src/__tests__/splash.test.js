import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Splash from '../components/Splash/Splash';
import store from '../redux/configureStore';

describe('Components testing', () => {
  test('Splash component', () => {
    const tree = render(<Provider store={store}><BrowserRouter><Routes><Route path="/" element={<Splash />} /></Routes></BrowserRouter></Provider>);
    expect(tree).toMatchSnapshot();
  });
});
