import React, { useState, useEffect } from 'react'
import "./App.css"
import axios from "axios"
import { AiOutlinePrinter, AiFillStepBackward, AiFillStepForward } from "react-icons/ai"

import { IoCaretForwardOutline, IoCaretBackOutline } from "react-icons/io5";
import * as qz from 'qz-tray';
import PrinterPopup from './printerPopup';
function Customer() {
    const url = "http://localhost:8080"
    // const url = "https://carton-print.herokuapp.com"
    const [data, setData] = useState([])
    const [PrinterNames, setPrinterNames] = useState([])
    const [showTrackModal, setShowTrackModal] = useState(false)
    const [finalselectedprinter, setfinalselectedprinter] = useState("")

    // pagination
    const [currentPage, setcurrentPage] = useState(1)
    const [postsPerPage, setpostsPerPage] = useState(10)
    const [currentdata, setcurrentdata] = useState()
    const [F, setF] = useState()

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const last = Math.ceil(data.length / postsPerPage)
    const initilizeData = () => {
        setcurrentdata(data.slice(indexOfFirstPost, indexOfLastPost))
    }


    const search = (e) => {
        e.preventDefault()

        if (F) {

            setData(
                data.filter((dat) => (
                    JSON.stringify(dat.Order_No).includes(F) || JSON.stringify(dat.ContLP_No).includes(F)
                ))
            )
            setcurrentdata(data.slice(indexOfFirstPost, indexOfLastPost))
            setcurrentPage(1)
        }
    }

    const setnext = () => {
        if (currentPage < last) {

            setcurrentPage(currentPage + 1)
        }
    }
    const setprev = () => {
        if (currentPage > 1) {

            setcurrentPage(currentPage - 1)
        }
    }
    const setfirst = () => {
        setcurrentPage(1)
    }
    const setlast = () => {
        setcurrentPage(last)

    }


    const getData = async () => {
        try {
            const res = await axios.get(`${url}/get`)
            // console.log("res", res.data)
            setData(res?.data)
        }
        catch (e) {
            console.log(e)
        }
    }


    // file uploading code

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const submitFile = async (e) => {
        e.preventDefault()
        console.log("file", selectedFile)
        const formData = new FormData()
        formData.append('file', selectedFile)

        try {
            const res = await axios.post(`${url}/upload`, formData)
            console.log(res)
        }
        catch (e) {
            console.log(e)
        }
    }



    useEffect(() => {
        initilizeData()
    }, [data, currentPage])

    useEffect(() => {
        getData()
    }, [])


    const header = [
        {
            headerName: 'Order_No',
            field: 'Order_No'
        },
        {
            headerName: 'ContLP_No',
            field: 'ContLP_No'
        },
        {
            headerName: 'CONS_ID',
            field: 'CONS_ID'
        },
        {
            headerName: 'SEQ_NO',
            field: 'SEQ_NO'
        },
        {
            headerName: 'total_Carton',
            field: 'total_Carton'
        },
        {
            headerName: 'Coruier',
            field: 'Coruier'
        },
        {
            headerName: 'Pck_Weight_in_KG',
            field: 'Pck_Weight_in_KG'
        },
        {
            headerName: 'Mode',
            field: 'Mode'
        },
        {
            headerName: 'Pin_Code',
            field: 'Pin_Code'
        },
        {
            headerName: 'print',
            field: '',
            onRender: (q) => {
                return (
                    <div>

                        <AiOutlinePrinter className='cursor-pointer'
                            onClick={
                                () => {
                                    qz.websocket.connect().then(function () {
                                        console.log(qz.printers.find(finalselectedprinter))
                                        return qz.printers.find(finalselectedprinter);              // Pass the printer name into the next Promise
                                    }).then(function (printer) {
                                        var config = qz.configs.create(printer);       // Create a default config for the found printer
                                        // var data = [`"^XA^CFf0,10,10^PR12^LRY^MD30^PW406^LL609^PON^FO5,5^FDMARUTI SUZUKI INDIA^FS^FO20,39^FDSEQ NO: ${q.SEQ_NO}^FS^FO22,81^FDDDL ${q.CONS_ID}^FS^FO23,123^FD1^FS^FO30,157^BY${q.Order_No}^B3N,N,63N,N^FD${q.ContLP_No}^FS^FO-1,314^GB0,5,400^FS^FO30,226^FDA^FS^FO5,277^FDMH^FS^FO50,276^FD10/AUG/2021^FS^FO274,276^FDR:6-A21^FS^FO6,326^FD ${q.Coruier} KWE^FS^FO249,328^FD${q.Mode}^FS^FO72,364^BY1^B3N,N,55N,N^FD4549588180000000000^FS^FO96,423^FD454958827^FS^FO10,426^FDPkgNo:^FS^FO9,457^FDORG:^FS^FO66,452^FDGGN^FS^FO206,459^FDDEST:^FS^FO268,450^FDCCU^FS^FO82,479^BY1^B3N,N,55N,N^FD18331038800000-0001^FS^FO9,541^FDDkt No:^FS^FO124,537^FDdkt no^FS^FO21,586^FDPowered by eShipz.com^FS^FO260,566^FD 1 of ${q.total_Carton} ^FS^PQ1^XZ "`];   // Raw ZPL
                                        var data = [`^XA^CFf0,10,10^PR12^LRY^MD30^PW406^LL609^PON^FO50,5^FDMARUTI SUZUKI INDIA^FS^FO20,39^FDSEQ NO:${q.SEQ_NO}^FS^FO22,81^FDDDL ${q.CONS_ID}^FS^FO23,123^FD${q.Order_No}^FS^FO30,157^BY1^B3N,N,63N,N^FD${q.ContLP_No}^FS^FO10,314^FS^FO30,226^FD${q.ContLP_No}^FS^FO5,277^FDMH^FS^FO50,276^FD10/AUG/2021^FS^FO274,276^FDR:6-A21^FS^FO6,326^FD${q.Coruier}^FS^FO249,328^FD${q.Mode}^FS^FO35,380^BY1^B3N,N,55N,N^FD${q.awbs}^FS^FO10,450^FDDkt No: ^FS^FO124,450^FD${q.awbs}^FS^FO9, 500^FDORG:---^FS^FO206,500^FDDEST: --- ^FS^FO35,530^BY1^B3N,N,55N,N^FD${q.package_numbers}^FS^FO9,600^FDPkg No:^FS^FO124,600^FD${q.package_numbers}^FS^FO21,650^FDPowered by eShipz.com^FS^FO260,690^FD 1 of ${q.total_Carton}^FS^PQ1^XZ`]
                                        console.log(data)
                                        return qz.print(config, data);
                                    }).catch(function (e) { console.error(e); });
                                }

                            }

                        />
                    </div>
                )
            }
        }

    ]
    const initilizePrinter = () => {
        if (!qz.websocket.isActive()) {
            console.log(qz.websocket)
            qz.websocket.connect().then(() => {
                findPrinters();
            }).catch(function (e) { console.error(e); })
        }
        else {
            findPrinters();
        }
    }
    const findPrinters = () => {
        qz.printers.find().then((printerdata) => {

            setPrinterNames(printerdata)
            PrinterNames && setShowTrackModal(true)
            if (PrinterNames) {
                qz.websocket.disconnect()
            }

        })
    }
    const Printer = (data) => {
        setfinalselectedprinter(data)
        console.log("final selected printer:", finalselectedprinter)
    }

    const allocate = async () => {
        try {
            const res = await axios.post(`${url}/allocate`)
            console.log(res)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            {/* {<PrinterPopup handleClose={() => setShowTrackModal(false)} showTrackModal={showTrackModal} data={PrinterNames} selectedPrinter={Printer} />} */}




            {showTrackModal && <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 ">

                <div className="bg-white px-10 rounded-md text-center">
                    <div className="flex justify-between ">
                        <div>
                            Printer Selection
                        </div>
                        <div>

                            <span className="cursor-pointer" onClick={() => setShowTrackModal(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 50 50" width="18px" height="18px"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" /></svg>
                            </span>
                        </div>
                    </div>
                    {
                        PrinterNames?.map((i) => (
                            <h1 onClick={() => { setfinalselectedprinter(i); setShowTrackModal(false) }} key={i}
                                className='cursor-pointer p-2 border-b hover:bg-gray-500'>{i}</h1>
                        ))
                    }
                </div>
            </div>}
            <div className='mx-4 mt-2 '>

                <div className=' '>
                    <form >
                        <div className='flex '>


                            <div className='flex justify-center items-center w-full '>
                                <input className="w-full border-b border-gray-300  outline-none  text-lg   " type="text"
                                    placeholder="Filter data here"
                                    onChange={(e) => { setF(e.target.value) }}
                                />
                            </div>
                            <div className="flex justify-center items-center ">
                                <button onClick={search} type="submit" className=" rounded-full bg-gray-500 py-2 px-10  text-white "  >
                                    search
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
                <div className='flex justify-between pt-10'>
                    <div>

                        <form className='flex  items-center'>
                            <div className=' '>

                                <input type="file" name="uploadfile" onChange={changeHandler} />
                            </div>
                            <div className=" rounded-full bg-gray-500 py-2 px-6  text-white ">
                                <button onClick={submitFile}>Upload File</button>
                            </div>
                        </form>
                    </div>

                    <div>
                        <div className=" rounded-full bg-gray-500 py-2 px-6  text-white ">
                            <button onClick={allocate} >Allocate</button>
                        </div>
                    </div>

                    <div className='cursor-pointer' onClick={initilizePrinter}>
                        <h1 className='rounded-full bg-gray-500 py-2 px-10  text-white '>Initilize your printer here</h1>
                    </div>

                </div>





                <div className='w-full shadow-2xl mt-6' >
                    <table className="w-full  ">
                        <thead>
                            <tr>
                                {
                                    header.map((i, index) => (

                                        <th className=' border ' key={index}>
                                            <div className='flex justify-center items-center'>

                                                {i.headerName}
                                            </div>
                                        </th>

                                    ))
                                }
                            </tr>
                        </thead>
                        {currentdata?.map((q, index) => (
                            <tbody key={index}>
                                <tr className='border'>
                                    {
                                        header.map((w, index) => (
                                            <td className=' border 4' key={index}>
                                                <div className='flex justify-center'>

                                                    {(w.field) ? q[w.field] : w.onRender(q)}

                                                </div>

                                            </td>
                                        ))
                                    }
                                </tr>
                            </tbody>
                        ))}
                    </table>


                    <div>
                        <div className='h-16 flex justify-end items-center'>
                            <div>
                                <h6>showing {currentPage} of {last}</h6>
                            </div>
                            <div className='flex justify-end items-center ml-4'>

                                <AiFillStepBackward size="1.5rem" className="cursor-pointer" onClick={setfirst} />
                                <IoCaretBackOutline size="1.5rem" className="cursor-pointer" onClick={setprev} />
                                <span> {currentPage} </span>
                                <IoCaretForwardOutline size="1.5rem" className="cursor-pointer" onClick={setnext} />
                                <AiFillStepForward size="1.5rem" className="cursor-pointer" onClick={setlast} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>


    )
}

export default Customer
