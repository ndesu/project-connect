import React, { useState } from "react";

export default function CreateSupplyRequest({ orgID }) {
    const apiKey = 'AIzaSyAHfuaC6Xs3ld9E6ref8FKCxulfDaz2RkY'
    const [createRequestData, setCreateRequestData] = useState({
        orgID: orgID,
        itemName: "",
        quantity: "",
        supplyDescription: "",
        address: "",
    })

    function checkFields(dataObj) {
        console.log(dataObj)
        for (let key in dataObj) {
            if (!dataObj.hasOwnProperty(key)) continue;
            if (!dataObj[key]) {
                return false
            };
        }
        return true;
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCreateRequestData({ ...createRequestData, [name]: value })
    }

    const handleCreateRequestSubmit = (e) => {
        e.preventDefault();

        if (!checkFields(createRequestData)) {
            alert("Enter All Information Before Submitting")
        } else {
            fetch("http://localhost:8080", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ type: "createRequest", ...createRequestData }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setCreateRequestData({
                        orgID: orgID,
                        itemName: "",
                        quantity: "",
                        supplyDescription: "",
                        address: "",
                    })
                })
        }
    }

    return (
        <form class="formFields" onSubmit={handleCreateRequestSubmit}>
            <label htmlFor="itemName">Item Name</label>
            <input type="itemName" name="itemName" value={createRequestData.itemName} onChange={handleFormChange} />

            <label htmlFor="quantity">Quantity Needed</label>
            <input type="number" name="quantity" value={createRequestData.quantity} onChange={handleFormChange} />

            <label htmlFor="supplyDescription">Supply Description</label>
            <textarea type="supplyDescription" name="supplyDescription" value={createRequestData.supplyDescription} onChange={handleFormChange} />

            <label htmlFor="address">Full Address</label>
            <input type="address" name="address" value={createRequestData.address} onChange={handleFormChange} />

            <div class="button-wrapper"><button type="submit">Create Supply Request</button></div>
        </form>
    )
}