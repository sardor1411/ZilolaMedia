import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { db1 } from "../firebase/firebase.jsx";
import { BsSearch } from "react-icons/bs";
import { notification } from 'antd';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { v4 as uuid } from "uuid";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { IoClose, IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";



const CreateData = () => {
    const [box, setBox] = useState([]);
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [img, setImg] = useState(null);
    const [imgUrl, setImgUrl] = useState('');
    const [id, setId] = useState('');
    const [montaj, setMontaj] = useState('');
    const [firstData, setFirstData] = useState('');
    const [bekzod, setBekzod] = useState('');
    const [siroj, setSiroj] = useState('');
    const [murod, setMurod] = useState('');

    const [zafar, setZafar] = useState('');
    const [abror, setAbror] = useState('');
    const [vohid, setVohid] = useState('');
    const [otabek, setOtabek] = useState('');
    const [asror, setAsror] = useState('');
    const [atham, setAtham] = useState('');
    const [elyor, setElyor] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [showMontaj, setShowMontaj] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [bekzodChecked, setBekzodChecked] = useState(false);
    const [sirojChecked, setSirojChecked] = useState(false);
    const [murodChecked, setMurodChecked] = useState(false);
    const [zafarChecked, setZafarChecked] = useState(false);
    const [abrorChecked, setAbrorChecked] = useState(false);
    const [vohidChecked, setVohidChecked] = useState(false);
    const [otabekChecked, setOtabekChecked] = useState(false);
    const [asrorChecked, setAsrorChecked] = useState(false);
    const [athamChecked, setAthamChecked] = useState(false);
    const [elyorChecked, setElyorChecked] = useState(false);
    const navigate = useNavigate()

    const data = collection(db1, 'blogs');
    const storage = getStorage();


    useEffect(() => {
        const unsubscribe = onSnapshot(data, (snapshot) => {
            const malumot = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setBox(malumot);
        });

        return () => unsubscribe();
    }, []);
    const montajchilarchecked = bekzodChecked || sirojChecked || murodChecked;
    const operatorschecked = zafarChecked || abrorChecked || vohidChecked || otabekChecked || asrorChecked || athamChecked || elyorChecked

    const handleCreate = async (e) => {
        e.preventDefault();
        setShowForm(false);
        if (title === "" || img === null || montaj === "" || firstData === "" || !montajchilarchecked || !operatorschecked) {
            return notification.error({
                message: "Input bo'sh",
                description: "Malumot to'liq kiritilmagan"
            });
        }

        try {
            const imgRef = ref(storage, `images/${img.name}-${uuid()}`);
            const uploadTask = uploadBytesResumable(imgRef, img);

            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => {
                    notification.error({
                        message: "Rasm yuklanmadi",
                        description: error.message
                    });
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    const bekzodName = bekzodChecked ? 'Bekzod' : '';
                    const sirojName = sirojChecked ? 'Siroj' : '';
                    const murodName = murodChecked ? 'Murod' : '';
                    const zafarName = zafarChecked ? 'Zafar' : '';
                    const abrorName = abrorChecked ? 'Abror' : '';
                    const vohidName = vohidChecked ? 'Vohid' : '';
                    const otabekName = otabekChecked ? 'Otabek' : '';
                    const asrorName = asrorChecked ? 'Asror' : '';
                    const athamName = athamChecked ? 'Atham' : '';
                    const elyorName = elyorChecked ? 'Elyor' : '';

                    await addDoc(data, {
                        title,
                        descript: des,
                        img: downloadURL,
                        id: uuid(),
                        montaj,
                        firstData,
                        bekzod: bekzodName,
                        siroj: sirojName,
                        murod: murodName,
                        zafar: zafarName,
                        abror: abrorName,
                        vohid: vohidName,
                        otabek: otabekName,
                        asror: asrorName,
                        atham: athamName,
                        elyor: elyorName,
                    });

                    notification.success({
                        message: "Ma'lumot kiritildi",
                        description: "Sizning barcha ma'lumotlaringiz kiritildi"
                    });

                    resetForm();
                    await navigate('/dashboard');
                }
            );
        } catch (error) {
            console.error("Error uploading image:", error);
            notification.error({
                message: "Rasm yuklanmadi",
                description: error.message
            });
        }
    };



    const handleDelete = async (id) => {
        const deletePost = doc(db1, 'blogs', id);
        await deleteDoc(deletePost);
        console.log(`Deleted post with id: ${id}`);
    };


    const handleMontaj = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db1, 'montaj'), {
                bekzod,
                siroj,
                murod,
                zafar,
                abror,
                vohid,
                otabek,
                asror,
                atham,
                elyor
            });
            notification.success({
                message: "Montaj muvaffaqiyatli yuborildi",
                description: "Succes"
            });
            setShowMontaj(false);
        } catch (error) {
            console.error("Error sending montaj data:", error);
            notification.error({
                message: "Xatolik",
                description: "Montaj ma'lumotlarini yuborishda xatolik yuz berdi"
            });
        }
    };

    const resetForm = () => {
        setTitle("");
        setDes("");
        setImg(null);
        setImgUrl('');
        setMontaj("");
        setFirstData("");
        setBekzod("");
        setSiroj("");
        setMurod("");
        setZafar("");
        setAbror("");
        setVohid("");
        setOtabek("");
        setAsror("");
        setAtham("");
        setElyor("");
        setShowForm(false);
        setBekzodChecked(false);
        setSirojChecked(false);
        setMurodChecked(false);
        navigate('/createdata');

    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImg(e.target.files[0]);
        }
    };

    const handleBekzodChange = (e) => {
        setBekzodChecked(e.target.checked);
    };

    const handleSirojChange = (e) => {
        setSirojChecked(e.target.checked);
    };

    const handleMurodChange = (e) => {
        setMurodChecked(e.target.checked);
    };

    const handleZafarChange = (e) => {
        setZafarChecked(e.target.checked);
    };

    const handleAbrorChange = (e) => {
        setAbrorChecked(e.target.checked);
    };

    const handleVohidChange = (e) => {
        setVohidChecked(e.target.checked);
    };

    const handleOtabekChange = (e) => {
        setOtabekChecked(e.target.checked);
    };

    const handleAsrorChange = (e) => {
        setAsrorChecked(e.target.checked);
    };

    const handleAthamChange = (e) => {
        setAthamChecked(e.target.checked);
    };
    const handleElyorChange = (e) => {
        setElyorChecked(e.target.checked);
    };

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const data = collection(db1, 'blogs');
        const unsubscribe = onSnapshot(data, (snapshot) => {
            const malumot = [];
            snapshot.docs.forEach((doc) => {
                malumot.push({ ...doc.data(), id: doc.id });
            });
            setBox(malumot);
        });

        return () => unsubscribe();
    }, []);

    const handleTextareaChange = (e, id) => {
        const newBox = box.map(item => {
            if (item.id === id) {
                return { ...item, descript: e.target.value };
            }
            return item;
        });
        setBox(newBox);
    };
    const [openMontaj, setopenMontaj] = useState({});
    const [openVideo, setopenVideo] = useState({});


    const toggleMontaj = (id) => {
        setopenMontaj((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };
    const toggleVideo = (id) => {
        setopenVideo((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleDashboard = () => {
        navigate('/dashboard');
    };

    const handleEdit = (id, title, descript, img, montaj, firstData, bekzod, siroj, murod) => {
        setId(id);
        setTitle(title);
        setDes(descript);
        setImgUrl(img);
        setMontaj(montaj);
        setFirstData(firstData);
        setBekzod(bekzod);
        setSiroj(siroj);
        setMurod(murod)
        setZafar(zafar);
        setAbror(abror);
        setVohid(vohid);
        setOtabek(otabek);
        setAsror(asror);
        setAtham(atham);
        setElyor(elyor);
        setIsUpdate(true);
        setShowForm(true);
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updateData = doc(db1, 'blogs', id);
        const bekzodName = bekzodChecked ? 'Bekzod' : '';
        const sirojName = sirojChecked ? 'Siroj' : '';
        const murodName = murodChecked ? 'Murod' : '';
        const zafarName = zafarChecked ? 'Zafar' : '';
        const abrorName = abrorChecked ? 'Abror' : '';
        const vohidName = vohidChecked ? 'Vohid' : '';
        const otabekName = otabekChecked ? 'Otabek' : '';
        const asrorName = asrorChecked ? 'Asror' : '';
        const athamName = athamChecked ? 'Atham' : '';
        const elyorName = elyorChecked ? 'Elyor' : '';
        setShowForm(false)



        await updateDoc(updateData, {
            title,
            img: imgUrl,
            montaj,
            firstData,
            bekzod: bekzodName,
            siroj: sirojName,
            murod: murodName,
            zafar: zafarName,
            abror: abrorName,
            vohid: vohidName,
            otabek: otabekName,
            asror: asrorName,
            atham: athamName,
            elyor: elyorName,
        });
        setShowForm(false);
        setIsUpdate(false);
        resetForm();
    };

    return (
        <div className="fixed inset-0 overflow-hidden mt-[100px] p-4 backdrop-blur-md bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="relative bg-white p-6 rounded-lg shadow-xl h-full w-full flex flex-col justify-between border border-gray-300">
            <div className="flex justify-between">
                <h2 className="text-3xl mb-4 font-bold text-center text-black">Create New Post</h2>
                <button className="w-[50px] text-[25px] flex items-center justify-center" onClick={handleDashboard}>
                    <IoCloseSharp />
                </button>
            </div>
            <br />
            <form onSubmit={isUpdate ? handleUpdate : handleCreate} className="flex flex-col h-full">
                <div className="flex-grow">
                    <div className="w-full border flex flex-col md:flex-row justify-between">
                        <div className="md:w-[60%] w-full">
                            <label htmlFor="date">
                                <h1 className="mb-[10px] text-xl font-semibold text-black">Vaqtni kiriting</h1>
                                <input
                                    id="date"
                                    type="date"
                                    className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-600"
                                    value={firstData}
                                    onChange={(e) => setFirstData(e.target.value)}
                                />
                            </label>
                            <input
                                type="text"
                                placeholder="To'y Xona"
                                className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-600"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <input
                                type="file"
                                className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-600"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="md:w-[30%] w-full mt-4 md:mt-0">
                            <h1 className="text-black text-[20px] mb-[10px] font-semibold border-b border-gray-300 pb-2">Montaj qilinganmi?</h1>
                            <div className="flex mb-[15px]">
                                <label htmlFor="ha" className="flex text-black">
                                    Bajarildi
                                    <input
                                        type="radio"
                                        id="ha"
                                        name="montaj"
                                        value="Bajarildi"
                                        checked={montaj === 'Bajarildi'}
                                        onChange={(e) => setMontaj(e.target.value)}
                                        className="ml-2"
                                    />
                                </label>
                                <label htmlFor="yo'q" className="ml-5 flex text-black">
                                    Bajartilmadi
                                    <input
                                        type="radio"
                                        id="yo'q"
                                        name="montaj"
                                        value="Bajartilmadi"
                                        checked={montaj === 'Bajartilmadi'}
                                        onChange={(e) => setMontaj(e.target.value)}
                                        className="ml-2"
                                    />
                                </label>
                            </div>
                            <h1 className="text-black text-[20px] mb-[10px] font-semibold border-b border-gray-300 pb-2">Montajchilar ro'yhati</h1>

                            <div className="flex flex-wrap mb-[15px]">
                                <label htmlFor="bekzod" className="flex text-black mr-5">
                                    Bekzod
                                    <input
                                        type="checkbox"
                                        id="bekzod"
                                        name="bekzod"
                                        checked={bekzodChecked}
                                        onChange={handleBekzodChange}
                                        className="ml-2"
                                    />
                                </label>
                                <label htmlFor="siroj" className="flex text-black mr-5">
                                    Siroj
                                    <input
                                        type="checkbox"
                                        id="siroj"
                                        name="siroj"
                                        checked={sirojChecked}
                                        onChange={handleSirojChange}
                                        className="ml-2"
                                    />
                                </label>
                                <label htmlFor="murod" className="flex text-black mr-5">
                                    Murod
                                    <input
                                        type="checkbox"
                                        id="murod"
                                        name="murod"
                                        checked={murodChecked}
                                        onChange={handleMurodChange}
                                        className="ml-2"
                                    />
                                </label>
                            </div>
                            <h1 className="text-black text-[20px] mb-[10px] font-semibold border-b border-gray-300 pb-2">Video Operator</h1>
                            <div className="flex flex-wrap mb-[15px]">
                                <label htmlFor="zafar" className="flex text-black mr-5">
                                    Zafar
                                    <input
                                        type="checkbox"
                                        id="zafar"
                                        name="zafar"
                                        checked={zafarChecked}
                                        onChange={handleZafarChange}
                                        className="ml-2"
                                    />
                                </label>
                                <label htmlFor="abror" className="flex text-black mr-5">
                                    Abror
                                    <input
                                        type="checkbox"
                                        id="abror"
                                        name="abror"
                                        checked={abrorChecked}
                                        onChange={handleAbrorChange}
                                        className="ml-2"
                                    />
                                </label>
                                <label htmlFor="vohid" className="flex text-black mr-5">
                                    Vohid
                                    <input
                                        type="checkbox"
                                        id="vohid"
                                        name="vohid"
                                        checked={vohidChecked}
                                        onChange={handleVohidChange}
                                        className="ml-2"
                                    />
                                </label>
                                <label htmlFor="otabek" className="flex text-black mr-5">
                                    Otabek
                                    <input
                                        type="checkbox"
                                        id="otabek"
                                        name="otabek"
                                        checked={otabekChecked}
                                        onChange={handleOtabekChange}
                                        className="ml-2"
                                    />
                                </label>
                            </div>
                            <div className="flex flex-wrap mb-[15px]">
                                <label htmlFor="asror" className="flex text-black mr-5">
                                    Asror
                                    <input
                                        type="checkbox"
                                        id="asror"
                                        name="asror"
                                        checked={asrorChecked}
                                        onChange={handleAsrorChange}
                                        className="ml-2"
                                    />
                                </label>
                                <label htmlFor="atham" className="flex text-black mr-5">
                                    Atham
                                    <input
                                        type="checkbox"
                                        id="atham"
                                        name="atham"
                                        checked={athamChecked}
                                        onChange={handleAthamChange}
                                        className="ml-2"
                                    />
                                </label>
                                <label htmlFor="elyor" className="flex text-black mr-5">
                                    Elyor
                                    <input
                                        type="checkbox"
                                        id="elyor"
                                        name="elyor"
                                        checked={elyorChecked}
                                        onChange={handleElyorChange}
                                        className="ml-2"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="mt-4 border bg-gray-300 text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white active:bg-red-500">
                    Yaratish
                </button>
            </form>
        </div>
    </div>

    )
}

export default CreateData;
