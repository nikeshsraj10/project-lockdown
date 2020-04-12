import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import User from './User';

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<User></User>, div);
});

it("Add User to be in the document", () => {
    const { getByTestId } = render(<User/>)
    expect(getByTestId('addUserButton')).toBeInTheDocument();
})


it("Update User button should not be in the document", () => {
    const { queryByTestId } = render(<User/>)
    expect(queryByTestId('updateUser')).toBeNull();
})

it("matches snapshot", () => {
    const tree = renderer.create(<User></User>).toJSON();
    expect(tree).toMatchSnapshot();
}) 