import React, { useState } from 'react'

const PrinterPopup = ({ handleClose, showTrackModal, data, selectedPrinter }) => {


    const [Printer, setPrinter] = useState()
    // console.log("selected printer:", Printer)
    // console.log("printer data:", data)


    return (showTrackModal ?
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-end">
                            <span className="cursor-pointer" onClick={() => handleClose()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 50 50" width="18px" height="18px"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" /></svg>
                            </span>
                        </div>
                        <div className="sm:flex sm:items-start">

                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">

                                <div className="mt-2">
                                    <p className="text-xl  text-gray-500">
                                        Choose the printer name:
                                    </p>
                                </div>
                                <div>
                                    {
                                        data?.map((i) => (
                                            <h1 onClick={() => selectedPrinter(i)} 
                                                className='cursor-pointer p-2 border-b hover:bg-gray-500'>{i}</h1>
                                        ))
                                    }
                                    <h1></h1>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        : <></>)
}

export default PrinterPopup
