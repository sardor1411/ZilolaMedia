// // import { useState, useEffect } from "react";
// // import { notification } from 'antd';
// // import { IoIosCloseCircleOutline } from "react-icons/io";
// // import { v4 as uuid } from "uuid";
// // import { collection, addDoc, deleteDoc, onSnapshot, updateDoc, doc } from "firebase/firestore";
// // import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// // import { db } from "../firebase";

// // function Bekzod() {
// //     const [box, setBox] = useState([]);
// //     const [montaj, setMontaj] = useState('');
// //     const [id, setId] = useState('');

// //     const [showForm, setShowForm] = useState(false);
// //     const [showMontaj, setShowMontaj] = useState(false);
// //     const [isUpdate, setIsUpdate] = useState(false);

// //     const data = collection(db, 'blogs');
// //     const storage = getStorage();

// //     useEffect(() => {
// //         const unsubscribe = onSnapshot(data, (snapshot) => {
// //             const malumot = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
// //             setBox(malumot);
// //         });

// //         return () => unsubscribe();
// //     }, []);

// //     const handleCreate = async (e) => {
// //         e.preventDefault();
// //         setShowForm(false);
// //         if (title === "" || des === "" || img === null || montaj === "" || firstData === "") {
// //             return notification.error({
// //                 message: "Input bo'sh",
// //                 description: "Malumot to'liq kiritilmagan"
// //             });
// //         }

// //         try {
// //             const imgRef = ref(storage, `images/${img.name}-${uuid()}`);
// //             const uploadTask = uploadBytesResumable(imgRef, img);

// //             uploadTask.on('state_changed',
// //                 (snapshot) => { },
// //                 (error) => {
// //                     notification.error({
// //                         message: "Rasm yuklanmadi",
// //                         description: error.message
// //                     });
// //                 },
// //                 () => {
// //                     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
// //                         await addDoc(data, {
// //                             montaj,
// //                             // Add other fields as needed
// //                         });
// //                         notification.success({
// //                             message: "Ma'lumot kiritildi",
// //                             description: "Sizning barcha ma'lumotlaringiz kiritildi"
// //                         });
// //                         setShowForm(false);
// //                         resetForm();
// //                     });
// //                 }
// //             );
// //         } catch (error) {
// //             console.error("Error uploading image:", error);
// //             notification.error({
// //                 message: "Rasm yuklanmadi",
// //                 description: error.message
// //             });
// //         }
// //     };

// //     const handleDelete = async (id) => {
// //         const deletePost = doc(db, 'blogs', id);
// //         await deleteDoc(deletePost);
// //         console.log(`Deleted post with id: ${id}`);
// //     };

// //     const handleEdit = (id, title, descript, img, montaj, firstData, bekzod, siroj, murod, zafar, abror, vohid, otabek, asror, atham, elyor) => {
// //         setId(id); // Set id in state for use in handleUpdate
// //         setMontaj(montaj);
// //         // ... set other fields as needed
// //         setIsUpdate(true);
// //         setShowForm(true);
// //     };

// //     const handleUpdate = async (e) => {
// //         e.preventDefault();
// //         const updateData = doc(db, 'blogs', id); // Use id from state

// //         try {
// //             await updateDoc(updateData, {
// //                 montaj,
// //                 // Add other fields as needed
// //             });

// //             notification.success({
// //                 message: "Ma'lumot yangilandi",
// //                 description: "Ma'lumotlar muvaffaqiyatli yangilandi"
// //             });

// //             setShowForm(false);
// //             setIsUpdate(false);
// //             resetForm();
// //         } catch (error) {
// //             console.error("Error updating document:", error);
// //             notification.error({
// //                 message: "Ma'lumot yangilashda xatolik",
// //                 description: error.message
// //             });
// //         }
// //     };

// //     const resetForm = () => {
// //         setMontaj("");
// //         // Reset other form fields if needed
// //     };


// //     return (
// //         <>
// //             <div className="">

// //                 {/* Create Data */}
// //                 {showForm && (
// //                     <div className=" overflow-hidden mt-10 p-4 border w-full h-full border-gray-300 rounded-md fixed top-[-40px] left-0 right-0 backdrop-blur-[100px]">
// //                         <button onClick={() => setShowForm(false)} className="text-[30px] absolute top-[20px] left-[95%]">
// //                             <IoIosCloseCircleOutline />
// //                         </button>
// //                         <form onSubmit={isUpdate ? handleUpdate : handleCreate}>
// //                             <div >
// //                                 <div className="w-[40%] border flex justify-between ">





// //                                     <div className="">
// //                                         <h1 className="text-black text-[20px] mb-[10px]">Montaj qilinganmi?</h1>
// //                                         <div className="flex mb-[15px]">
// //                                             <label htmlFor="ha" className="flex text-black">
// //                                                 Bajarildi
// //                                                 <input
// //                                                     type="radio"
// //                                                     id="ha"
// //                                                     name="montaj"
// //                                                     value="Bajarildi"
// //                                                     checked={montaj === 'Bajarildi'}
// //                                                     onChange={(e) => setMontaj(e.target.value)}
// //                                                     className="ml-2"
// //                                                 />
// //                                             </label>
// //                                             <label htmlFor="yo'q" className="ml-5 flex text-black">
// //                                                 Bajartilmadi
// //                                                 <input
// //                                                     type="radio"
// //                                                     id="yo'q"
// //                                                     name="montaj"
// //                                                     value="Bajartilmadi"
// //                                                     checked={montaj === 'Bajartilmadi'}
// //                                                     onChange={(e) => setMontaj(e.target.value)}
// //                                                     className="ml-2"
// //                                                 />
// //                                             </label>
// //                                         </div>


// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
// //                                 {isUpdate ? 'Update' : "Yaratish"}
// //                             </button>
// //                         </form>
// //                     </div>
// //                 )}
// //                 {showMontaj && (
// //                     <div className="overflow-hidden mt-10 p-4 border w-full h-full border-gray-300 rounded-md fixed top-0 left-0 right-0 backdrop-blur-[100px]">
// //                         <button onClick={() => setShowMontaj(false)} className="text-[30px] absolute top-[20px] left-[95%]">
// //                             <IoIosCloseCircleOutline />
// //                         </button>
// //                         <h2 className="text-2xl mb-4 font-[700]">Montaj uchun ma'lumotlar</h2>
// //                         <form onSubmit={handleMontaj}>
// //                             <div>
// //                                 <input
// //                                     type="text"
// //                                     placeholder="Bekzod"
// //                                     className="block w-[25%] p-2 mb-4 border border-gray-300 rounded-md"
// //                                     value={bekzod}
// //                                     onChange={(e) => setBekzod(e.target.value)}
// //                                 />
// //                                 <input
// //                                     type="text"
// //                                     placeholder="Siroj"
// //                                     className="block w-[25%] p-2 mb-4 border border-gray-300 rounded-md"
// //                                     value={siroj}
// //                                     onChange={(e) => setSiroj(e.target.value)}
// //                                 />
// //                             </div>
// //                             <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
// //                                 Yaratish
// //                             </button>
// //                         </form>
// //                     </div>
// //                 )}
// //             </div>

// //             {/* Ekranga chiqarish */}

// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-[50px]">
// //                 {box.map((mall) => (
// //                     <div className="border border-black max-w-full max-h-full text-center m-auto rounded-md h-auto mt-6 shadow-lg" key={mall.id}>
// //                         <div className="box p-4">
// //                             <img className="w-full h-64 object-cover rounded-t-md" src={mall.img} alt={mall.title} />
// //                             <p className="mt-6 mb-4 text-[20px] text-blue-500">Zakaz vaqti: {mall.firstData}</p>
// //                             <p className="mt-6 text-[21px] text-green-600 font-semibold">To'yxona haqida: {mall.title}</p>
// //                             <div className="border rounded-[10px] shadow-inner">
// //                                 <h2 className="text-[18px] mt-[5px] h-auto">Montajchilar ro'yxati:</h2>
// //                                 <p className="text-[18px]">{mall.bekzod}</p>
// //                                 <p className="text-[18px] mb-[5px]">{mall.siroj}</p>
// //                                 <p className="text-[18px] mb-[5px]">{mall.murod}</p>
// //                             </div>
// //                             <div className="border rounded-[10px] shadow-inner mt-[10px]">
// //                                 <h2 className="text-[18px] mt-[5px] h-auto">Video Operator:</h2>
// //                                 <p className="text-[18px]">{mall.zafar}</p>
// //                                 <p className="text-[18px] mb-[5px]">{mall.abror}</p>
// //                                 <p className="text-[18px] mb-[5px]">{mall.vohid}</p>
// //                                 <p className="text-[18px]">{mall.otabek}</p>
// //                                 <p className="text-[18px] mb-[5px]">{mall.asror}</p>
// //                                 <p className="text-[18px] mb-[5px]">{mall.atham}</p>
// //                                 <p className="text-[18px] mb-[5px]">{mall.elyor}</p>
// //                             </div>

// //                             <p className="mt-6 mb-4 text-[22px] text-red-500">To'y xaqida ma'lumot:</p>
// //                             <textarea
// //                                 value={mall.descript}
// //                                 placeholder="Ma'lumotlar"
// //                                 className="block w-[90%] p-2 mb-4 border h-[40px] border-gray-300 rounded-md m-auto"
// //                                 readOnly
// //                             />
// //                             <p className="mt-6 mb-4 text-[23px] text-blue-500"> Montaj bajarilganmi : <span className="text-green-600 font-[600]">{mall.montaj}</span></p>
// //                             <div className="flex justify-evenly">
// //                                 <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleEdit(mall.id, mall.title, mall.descript,
// //                                     mall.img, mall.montaj,
// //                                     mall.firstData, mall.bekzod, mall.siroj,
// //                                     mall.murod, mall.zafar, mall.abror,
// //                                     mall.vohid, mall.otabek, mall.asror,
// //                                     mall.atham, mall.elyor)}>Edit</button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>

// //         </>
// //     );
// // }

// // export default Bekzod



