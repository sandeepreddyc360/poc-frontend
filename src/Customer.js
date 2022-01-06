import React, { useState, useEffect } from 'react'
import "./App.css"
import axios from "axios"
import { AiOutlinePrinter, AiFillStepBackward, AiFillStepForward } from "react-icons/ai"

import { IoCaretForwardOutline, IoCaretBackOutline } from "react-icons/io5";
import qz from 'qz-tray';
function Customer() {
    const url = "https://carton-print.herokuapp.com"
    const [data, setData] = useState([])

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
            console.log("res", res.data)
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
                            onClick={() => {
                                qz.websocket.connect().then(function () {
                                    return qz.printers.find("Microsoft XPS Document Writer");              // Pass the printer name into the next Promise
                                }).then(function (printer) {
                                    var config = qz.configs.create(printer);       // Create a default config for the found printer
                                    var data = [`^XA^CFf0,10,10^PR12^LRY^MD30^PW406^LL609^PON^FO5,5^FDMARUTI SUZUKI INDIA^FS^FO20,39^FDSEQ NO: ${q.SEQ_NO}^FS^FO22,81^FDDDL ${q.CONS_ID}^FS^FO23,123^FD${q.Order_No}^FS^FO30,157^BY1^B3N,N,63N,N^FD${q.ContLP_No}^FS^FO-1,314^GB0,5,400^FS^FO30,226^FD${q.ContLP_No}^FS^FO5,277^FDMH^FS^FO50,276^FD10/AUG/2021^FS^FO274,276^FDR:6-A21^FS^FO6,326^FDGATI KWE^FS^FO249,328^FD${q.Mode}^FS^FO72,364^BY1^B3N,N,55N,N^FD4549588180000000000^FS^FO96,423^FD454958827^FS^FO10,426^FDPkgNo:^FS^FO9,457^FDORG:^FS^FO66,452^FDGGN^FS^FO206,459^FDDEST:^FS^FO268,450^FDCCU^FS^FO82,479^BY1^B3N,N,55N,N^FD18331038800000-0001^FS^FO9,541^FDDkt No:^FS^FO124,537^FDdkt no^FS^FO21,586^FDPowered by eShipz.com^FS^FO260,566^FD10 of 10^FS^PQ1^XZ `]   // Raw ZPL
                                    console.log(data)
                                    return qz.print(config, data);
                                }).catch(function (e) { console.error(e); });
                            }}
                        />
                    </div>
                )
            }
        }

    ]

    return (
        <>
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
                            {/* <div>
                                <input type="file" />
                            </div> */}
                        </div>
                    </form>
                </div>
                <div >
                    <form className='flex  items-center'>
                        <div className=' '>

                            <input type="file" name="uploadfile" onChange={changeHandler} />
                        </div>
                        <div className=" rounded-full bg-gray-500 py-2 px-6  text-white ">
                            <button onClick={submitFile}>Upload File</button>
                        </div>
                    </form>
                </div>

                <div className='w-full shadow-2xl mt-6' >
                    <table className="w-full  ">
                        <tr>
                            {
                                header.map((i) => (

                                    <th className=' border '>
                                        <div className='flex justify-center items-center'>

                                            {i.headerName}
                                        </div>
                                    </th>

                                ))
                            }
                        </tr>

                        {currentdata?.map((q) => (

                            <tr className='border  '>
                                {
                                    header.map((w) => (
                                        <td className=' border 4'>
                                            <div className='flex justify-center'>

                                                {(w.field) ? q[w.field] : w.onRender(q)}

                                            </div>

                                        </td>
                                    ))
                                }
                            </tr>

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
