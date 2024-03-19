import React, { useState } from 'react';
import AddressCard from './AddressCard';
import {fakerRO} from '@faker-js/faker';


function FakeAddressGenerator()
 {

    const [addresses, setAddresses] = useState([]);
    const [formData, setFormData] = useState(null);
    const [zipCodeError, setZipCodeError] = useState('');

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
    
    const generateFakeAddress = () => {
        return {
            street: fakerRO.address.streetAddress(),
            city: fakerRO.address.city(),
            zipCode: fakerRO.address.zipCode(),
            country: 'Romania'
        };
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
            country: 'Romania'
        });
    };

    useState(() => {
        const fakeAddresses = Array.from({ length: 5 }, generateFakeAddress);
        setAddresses(fakeAddresses);
    }, []);

    return (
        <div>
            <div className="App-header">
                <h1>Fake Address Generator</h1>
            </div>
            <h2>Fake Addresses</h2>
            <div className="address-grid">
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
                                <input type="text" name="city" value={formData.city} onChange={(event) => setFormData(prevData => ({ ...prevData, city: event.target.value }))} required />
                            </label>
                            <label style={{ display: 'block' }}>
                                Zip Code:
                                <input type="text" name="zipCode" value={formData.zipCode} onChange={(event) => setFormData(prevData => ({ ...prevData, zipCode: event.target.value }))} required />
                                {zipCodeError && <span className="error">{zipCodeError}</span>}
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

export default FakeAddressGenerator;