// /////////////////////////////////////////////////////////////////////navbar
// <div className={`nav w-[31%] backdrop-blur-[100px] h-[100%] fixed top-[0px] border   ${navbarOpen ? 'right-[1]' : 'fixed right-[200%]'}`}>
//     <nav>
//         <button className='text-[35px] absolute top-0 left-[80%]' onClick={toggleNavbar}><IoIosCloseCircleOutline /></button>
//         <ul className=' w-[80%] m-auto gap-2 h-[50px] grid items-center justify-center'>
//             <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//                 <NavLink to="/home">Home</NavLink>
//             </li>
//             <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//                 <NavLink to="/blog">Blog</NavLink>
//             </li>
//             {!user && <>
//                 <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//                     <NavLink to="/signin">Sign In</NavLink>
//                 </li>
//             </>}
//             <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//                 <NavLink to="/dashboard">Dashboard</NavLink>
//             </li>
//             <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//                 <NavLink to="/bekzod">Bekzod</NavLink>
//             </li>
//             <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//                 <NavLink to="/userpage">User Page</NavLink>
//             </li>
//             {user && <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//                 <NavLink to="/signin" onClick={handleSignOut}>Sign Out</NavLink>
//             </li>}
//         </ul>
//     </nav>
// </div> 

// ///////////////////////////////////////////////////////////////////////////////////////navnew
// import { Routes, Route, Link, useNavigate, NavLink } from 'react-router-dom';
// import { useState, useContext, useEffect } from 'react';
// import { AuthContext } from './context/AuthContext';
// import SignUp from './page/SignUp';
// import SignIn from './page/SignIn';
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import { IoMenu } from "react-icons/io5";
// import { ProtectRouteAdmin } from './protectedRoutes/ProtectRoutAdmin';
// import { ProtectRouteUser } from './protectedRoutes/ProtectRoutUser';
// import Search from 'antd/es/transfer/search';
// import Home from './page/Home';
// import Blog from './page/Blog';
// import Bekzod from './page/Bekzod';
// import Dashboard from './page/Dashboard';
// import BossAnaliz from './page/BossAnaliz';
// import '../src/index.css'
// import {
//   Collapse,
//   Dropdown,
//   initTWE,
// } from "tw-elements";
// import Workers from './page/Workers';

// function App() {
//   let user = localStorage.getItem('users');
//   const [navbarOpen, setNavbarOpen] = useState(false);
//   const { dispatch } = useContext(AuthContext);
//   const navigate = useNavigate();
//   useEffect(() => {
//     initTWE({ Collapse, Dropdown });
//   }, []);

//   const handleSignOut = () => {
//     localStorage.removeItem('users');
//     navigate('/signin');
//   };



//   return (
//     <>
//       <div className='fixed h-[81px] w-full top-0 bg-white z-[100]'>
//         <nav
//           className="relative top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-[500px] flex-no-wrap items-center py-2 shadow-dark-mild  lg:flex-wrap lg:justify-start lg:py-4 rounded-[50px] bg-[#cccaca] flex w-[90%]">
//           <div className="flex w-full flex-wrap items-center justify-between px-3">
//             <button
//               className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
//               type="button"
//               data-twe-collapse-init
//               data-twe-target="#navbarSupportedContent12"
//               aria-controls="navbarSupportedContent12"
//               aria-expanded="false"
//               aria-label="Toggle navigation">
//               <span
//                 className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor">
//                   <path
//                     fillRule="evenodd"
//                     d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
//                     clipRule="evenodd" />
//                 </svg>
//               </span>
//             </button>

//             <div
//               className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
//               id="navbarSupportedContent12"
//               data-twe-collapse-item>
//               <a
//                 className="mb-4 me-5 ms-2 mt-3 flex items-center lg:mb-0 lg:mt-0"
//                 href="#">
//                 <h1 className='grey-qo-regular'>Zilola Media</h1>
//               </a>
//               <ul
//                 className="list-style-none me-auto flex flex-col ps-0 lg:flex-row"
//                 data-twe-navbar-nav-ref>
//                 <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
//                   <NavLink
//                     to="/home"
//                     className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
//                     href="#"
//                     data-twe-nav-link-ref
//                   >Home</NavLink>
//                 </li>
//                 <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
//                   <NavLink
//                     to="/blog"
//                     className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
//                     href="#"
//                     data-twe-nav-link-ref
//                   >Blog</NavLink>
//                 </li>
//                 <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
//                   <NavLink
//                     to="/signin"
//                     className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
//                     href="#"
//                     data-twe-nav-link-ref
//                   >Sign In</NavLink>
//                 </li>
//                 <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
//                   <NavLink
//                     to="/dashboard"
//                     className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
//                     href="#"
//                     data-twe-nav-link-ref
//                   >Dashboard</NavLink>
//                 </li>
//                 <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
//                   <NavLink
//                     to="/bekzod"
//                     className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
//                     href="#"
//                     data-twe-nav-link-ref
//                   >Bekzod</NavLink>
//                 </li>
//                 <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
//                   <NavLink
//                     to="/workers"
//                     className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
//                     href="#"
//                     data-twe-nav-link-ref
//                   >Workers</NavLink>
//                 </li>
//                 <li className="mb-4 lg:mb-0 lg:pe-2" data-twe-nav-item-ref>
//                   <Link
//                     to='/signin'
//                     onClick={handleSignOut}
//                     className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
//                     href="#"
//                     data-twe-nav-link-ref
//                   >Sign Out</Link>
//                 </li>
//               </ul>
//             </div>

//             <div className="relative flex items-center">


