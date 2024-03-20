import React, { useState } from 'react';

function AddressCard({ address, onUpdate, onDelete, index }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newAddress, setNewAddress] = useState(address);

    const handleUpdate = () => {
        setIsEditing(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdate(newAddress);
        setIsEditing(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewAddress({ ...newAddress, [name]: value });
    };

    return (
        <div className="address-card">
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Street:
                        <input type="text" name="street" value={newAddress.street} onChange={handleChange} />
                    </label>
                    <label>
                        City:
                        <input type="text" name="city" value={newAddress.city} onChange={handleChange} />
                    </label>
                    <label>
                        Zip Code:
                        <input type="text" name="zipCode" value={newAddress.zipCode} onChange={handleChange} />
                    </label>
                    <label>
                        Country:
                        <input type="text" name="country" value={newAddress.country} readOnly />
                    </label>
                    <button type="submit">Save</button>
                </form>
            ) : (
                <>
                    <strong>Street:</strong> {address.street}<br />
                    <strong>City:</strong> {address.city}<br />
                    <strong>Zip Code:</strong> {address.zipCode}<br />
                    <strong>Country:</strong> {address.country}<br />
                    <button className="update-button" onClick={handleUpdate} data-testid={`update-button-${index}`}>
                        Update
                    </button>
                    <button className="delete-button" onClick={() => onDelete(address)}>Delete</button>
                </>
            )}
        </div>
    );
}

export default AddressCard;