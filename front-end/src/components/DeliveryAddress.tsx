import React, { useEffect, useState } from "react";
import { A } from "vitest/dist/reporters-MmQN-57K.js";




export type Address = {
    country: string;
    city: string;
    continent: string;
    addressLine1: string;
    image: string;
};

interface DeliveryAddressProps {
    onAddressSelected: (address: Address) => void;
    onAddressPicked: () => void;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ onAddressSelected, onAddressPicked}) => {
    const [preDefinedAddresses, setPreDefinedAddresses] = useState<Address[]>([]);
    const [addressesData, setDeliveryData] = useState<Address[]>([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(null);

    
    useEffect(() => {
        fetch('http://localhost:5000/get_delivery/')
            .then(response => response.json())
            .then(data => {
                // Set Delivery Data
                setDeliveryData(data.map((address : Address) => ({
                    ...address,
                    // If there's additional processing or modifications to each address, you can add them here
                })));
    
                // Set Predefined Addresses
                setPreDefinedAddresses(data);
    
                // Call the callback with the initial address if available
                if (data.length > 0) {
                    onAddressSelected(data[0]);
                }
            })
            .catch(error => console.error(error));
    }, [onAddressSelected]);

    const handleButtonClick =  (index: number) => {
        onAddressSelected(preDefinedAddresses[index]);
        setSelectedAddressIndex(index);
        onAddressPicked();
    };



    return (
        <div>
            <label className="address-label">Select Delivery Address:</label>
            <div className={"select-delivery-address"}>
                <div className="box-container">
                    {preDefinedAddresses.map((address, index) => (
                        <button key={index} className={`box1 ${index === selectedAddressIndex ? 'selected' : ''}`} onClick={() => handleButtonClick(index)}>
                            <div>
                                <img className="box-image" src={address.image}
                                     alt={`${address.city}, ${address.country}`}/>
                            </div>
                            <div>
                                {address.city}, {address.country}
                            </div>
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default DeliveryAddress;