//               <div
//                 className="relative"
//                 data-twe-dropdown-ref
//                 data-twe-dropdown-alignment="end">
//                 <a
//                   className="me-4 flex items-center text-secondary-500 transition duration-200 hover:text-secondary-600/70 hover:ease-in-out focus:text-secondary-600/70 active:text-secondary-600/70 motion-reduce:transition-none dark:text-secondary-500 dark:hover:text-secondary-500/80 dark:focus:text-secondary-500/80 dark:active:text-secondary-500/80"
//                   href="#"
//                   id="dropdownMenuButton1"
//                   role="button"
//                   data-twe-dropdown-toggle-ref
//                   aria-expanded="false">
//                   <span className="[&>svg]:w-5">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                       fill="currentColor">
//                       <path
//                         d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12z" />
//                       <path
//                         fillRule="evenodd"
//                         d="M4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
//                         clipRule="evenodd" />
//                     </svg>
//                   </span>
//                   <span
//                     className="absolute -mt-4 ms-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white"
//                   ></span>
//                 </a>
//                 <ul
//                   className="absolute z-[1000] float-left m-0 mt-1 hidden min-w-max list-none rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-surface-dark [&[data-twe-dropdown-show]]:block"
//                   aria-labelledby="dropdownMenuButton1"
//                   data-twe-dropdown-menu-ref>
//                   <li>
//                     <a
//                       className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30"
//                       href="#">Dashboard</a>
//                   </li>
//                   <li>
//                     <a
//                       className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30"
//                       href="#">Another action</a>
//                   </li>
//                   <li>
//                     <a
//                       className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30"
//                       href="#">Something else here</a>
//                   </li>
//                 </ul>
//               </div>
//               {/* <a
//               className="text-black/50 transition duration-200 hover:text-black/70 hover:ease-in-out focus:text-black/70 active:text-black/70 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 dark:active:text-neutral-300"
//               href="#">
//               <span className="[&>svg]:w-5">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="currentColor">
//                   <path
//                     d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12z" />
//                   <path
//                     fillRule="evenodd"
//                     d="M4.5 19.5a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
//                     clipRule="evenodd" />
//                 </svg>
//               </span>
//             </a> */}

//             </div>
//           </div>
//         </nav>
//       </div>

//       {/* <div className='w-full border'>
//         <nav className='flex w-[80%] m-auto justify-evenly gap-2 h-[50px] items-center'>
//           <button className='border w-[10%] h-[85%] flex items-center justify-center text-black text-bold bg-blue text-[30px]' onClick={toggleNavbar}>
//             <IoMenu />
//           </button>
//         </nav>
//       </div>

//       <div className={`nav w-[31%] backdrop-blur-[100px] h-[100%] fixed top-[0px] border   ${navbarOpen ? 'right-[1]' : 'fixed right-[200%]'}`}>
//         <nav>
//           <button className='text-[35px] absolute top-0 left-[80%]' onClick={toggleNavbar}><IoIosCloseCircleOutline /></button>
//           <ul className=' w-[80%] m-auto gap-2 h-[50px] grid items-center justify-center'>
//             <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//               <NavLink to="/home">Home</NavLink>
//             </li>
//             <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//               <NavLink to="/blog">Blog</NavLink>
//             </li>
//             {!user && <>
//               <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//                 <NavLink to="/signin">Sign In</NavLink>
//               </li>
//             </>}
//             <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//               <NavLink to="/dashboard">Dashboard</NavLink>
//             </li>
//             <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//               <NavLink to="/bekzod">Bekzod</NavLink>
//             </li>
//             <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//               <NavLink to="/userpage">User Page</NavLink>
//             </li>
//             {user && <li className='text-[700] rounded-[20px] border w-[150%] bg-red-400 border-black mt-[85px] h-[50px] flex items-center justify-center text-black bg-blue '>
//               <NavLink to="/signin" onClick={handleSignOut}>Sign Out</NavLink>
//             </li>}
//           </ul>
//         </nav>
//       </div> */}

//       <Routes>
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/workers" element={<Workers />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/bossanaliz" element={<BossAnaliz />} />
//         <Route path="/bekzod" element={<Bekzod />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/dashboard" element={<ProtectRouteAdmin><Dashboard /></ProtectRouteAdmin>} />
//         <Route path="/search" element={<Search />} />
//         <Route path="/home" element={<ProtectRouteUser><Home /></ProtectRouteUser>} />
//       </Routes>
//     </>
//   );
// }

// export default App;






// ///////////////////////////////////////workers uchun

// import { useState, useEffect } from "react";
// import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
// import { BsSearch } from "react-icons/bs";
// import { notification } from 'antd';
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import { v4 as uuid } from "uuid";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";



// // SearchByDate komponenti
// const SearchByDate = ({ setSearchResults }) => {
//   const [searchDate, setSearchDate] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchDate) {
//       try {
//         const q = query(
//           collection(db, 'blogs'),
//           where('firstData', '==', searchDate)
//         );

//         const querySnapshot = await getDocs(q);
//         const searchResults = [];
//         querySnapshot.forEach((doc) => {
//           searchResults.push({ ...doc.data(), id: doc.id });
//         });

//         setSearchResults(searchResults);
//       } catch (error) {
//         console.error("Qidiruvda xato:", error);
//       }
//     }
//   };

//   const handleClearResults = () => {
//     setSearchResults([]);
//     setSearchDate('');
//   };

