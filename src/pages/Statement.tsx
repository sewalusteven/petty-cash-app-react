import { Link } from "react-router-dom";
import {ChangeEvent,  useState} from "react";
import {dispatcher} from "../configs/dispatcher.ts";

import {
    DateRange,
    TransactionFull
} from "@uniscale-sdk/ActorCharacter-PettyCashManagementSystem/sdk/ProductTeamUniscale/PettyCashService/PettyCashService";
import {
    GetTransactions
} from "@uniscale-sdk/ActorCharacter-PettyCashManagementSystem/sdk/ProductTeamUniscale/PettyCashService_1_0/ServiceToModule/PettyCashService/ViewStatementWithSummary";
const Statement = () => {
    const [transactions, setTransactions] =  useState<TransactionFull[]|undefined>([])

    const [dateRange,setDateRange] = useState<DateRange>({
        startDate: "",
        endDate: ""
    })

    const addStartDate = (e:ChangeEvent<HTMLInputElement>) => {
        setDateRange({
            ...dateRange,
            startDate: new Date(e.target.value).toLocaleDateString()
        })
    }

    const addEndDate = (e:ChangeEvent<HTMLInputElement>) => {
        setDateRange({
            ...dateRange,
            endDate: new Date(e.target.value).toLocaleDateString()
        })
    }


    const submit = () => {
        dispatcher.request(GetTransactions.with(dateRange)).then(res => {
            console.log(res)
            setTransactions(res.value)
        }).catch(err => {
            console.log(err)
        })
    }

    const totalDebit = (): number => {
        return transactions ? transactions.reduce((acc, t) => {
            if(t.type === "Debit" && t.amount){
                return acc + t.amount
            }
            return acc
        }, 0): 0
    }

    const totalCredit = (): number => {
        return transactions ? transactions.reduce((acc, t) => {
            if(t.type === "Credit" && t.amount){
                return acc + t.amount
            }
            return acc
        }, 0): 0
    }

    const remainingBalance = (): number => {
        return   totalCredit() - totalDebit()
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
                    <div className="p-3 flex flex-row justify-between">
                        <span className="font-bold uppercase"> Statement</span>
                        <div className="flex flex-row gap-1 items-center">
                            <span className="capitalize text-xs">Start: </span>
                            <input type="date" onChange={addStartDate} id="start" className="border  p-1 mr-3 text-xs"/>

                            <span className="capitalize text-xs">End: </span>
                            <input type="date" onChange={addEndDate} id="end" className="border  p-1 mr-3 text-xs"/>

                            <button onClick={submit} className="bg-blue-500 text-white p-2 rounded text-xs">Fetch Statement</button>
                        </div>
                    </div>

                    <div className="border w-full "></div>

                    <div className="min-h-40 flex flex-col gap-2 p-3">
                        <div className="border-blue-400 border-2 text-sm w-1/2 flex flex-col gap-2 p-2">
                            <div className="flex flex-row justify-between">
                                <span className="font-bold">Total Debit</span>
                                <span className="italic">{ totalDebit() } UGX</span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="font-bold">Total Credit</span>
                                <span className="italic">{ totalCredit() } UGX</span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="font-bold">Remaining Balance</span>
                                <span className="italic">{remainingBalance()} UGX</span>
                            </div>
                        </div>

                        {
                            transactions && transactions.map((t, i) =>  (
                                <div key={i} className="border border-dashed border-blue-400 rounded grid grid-cols-12 gap-2 text-xs p-3">
                                    <div className="col-span-2 flex flex-col gap-2">
                                        <span className="font-bold">Date</span>
                                        <span className="italic">{t.createdAt && new Date(t.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div className="col-span-2 flex flex-col gap-2">
                                        <span className="font-bold">Type</span>
                                        <span className="italic">{t.type}</span>
                                    </div>
                                    <div className="col-span-4 flex flex-col gap-2">
                                        <span className="font-bold">Narration</span>
                                        <span className="italic">{t.item}</span>
                                    </div>
                                    <div className="col-span-2 flex flex-col gap-2">
                                        <span className="font-bold">Amount</span>
                                        <span className="italic">{t.amount} UGX</span>
                                    </div>
                                </div>
                            ))
                        }


                </div>

            </div>

        </div>
</div>
)

}

export default Statement