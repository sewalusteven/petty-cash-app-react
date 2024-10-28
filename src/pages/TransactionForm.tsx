import {Link} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import {
    NewTransactionInput
} from "@uniscale-sdk/ActorCharacter-PettyCashManagementSystem/sdk/ProductTeamUniscale/PettyCashService/PettyCashService";
import {Result} from "@uniscale-sdk/ActorCharacter-PettyCashManagementSystem";
import {dispatcher} from "../configs/dispatcher.ts";
import {
    NewTransaction
} from "@uniscale-sdk/ActorCharacter-PettyCashManagementSystem/sdk/ProductTeamUniscale/PettyCashService_1_0/ServiceToModule/PettyCashService/CaptureTransaction";


type messageType =  "success" | "error";
interface messageInfo {
    message: string,
    type: messageType,
    details?: Result
}

const TransactionForm = () => {
    const [isMessage, setIsMessage] =  useState<boolean>(false)
    const [message, setMessage] = useState<messageInfo>({
        message: "",
        type: "success"
    })


    const [formInput, setFormInput] = useState<NewTransactionInput>({
        amount: 0,
        createdAt: new Date(),
        item: "",
        type: "Debit"
    })

    const addAmount = (e:ChangeEvent<HTMLInputElement>) => {
        setFormInput({
            ...formInput,
            amount: parseInt(e.target.value)
        })
    }

    const addCreatedAt = (e:ChangeEvent<HTMLInputElement>) => {
        setFormInput({
            ...formInput,
            createdAt: new Date(e.target.value)
        })
    }

    const addItem = (e:ChangeEvent<HTMLInputElement>) => {
        setFormInput({
            ...formInput,
            item: e.target.value
        })
    }

    const addType = (e:ChangeEvent<HTMLSelectElement>) => {
        setFormInput({
            ...formInput,
            type: e.target.value
        })
    }

    const submit = () => {
        dispatcher.request(NewTransaction.with(formInput)).then(res => {
            setIsMessage(true);
            if(res.success){
                setMessage({
                    message: "Transaction has been added",
                    type: "success",
                    details: res
                })
            }else {
                setMessage({
                    message: "Transaction failed to add",
                    type: "error",
                    details: res
                })
            }

        }).catch(err => {
            setIsMessage(true);
            setMessage({
                message: "Transaction failed to add",
                type: "error",
                details: err
            })
        })

    }



    return (
        <div className="bg-gray-50 w-screen h-screen">
            <div className="bg-blue-500 text-white h-14 shadow flex justify-between p-4 w-full">
                <span className="font-bold">Petty Cash App</span>
                <div className="flex flex-row gap-2 items-center text-sm capitalize">
                    <Link to="/" className="hover:underline"> Home</Link>
                    <Link to="/statement" className="hover:underline"> Statement</Link>
                </div>
            </div>

            <div className="container mx-auto bg-white mt-5 rounded shadow">
                <div className="flex flex-col gap-2">
                    <div className="p-3">
                        <span className="font-bold uppercase"> Input Transaction</span>
                    </div>

                    <div className="border w-full "></div>

                    <div className="min-h-40 flex flex-col gap-2 p-3">

                        { isMessage && (<div
                            className={isMessage ? (message.type === 'success' ? 'text-green-700' : 'text-red-700') : ''}>
                            {isMessage && <p>{message.message}</p>}
                        </div>) }

                        <div className="flex flex-col gap-2">
                            <label>Amount</label>
                            <input type="number" onChange={addAmount} id="amount" className="border  p-1"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Date</label>
                            <input type="date" onChange={addCreatedAt} id="date" className="border  p-1"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>Description</label>
                            <input type="text" id="description" onChange={addItem} className="border p-1"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>Type</label>
                            <select onChange={addType} id="type" className="border p-1">
                                <option value="Debit">Debit</option>
                                <option value="Credit">Credit</option>
                            </select>
                        </div>

                        <div className="flex flex-row gap-2">
                            <button onClick={submit} className="bg-blue-500 text-white p-2 rounded">Submit</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default TransactionForm