//   return (
//     <div className="border border-black w-[90%] m-auto h-[50px]">
//       <div className="">
//         <form className="flex justify-between h-[48px]" onSubmit={handleSearch}>
//           <input
//             type="date"
//             className="w-[100%]"
//             id="searchDate"
//             name="searchDate"
//             value={searchDate}
//             onChange={(e) => setSearchDate(e.target.value)}
//           />
//           <button type="submit" className="border border-black w-[3%] h-[100%] flex justify-center items-center text-[25px]">
//             <BsSearch />
//           </button>
//           <button type="button" onClick={handleClearResults} className="ml-2 border border-black h-[100%] flex justify-center items-center text-[15px]">
//             Clear Results
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Search komponenti
// const Dashboard = () => {

//   const [img, setImg] = useState(null);




//   const data = collection(db, 'blogs');
//   const storage = getStorage();

//   useEffect(() => {
//     const unsubscribe = onSnapshot(data, (snapshot) => {
//       const malumot = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//       setBox(malumot);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setShowForm(false)
//     if ( img === null ) {
//       return notification.error({
//         message: "Input bo'sh",
//         description: "Malumot to'liq kiritilmagan"

//       });
//     }

//     try {
//       const imgRef = ref(storage, `images/${img.name}-${uuid()}`);
//       const uploadTask = uploadBytesResumable(imgRef, img);

