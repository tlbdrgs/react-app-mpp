import React, { useState } from 'react';
import AddressCard from './AddressCard';
import { fakerRO } from '@faker-js/faker';

function FakeAddressGenerator() {
    const [addresses, setAddresses] = useState([]);
    const [formData, setFormData] = useState(null);
    const [zipCodeError, setZipCodeError] = useState('');

    const generateFakeAddress = () => {
        return {
            street: fakerRO.location.streetAddress(),
            city: fakerRO.location.city(),
            zipCode: fakerRO.location.zipCode(),
            country: 'Romania',
            randNumber: Math.random()*10
        };
    };

    const handleSaveAddress = () => {
        if (formData) {
            if (/^\d{6}$/.test(formData.zipCode)) {
                setAddresses(prevAddresses => [...prevAddresses, formData]);
                setFormData(null);
                setZipCodeError('');
            } else {
                setZipCodeError('Zip code should be exactly 6 numbers.');
            }
        }
    };

    const handleDelete = (index) => {
        setAddresses(prevAddresses => prevAddresses.filter((_, i) => i !== index));
    };

    const handleUpdate = (index, updatedAddress) => {
        setAddresses(prevAddresses => {
            const updatedAddresses = [...prevAddresses];
            updatedAddresses[index] = updatedAddress;
            return updatedAddresses;
        });
    };

    const handleAddAddress = () => {
        setFormData({
            street: '',
            city: '',
            zipCode: '',
            country: 'Romania',
            randNumber: 0
        });
    };

    const handleSort = () => {
        const sortedAddresses = [...addresses].sort((a, b) => a.city.localeCompare(b.city));
        setAddresses(sortedAddresses);
    };

    const fakeAddresses = Array.from({ length: 5 }, generateFakeAddress);
    useState(() => {
        setAddresses(fakeAddresses);
    }, []);

    return (
        <div>
            <div className="App-header">
                <h1>Fake Address Generator</h1>
            </div>
            <h2>Fake Addresses</h2>
            <div className="sort-button">
                <button className="buttonOrange" onClick={handleSort}>Sort by City</button>
            </div>
            <div className="address-grid" >
                {formData && (
                    <div className="address-card">
                    <h3>Add New Address</h3>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        handleSaveAddress();
                    }}>
                        <label style={{ display: 'block' }}>
                            Street:
                            <input type="text" name="street" value={formData.street} onChange={(event) => setFormData(prevData => ({ ...prevData, street: event.target.value }))} required />
                        </label>
                        <label style={{ display: 'block' }}>
                            City:
                            <input type="text" name="city" data-testid="address" value={formData.city} onChange={(event) => setFormData(prevData => ({ ...prevData, city: event.target.value }))} required />
                        </label>
                        <label style={{ display: 'block' }}>
                            Zip Code:
                            <input type="text" name="zipCode" value={formData.zipCode} onChange={(event) => setFormData(prevData => ({ ...prevData, zipCode: event.target.value }))} required />
                            {zipCodeError && <span className="error">{zipCodeError}</span>}
                        </label>
                        <label>
                            Random Number:
                            <input type="number" step="0.01" name="randnumber" value={formData.randNumber} onChange={(event) => setFormData(prevData => ({ ...prevData, randNumber: parseFloat(event.target.value) }))} required />
                        </label>
                        <button type="submit">Save Address</button>
                    </form>
                </div>
                )}
                {addresses.map((address, index) => (
                    <AddressCard
                        key={index}
                        index={index}
                        address={address}
                        onUpdate={(updatedAddress) => handleUpdate(index, updatedAddress)}
                        onDelete={() => handleDelete(index)}
                    />
                ))}
            </div>
            <div className="add-address-button-container">
                <button className="buttonBlue" onClick={handleAddAddress}>Add Address</button>
            </div>
        </div>
    );
}

// Bar chart random number
// paginare
export default FakeAddressGenerator;