import React, { useState, useEffect } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import createimg from '../images/imagecreate.png';
import { db3, auth3, storage3 } from '../firebase/firebasesecond';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { notification, Dropdown, Menu } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Jadval from './Jadval.jsx';

function Workers() {
  const [sizes, setSizes] = useState([100, '30%', 'auto']);
  const [isExpanded, setIsExpanded] = useState(false);
  const [image, setImage] = useState(createimg);
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImageClick = () => {
    document.getElementById('file-input').click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    if (!imageFile || !name) {
      return notification.error({
        message: "Incomplete Information",
        description: "Please provide both an image and a name.",
      });
    }

    try {
      const storageRef = ref(storage2, `images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);

      const docRef = await addDoc(collection(db3, 'workers'), {
        name: name,
        img: downloadURL,
        attendance: [],
        schedule: []
      });

      notification.success({
        message: "Data Saved",
        description: "Image and name successfully saved.",
      });

      setWorkers(prevWorkers => [
        ...prevWorkers,
        { id: docRef.id, name: name, img: downloadURL, attendance: [], schedule: [] }
      ]);

      setImage(createimg);
      setName('');
      setImageFile(null);
    } catch (error) {
      console.error("Error saving data:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while saving the image.",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db3, 'workers'));
      const workersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorkers(workersData);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const deletePost = doc(db3, 'workers', id);
      await deleteDoc(deletePost);

      const updatedWorkers = workers.filter(worker => worker.id !== id);
      setWorkers(updatedWorkers);

      if (selectedWorker && selectedWorker.id === id) {
        setSelectedWorker(null);
      }

      notification.success({
        message: "Deleted",
        description: "The worker has been deleted.",
      });
    } catch (error) {
      console.error("Error deleting data:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while deleting the worker.",
      });
    }
  };

  const handleContextMenuClick = (event, worker) => {
    event.preventDefault();
    setSelectedWorker(worker);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuVisible(true);
  };

  const handleScheduleSave = async (workerId, schedule) => {
    try {
      const docRef = doc(db3, 'workers', workerId);
      await updateDoc(docRef, { schedule });

      setWorkers(prevWorkers =>
        prevWorkers.map(worker =>
          worker.id === workerId ? { ...worker, schedule } : worker
        )
      );

      notification.success({
        message: "Schedule Saved",
        description: "The worker's schedule has been updated.",
      });
    } catch (error) {
      console.error("Error saving schedule:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while saving the schedule.",
      });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />} onClick={() => handleDelete(selectedWorker.id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='h-screen border'>
      <h1 className='mt-[150px] text-center text-[50px]'>Tez orada ishga tushadi</h1>
      {/* <SplitPane
        split='vertical'
        sizes={sizes}
        onChange={setSizes}
        className='h-screen'
      >
        <Pane minSize={122} maxSize='50%' className='h-full'>
          <div className='h-full' style={{ background: '#ddd' }}>
            <div className='h-[100px]'>
              <h1>Block 1</h1>
            </div>
            <div className='h-[50px] border border-[red] flex items-center'>
              <div className='w-[90%] flex justify-between m-auto'>
                <h1>CreateData</h1>
                <MdOutlineKeyboardDoubleArrowDown
                  className='text-[20px] font-black cursor-pointer'
                  onClick={toggleExpand}
                />
              </div>
            </div>
            {isExpanded && (
              <div className='h-[121px] border border-[red] flex items-center'>
                <div className='flex items-center'>
                  <img
                    className='w-[120px] h-[119px] mr-4 cursor-pointer'
                    src={image || createimg}
                    alt="Selected"
                    onClick={handleImageClick}
                  />
                  <input
                    id='file-input'
                    type='file'
                    className='hidden'
                    accept='image/*'
                    onChange={handleFileChange}
                  />
                  <div className='flex flex-col w-[110px]'>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Name'
                      className='p-2 mb-2 border border-gray-300 rounded'
                    />
                    <button
                      className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className='h-[121px] border items-center mt-[10px]'>
              {workers.map((worker, index) => (
                <div
                  key={index}
                  className={`h-[121px] border border-[red] flex mb-[10px] cursor-pointer ${selectedWorker?.id === worker.id ? 'bg-gray-300' : ''}`}
                  onClick={() => setSelectedWorker(worker)}
                  onContextMenu={(e) => handleContextMenuClick(e, worker)}
                >
                  <img className='w-[120px] h-[119px]' src={worker.img} alt={worker.name} />
                  <div className='flex-1 ml-4'>
                    <h1>{worker.name || "No name provided"}</h1>
                  </div>
                </div>
              ))}
              {contextMenuVisible && (
                <Dropdown
                  overlay={menu}
                  trigger={['click']}
                  visible={contextMenuVisible}
                  onVisibleChange={(visible) => setContextMenuVisible(visible)}
                  placement="bottomRight"
                  getPopupContainer={() => document.body}
                >
                  <div style={{ position: 'absolute', top: contextMenuPosition.y, left: contextMenuPosition.x }} />
                </Dropdown>
              )}
            </div>
          </div>
        </Pane>
        <Pane minSize={122} maxSize='100%' className='h-full'>
          <div className='h-full border' style={{ background: '#aaa' }}>
            <div className='h-[100px]'>
              <h1>Block 2</h1>
            </div>
            {selectedWorker ? (
              <>
                <div className='h-[50px] border border-[red]'>
                  <h1>{selectedWorker.name}</h1>
                </div>
                <Jadval
                  workerId={selectedWorker.id}
                  existingSchedule={selectedWorker.schedule}
                  onSaveSchedule={handleScheduleSave}
                />
              </>
            ) : (
              <div className='h-[50px] border border-[red]'>
                <h1>No worker selected</h1>
              </div>
            )}
          </div>
        </Pane>
      </SplitPane> */}
    </div>
  );
}

export default Workers;