//       uploadTask.on('state_changed',
//         (snapshot) => { },
//         (error) => {
//           notification.error({
//             message: "Rasm yuklanmadi",
//             description: error.message
//           });
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {




//             await addDoc(data, {
//               title,
//               descript: des,
//               img: downloadURL,
//               id: uuid(),


//             });
//             notification.success({
//               message: "Ma'lumot kiritildi",
//               description: "Sizning barcha ma'lumotlaringiz kiritildi"
//             });
//             setShowForm(false);
//             resetForm();
//           });
//         }
//       );
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       notification.error({
//         message: "Rasm yuklanmadi",
//         description: error.message
//       });
//     }
//   };

//   const handleDelete = async (id) => {
//     const deletePost = doc(db, 'blogs', id);
//     await deleteDoc(deletePost);
//     console.log(`Deleted post with id: ${id}`);
//   };

//   const handleEdit = ( img) => {

//     setImgUrl(img);

//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const updateData = doc(db, 'blogs', id);
//     setShowForm(false)



//     await updateDoc(updateData, {

//       img: imgUrl

//     });

//     resetForm();
//   };

 

//   const resetForm = () => {

//     setImg(null);


//   };

//   const handleFileChange = (e) => {
//     if (e.target.files[0]) {
//       setImg(e.target.files[0]);
//     }
//   };


//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const data = collection(db, 'blogs');
//     const unsubscribe = onSnapshot(data, (snapshot) => {
//       const malumot = [];
//       snapshot.docs.forEach((doc) => {
//         malumot.push({ ...doc.data(), id: doc.id });
//       });
//       setBox(malumot);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleTextareaChange = (e, id) => {
//     const newBox = box.map(item => {
//       if (item.id === id) {
//         return { ...item, descript: e.target.value };
//       }
//       return item;
//     });
//     setBox(newBox);
//   };

//   return (
//     <>

//       <button className="flex m-auto border w-[100px] h-[40px] items-center justify-center mt-[15px]" onClick={() => setShowForm(true)}>
//         Add Data
//       </button>
//       {/* Create Data */}
//       {showForm && (
//         <div className=" overflow-hidden mt-10 p-4 border w-full h-full border-gray-300 rounded-md fixed top-[-40px] left-0 right-0 backdrop-blur-[100px]">
//           <button onClick={() => setShowForm(false)} className="text-[30px] absolute top-[20px] left-[95%]">
//             <IoIosCloseCircleOutline />
//           </button>
//           <h2 className="text-2xl mb-4 font-[700]">Create New Post</h2>
//           <form onSubmit={isUpdate ? handleUpdate : handleCreate}>
//             <div >
//               <div className="w-[40%] border flex justify-between ">

//                 <div>


//                   <label htmlFor="date">
//                     <h1 className="mb-[10px]">Vaqtni kiriting</h1>
//                     <input
//                       id="date"
//                       type="date"
//                       className="block w-[70%] p-2 mb-4 border border-gray-300 rounded-md"
//                       value={firstData}
//                       onChange={(e) => setFirstData(e.target.value)}
//                     />
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="To'y Xona"
//                     className="block w-[70%] p-2 mb-4 border border-gray-300 rounded-md"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                   />
//                   <textarea
//                     placeholder="To'y xaqida ma'lumotlar"
//                     className="block w-[70%] p-2 mb-4 border border-gray-300 rounded-md"
//                     value={des}
//                     onChange={(e) => setDes(e.target.value)}
//                   />
//                   <input
//                     type="file"
//                     className="block w-[70%] p-2 mb-4 border border-gray-300 rounded-md"
//                     onChange={handleFileChange}
//                   />
//                 </div>
//                 <div className="">
//                   <h1 className="text-black text-[20px] mb-[10px]">Montaj qilinganmi?</h1>
//                   <div className="flex mb-[15px]">
//                     <label htmlFor="ha" className="flex text-black">
//                       Bajarildi
//                       <input
//                         type="radio"
//                         id="ha"
//                         name="montaj"
//                         value="Bajarildi"
//                         checked={montaj === 'Bajarildi'}
//                         onChange={(e) => setMontaj(e.target.value)}
//                         className="ml-2"
//                       />
//                     </label>
//                     <label htmlFor="yo'q" className="ml-5 flex text-black">
//                       Bajartilmadi
//                       <input
//                         type="radio"
//                         id="yo'q"
//                         name="montaj"
//                         value="Bajartilmadi"
//                         checked={montaj === 'Bajartilmadi'}
//                         onChange={(e) => setMontaj(e.target.value)}
//                         className="ml-2"
//                       />
//                     </label>
//                   </div>
//                   <div className="flex mb-[15px]">
//                     <label htmlFor="bekzod" className="flex text-black">
//                       Bekzod
//                       <input
//                         type="checkbox"
//                         id="bekzod"
//                         name="bekzod"
//                         checked={bekzodChecked}
//                         onChange={handleBekzodChange}
//                         className="ml-2"
//                       />
//                     </label>
//                     <label htmlFor="siroj" className="ml-5 flex text-black">
//                       Siroj
//                       <input
//                         type="checkbox"
//                         id="siroj"
//                         name="siroj"
//                         checked={sirojChecked}
//                         onChange={handleSirojChange}
//                         className="ml-2"
//                       />
//                     </label>
//                     <label htmlFor="murod" className="ml-5 flex text-black">
//                       Murod
//                       <input
//                         type="checkbox"
//                         id="murod"
//                         name="murod"
//                         checked={murodChecked}
//                         onChange={handleMurodChange}
//                         className="ml-2"
//                       />
//                     </label>
//                   </div>
//                   <h1 className="text-black text-[20px] mb-[10px]">Video Operator</h1>
//                   <div className="flex mb-[15px]">
//                     <label htmlFor="zafar" className="flex text-black">
//                       Zafar
//                       <input
//                         type="checkbox"
//                         id="zafar"
//                         name="zafar"
//                         checked={zafarChecked}
//                         onChange={handleZafarChange}
//                         className="ml-2"
//                       />
//                     </label>
//                     <label htmlFor="abror" className="ml-5 flex text-black">
//                       Abror
//                       <input
//                         type="checkbox"
//                         id="abror"
//                         name="abror"
//                         checked={abrorChecked}
//                         onChange={handleAbrorChange}
//                         className="ml-2"
//                       />
//                     </label>
//                     <label htmlFor="vohid" className="ml-5 flex text-black">
//                       Vohid
//                       <input
//                         type="checkbox"
//                         id="vohid"
//                         name="vohid"
//                         checked={vohidChecked}
//                         onChange={handleVohidChange}
//                         className="ml-2"
//                       />
//                     </label>
//                     <label htmlFor="otabek" className="ml-5 flex text-black">
//                       Otabek
//                       <input
//                         type="checkbox"
//                         id="otabek"
//                         name="otabek"
//                         checked={otabekChecked}
//                         onChange={handleOtabekChange}
//                         className="ml-2"
//                       />
//                     </label>
//                   </div>
//                   <div className="flex mb-[15px]">
//                     <label htmlFor="asror" className="ml-5 flex text-black">
//                       Asror
//                       <input
//                         type="checkbox"
//                         id="asror"
//                         name="asror"
//                         checked={asrorChecked}
//                         onChange={handleAsrorChange}
//                         className="ml-2"
//                       />
//                     </label>
//                     <label htmlFor="atham" className="ml-5 flex text-black">
//                       Atham
//                       <input
//                         type="checkbox"
//                         id="atham"
//                         name="atham"
//                         checked={athamChecked}
//                         onChange={handleAthamChange}
//                         className="ml-2"
//                       />
//                     </label>
//                     <label htmlFor="elyor" className="ml-5 flex text-black">
//                       Elyor
//                       <input
//                         type="checkbox"
//                         id="elyor"
//                         name="elyor"
//                         checked={elyorChecked}
//                         onChange={handleElyorChange}
//                         className="ml-2"
//                       />
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//               {isUpdate ? 'Update' : "Yaratish"}
//             </button>
//           </form>
//         </div>
//       )}
//       <SearchByDate setSearchResults={setSearchResults} />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {searchResults.length > 0 ? (
//           searchResults.map((mall) => (
//             <div className="border border-black max-w-full max-h-full text-center m-auto rounded-md h-auto mt-6 shadow-lg" key={mall.id}>
//               <div className="box p-4">
//                 <img className="w-full h-64 object-cover rounded-t-md" src={mall.img} alt="" />
//                 <p className="mt-6 mb-4 text-[20px] text-blue-500">Zakaz vaqti: {mall.firstData}</p>
//                 <h3 className="mt-6 text-2xl text-green-600 font-semibold">Ism: {mall.title}</h3>
//                 <p className="mt-6 mb-4 text-[22px] text-red-500 ">To'y xaqida ma'lumot:</p>
//                 <div className="border rounded-[10px] shadow-inner">
//                   <h2 className="text-[18px]">Montajchilar ro'yxati:</h2>
//                   <p className="text-[18px]">{mall.bekzod}</p>
//                   <p className="text-[18px]">{mall.siroj}</p>
//                   <p className="text-[18px]">{mall.murod}</p>

//                 </div><br />
//                 <div className="border rounded-[10px] shadow-inner mb-[10px]">
//                   <h2 className="text-[18px] mt-[5px] h-auto">Video Operator:</h2>
//                   <p className="text-[18px]">{mall.zafar}</p>
//                   <p className="text-[18px] mb-[5px]">{mall.abror}</p>
//                   <p className="text-[18px] mb-[5px]">{mall.vohid}</p>
//                   <p className="text-[18px]">{mall.otabek}</p>
//                   <p className="text-[18px] mb-[5px]">{mall.asror}</p>
//                   <p className="text-[18px] mb-[5px]">{mall.atham}</p>
//                   <p className="text-[18px] mb-[5px]">{mall.elyor}</p>
//                 </div>
//                 <textarea
//                   value={mall.descript}
//                   onChange={(e) => handleTextareaChange(e, mall.id)}
//                   placeholder="Ma'lumotlar"
//                   className="block w-[90%] p-2 mb-4 border h-[40px] border-gray-300 rounded-md m-auto"
//                   id={`descript-${mall.id}`}
//                   name={`descript-${mall.id}`}
//                 />
//                 <p className="mt-6 mb-4 text-[23px] text-blue-500"> Montaj bajarilganmi : <span className="text-green-600 font-[600]">{mall.montaj}</span></p>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleEdit(mall.id, mall.title, mall.descript,
//                   mall.img, mall.montaj,
//                   mall.firstData, mall.bekzod, mall.siroj,
//                   mall.murod, mall.zafar, mall.abror,
//                   mall.vohid, mall.otabek, mall.asror,
//                   mall.atham, mall.elyor)}>Edit</button>
//                 <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDelete(mall.id)}>Delete</button>
//               </div>
//             </div>
//           ))
//         ) : (
//           box.map((mall) => (
//             <div className="border border-black max-w-full max-h-full text-center m-auto rounded-md h-auto mt-6 shadow-lg" key={mall.id}>
//               <div className="box p-4">
//                 <img className="w-full h-64 object-cover rounded-t-md" src={mall.img} alt="" />
//                 <p className="mt-6 mb-4 text-[20px] text-blue-500">Zakaz vaqti: {mall.firstData}</p>
//                 <h3 className="mt-6 text-2xl text-green-600 font-semibold">Ism: {mall.title}</h3>
//                 <p className="mt-6 mb-4 text-[22px] text-red-500 ">To'y xaqida ma'lumot:</p>
//                 <div className="border rounded-[10px] shadow-inner">
//                   <h2 className="text-[18px]">Montajchilar ro'yxati:</h2>
//                   <p className="text-[18px]">{mall.bekzod}</p>
//                   <p className="text-[18px]">{mall.siroj}</p>
//                   <p className="text-[18px]">{mall.murod}</p>

//                 </div><br />
//                 <div className="border rounded-[10px] shadow-inner mb-[10px]">
//                   <h2 className="text-[18px] mt-[5px] h-auto">Video Operator:</h2>
//                   <p className="text-[18px]">{mall.zafar}</p>
//                   <p className="text-[18px] mb-[5px]">{mall.abror}</p>
//                   <p className="text-[18px] mb-[5px]">{mall.vohid}</p>
//                   <p className="text-[18px]">{mall.otabek}</p>
//                   <p className="text-[18px] mb-[5px]">{mall.asror}</p>
//                   <p className="text-[18px] mb-[5px]">{mall.atham}</p>
//                   <p className="text-[18px] mb-[5px]">{mall.elyor}</p>
//                 </div>
//                 <textarea
//                   value={mall.descript}
//                   onChange={(e) => handleTextareaChange(e, mall.id)}
//                   placeholder="Ma'lumotlar"
//                   className="block w-[90%] p-2 mb-4 border h-[40px] border-gray-300 rounded-md m-auto"
//                   id={`descript-${mall.id}`}
//                   name={`descript-${mall.id}`}
//                 />
//                 <p className="mt-6 mb-4 text-[23px] text-blue-500"> Montaj bajarilganmi : <span className="text-green-600 font-[600]">{mall.montaj}</span></p>
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleEdit(mall.id, mall.title, mall.descript,
//                   mall.img, mall.montaj,
//                   mall.firstData, mall.bekzod, mall.siroj,
//                   mall.murod, mall.zafar, mall.abror,
//                   mall.vohid, mall.otabek, mall.asror,
//                   mall.atham, mall.elyor)}>Edit</button>
//                 <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDelete(mall.id)}>Delete</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   )
// }

// export default Dashboard;


/////////////////////////////////////////inspect menu block
document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};



////////////////////////////hme
<div className="border border-black max-w-full max-h-full text-center m-auto rounded-md h-auto mt-6 shadow-lg" key={mall.id}>
<div className="box p-4">
    <img className="w-full h-64 object-cover rounded-t-md" src={mall.img} alt="" />
    <p className="mt-6 mb-4 text-[20px] text-blue-500">Zakaz vaqti: {mall.firstData}</p>
    <h3 className="mt-6 text-2xl text-green-600 font-semibold">Ism: {mall.title}</h3>
    <p className="mt-6 mb-4 text-[22px] text-red-500 ">To'y xaqida ma'lumot:</p>
    <div className="border rounded-[10px] shadow-inner">
        <h2 className="text-[18px]">Montajchilar ro'yxati:</h2>
        <p className="text-[18px]">{mall.bekzod}</p>
        <p className="text-[18px]">{mall.siroj}</p>
    </div><br />
    <div className="border rounded-[10px] shadow-inner mb-[10px]">
        <h2 className="text-[18px] mt-[5px] h-auto">Video Operator:</h2>
        <p className="text-[18px]">{mall.zafar}</p>
        <p className="text-[18px] mb-[5px]">{mall.abror}</p>
        <p className="text-[18px] mb-[5px]">{mall.vohid}</p>
        <p className="text-[18px]">{mall.otabek}</p>
        <p className="text-[18px] mb-[5px]">{mall.asror}</p>
        <p className="text-[18px] mb-[5px]">{mall.atham}</p>
        <p className="text-[18px] mb-[5px]">{mall.elyor}</p>
    </div>
    <textarea
        value={mall.descript}
        onChange={(e) => handleTextareaChange(e, mall.id)}
        placeholder="Ma'lumotlar"
        className="block w-[90%] p-2 mb-4 border h-[40px] border-gray-300 rounded-md m-auto"
        id={`descript-${mall.id}`}
        name={`descript-${mall.id}`}
    />
    <p className="mt-6 mb-4 text-[23px] text-blue-500"> Montaj bajarilganmi : <span className="text-green-600 font-[600]">{mall.montaj}</span></p>
</div>
</div>
/////////////////////////////////////////////
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { db1 } from "../../firebase/firebase.jsx";
import { BsSearch } from "react-icons/bs";

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
        <div className="border border-black w-[90%] m-auto h-[50px]">
            <form className="flex justify-between h-[48px]" onSubmit={handleSearch}>
                <input
                    type="date"
                    className="w-[100%]"
                    id="searchDate"
                    name="searchDate"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />
                <button type="submit" className="border border-black w-[3%] h-[100%] flex justify-center items-center text-[25px]">
                    <BsSearch />
                </button>
                <button type="button" onClick={handleClearResults} className="ml-2 border border-black h-[100%] flex justify-center items-center text-[15px]">
                    Clear Results
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {searchResults.length > 0 ? (
                    searchResults.map((mall) => (
                        <div className="border border-black max-w-full max-h-full text-center m-auto rounded-md h-auto mt-6 shadow-lg" key={mall.id}>
                            <div className="box p-4">
                                <img className="w-full h-64 object-cover rounded-t-md" src={mall.img} alt="" />
                                <p className="mt-6 mb-4 text-[20px] text-blue-500">Zakaz vaqti: {mall.firstData}</p>
                                <h3 className="mt-6 text-2xl text-green-600 font-semibold">Ism: {mall.title}</h3>
                                <p className="mt-6 mb-4 text-[22px] text-red-500">To'y xaqida ma'lumot:</p>

                                {/* Montajchilar list */}
                                {mall.bekzod || mall.siroj ? (
                                    <div className="border rounded-[10px] shadow-inner">
                                        <h2 className="text-[18px]">Montajchilar ro'yxati:</h2>
                                        <ul id={`montaj-list-${mall.id}`} className="list-none p-0 m-0 max-h-12 overflow-hidden transition-max-height duration-500 ease-in-out">
                                            {mall.bekzod && <li className="text-[18px]">{mall.bekzod}</li>}
                                            {mall.siroj && <li className="text-[18px]">{mall.siroj}</li>}
                                        </ul>
                                        <button id={`button-montaj-list-${mall.id}`} className="toggle-arrow bg-none border-none text-blue-600 cursor-pointer text-xl mt-2 transition-transform" onClick={() => toggleList(`montaj-list-${mall.id}`)}>
                                            &#9660;
                                        </button>
                                    </div>
                                ) : null}
                                <br />

                                {/* Video Operator list */}
                                {(mall.zafar || mall.abror || mall.vohid || mall.otabek || mall.asror || mall.atham || mall.elyor) ? (
                                    <div className="border rounded-[10px] shadow-inner mb-[10px]">
                                        <h2 className="text-[18px] mt-[5px] h-auto">Video Operator:</h2>
                                        <ul id={`video-operator-list-${mall.id}`} className="list-none p-0 m-0 max-h-12 overflow-hidden transition-max-height duration-500 ease-in-out">
                                            {mall.zafar && <li className="text-[18px]">{mall.zafar}</li>}
                                            {mall.abror && <li className="text-[18px]">{mall.abror}</li>}
                                            {mall.vohid && <li className="text-[18px]">{mall.vohid}</li>}
                                            {mall.otabek && <li className="text-[18px]">{mall.otabek}</li>}
                                            {mall.asror && <li className="text-[18px]">{mall.asror}</li>}
                                            {mall.atham && <li className="text-[18px]">{mall.atham}</li>}
                                            {mall.elyor && <li className="text-[18px]">{mall.elyor}</li>}
                                        </ul>
                                        <button id={`button-video-operator-list-${mall.id}`} className="toggle-arrow bg-none border-none text-blue-600 cursor-pointer text-xl mt-2 transition-transform" onClick={() => toggleList(`video-operator-list-${mall.id}`)}>
                                            &#9660;
                                        </button>
                                    </div>
                                ) : null}
                                <p className="mt-6 mb-4 text-[23px] text-blue-500"> Montaj bajarilganmi : <span className="text-green-600 font-[600]">{mall.montaj}</span></p>
                            </div>
                        </div>
                    ))
                ) : (
                    box.map((mall) => (
                        <div className="flex justify-center items-center h-screen bg-gray-200" key={mall.id}>
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
                )}
            </div>
        </>
    );
};

export default Home;


