import React from 'react';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';



afterEach(cleanup);
describe('Header Component Test Suite', () => {
    it("matches snapshot", () => {
        const tree = renderer.create(<BrowserRouter><Header/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
