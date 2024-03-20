import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FakeAddressGenerator from './FakeAddressGenerator';

describe('FakeAddressGenerator', () => {
    test('renders Fake Address Generator component', () => {
        render(<FakeAddressGenerator />);
        expect(screen.getByText('Fake Address Generator')).toBeInTheDocument();
    });

    test('adds, updates, and deletes an address', () => {
        render(<FakeAddressGenerator />);

        for (let i = 0; i < 5; i++) {
            fireEvent.click(screen.getAllByText('Delete')[0]);
        }

        expect(screen.queryByText('Update')).not.toBeInTheDocument();


        fireEvent.click(screen.getByText('Add Address'));

        const streetInput = screen.getByLabelText('Street:');
        const cityInput = screen.getByLabelText('City:');
        const zipCodeInput = screen.getByLabelText('Zip Code:');
        fireEvent.change(streetInput, { target: { value: '123 Main St' } });
        fireEvent.change(cityInput, { target: { value: 'Springfield' } });
        fireEvent.change(zipCodeInput, { target: { value: '123456' } });
        fireEvent.click(screen.getByText('Save Address'));

        const updateButton = screen.getByText('Update');
        fireEvent.click(updateButton);


        fireEvent.change(screen.getByLabelText('Street:'), { target: { value: 'Updated Main St' } });
        fireEvent.change(screen.getByLabelText('City:'), { target: { value: 'Updated City' } });
        fireEvent.click(screen.getByText('Save'));

        expect(screen.getByText(/Updated Main St/)).toBeInTheDocument();
        expect(screen.getByText(/Updated City/)).toBeInTheDocument();

        fireEvent.click(screen.getByText('Delete'));

        expect(screen.queryByText('Delete')).not.toBeInTheDocument();
    });
});
