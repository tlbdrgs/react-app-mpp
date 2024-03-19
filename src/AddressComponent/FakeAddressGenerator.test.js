// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import FakeAddressGenerator from './FakeAddressGenerator';

// describe('FakeAddressGenerator component', () => {
//     it('renders the header correctly', () => {
//         const { getByText } = render(<FakeAddressGenerator />);
//         expect(getByText('Fake Address Generator')).toBeInTheDocument();
//     });

//     it('adds a new address when "Add Address" button is clicked', () => {
//         const { getByText, getByLabelText } = render(<FakeAddressGenerator />);

//         // Click the "Add Address" button
//         fireEvent.click(getByText('Add Address'));

//         // Fill out the form fields
//         fireEvent.change(getByLabelText('Street:'), { target: { value: '123 Main St' } });
//         fireEvent.change(getByLabelText('City:'), { target: { value: 'City' } });
//         fireEvent.change(getByLabelText('Zip Code:'), { target: { value: '123456' } });

//         // Click the "Save Address" button
//         fireEvent.click(getByText('Save Address'));

//         // Check if the new address is rendered
//         expect(getByText('123 Main St')).toBeInTheDocument();
//         expect(getByText('City')).toBeInTheDocument();
//         expect(getByText('123456')).toBeInTheDocument();
//         expect(getByText('Romania')).toBeInTheDocument();
//     });

//     it('displays an error message for invalid zip code', () => {
//         const { getByText, getByLabelText } = render(<FakeAddressGenerator />);

//         // Click the "Add Address" button
//         fireEvent.click(getByText('Add Address'));

//         // Fill out the form fields with invalid zip code
//         fireEvent.change(getByLabelText('Zip Code:'), { target: { value: '123' } });

//         // Click the "Save Address" button
//         fireEvent.click(getByText('Save Address'));

//         // Check if the error message is displayed
//         expect(getByText('Zip code should be exactly 6 numbers.')).toBeInTheDocument();
//     });
// });