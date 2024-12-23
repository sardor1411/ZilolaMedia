import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { db1 } from "../firebase/firebase.jsx";
import { BsSearch } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

// SearchByDate component
const SearchByDate = ({ setSearchResults }) => {
    const [searchDate, setSearchDate] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchDate) {
            try {
                const q = query(
                    collection(db1, 'blogs'),
                    where('firstData', '==', searchDate)
                );

                const querySnapshot = await getDocs(q);
                const searchResults = [];
                querySnapshot.forEach((doc) => {
                    searchResults.push({ ...doc.data(), id: doc.id });
                });

                setSearchResults(searchResults);
            } catch (error) {
                console.error("Search error:", error);
            }
        }
    };

    const handleClearResults = () => {
        setSearchResults([]);
        setSearchDate('');
    };

    return (
        <div className="w-[90%] m-auto h-[50px] mt-[100px]">
            <form className="flex justify-between h-[48px] gap-2" onSubmit={handleSearch}>
                <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="searchDate"
                    name="searchDate"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />
                <button type="submit" className="w-[50px] h-[100%] flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white rounded-md transition duration-300">
                    <BsSearch />
                </button>
                <button type="button" onClick={handleClearResults} className="w-[50px] h-[100%] flex justify-center items-center bg-red-500 hover:bg-red-700 text-white rounded-md transition duration-300">
                    <IoClose />
                </button>
            </form>
        </div>

    );
};

// Home component
const Home = () => {
    const [box, setBox] = useState([]);
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

    const toggleList = (id) => {
        const list = document.getElementById(id);
        list.classList.toggle('max-h-48');
        list.classList.toggle('expanded');
        const button = document.getElementById(`button-${id}`);
        button.classList.toggle('transform');
        button.classList.toggle('rotate-180');
    };

    return (
        <>
            <SearchByDate setSearchResults={setSearchResults} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-[50px]">
                {searchResults.length > 0 ? (
                    searchResults.map((mall) => (
                        <div className="flex justify-center items-center  h-[400px] " key={mall.id}>
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden w-80 text-center transition-transform transform hover:-translate-y-1">
                                <img src={mall.img} alt="Image" className="w-full h-44 object-cover" />
                                <div className="p-5">
                                    <p className="text-gray-500 text-sm">{mall.firstData}</p>
                                    <h2 className="my-2 text-2xl font-bold text-gray-800">{mall.title}</h2>
                                    <div className="text-left">


                                    </div>
                                    <p className="text-gray-700 text-sm">Montaj bajarilganmi : <span className="text-green-500 font-bold">{mall.montaj}</span></p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    box.map((mall) => (
                        <div className="flex justify-center items-center  h-[400px] " key={mall.id}>
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden w-80 text-center transition-transform transform hover:-translate-y-1">
                                <img src={mall.img} alt="Image" className="w-full h-44 object-cover" />
                                <div className="p-5">
                                    <p className="text-gray-500 text-sm">{mall.firstData}</p>
                                    <h2 className="my-2 text-2xl font-bold text-gray-800">{mall.title}</h2>
                                    <button
                                        type="button"
                                        onClick={() => window.location.href = `tel:+998${mall.number}`} // Telefon raqamiga o'tish
                                        className="mb-3 text-sm font-medium px-4 py-2 rounded-lg  text-black shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
                                    >
                                        📞 Call: +998{mall.number}
                                    </button>

                                    <div className="flex justify-between items-center cursor-pointer mb-2 border" onClick={() => toggleComment(mall.id)}>
                                        <div className="w-[90%] m-auto mt-4">
                                            <textarea
                                                value={mall.comment} // `mall.comment` ni to'g'ri ishlatish
                                                onChange={(e) => handleCommentChange(e, mall.id)} // Foydalanuvchi izohni o'zgartirishi uchun
                                                className="w-full h-[100px] p-2 text-[16px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform resize-none"
                                                placeholder="Izoh"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="text-left">


                                    </div>
                                    <p className="text-gray-700 text-sm">Montaj bajarilganmi : <span className="text-green-500 font-bold">{mall.montaj}</span></p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default Home;