import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, getDocs, collection, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './Dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [mobileName, setMobileName] = useState("");
  const [mobilePrice, setMobilePrice] = useState("");
  const [mobileColor, setMobileColor] = useState("");
  const [record, setRecord] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        console.log(userDoc.data());
      }
    };

    fetchUser();
  }, [user]);

  const fetchData = async () => {
    const data = await getDocs(collection(db, "Mobiles"));
    const newData = data.docs.map((item) => ({ docId: item.id, ...item.data() }));
    setRecord(newData);
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const addData = async () => {
    if (editIndex === null) {
      await addDoc(collection(db, "Mobiles"), { mobileName, mobilePrice, mobileColor });
    } else {
      await updateDoc(doc(db, "Mobiles", editIndex), { mobileName, mobilePrice, mobileColor });
      setEditIndex(null); // Reset editIndex after updating
    }
    setMobileName(""); // Clear input fields after adding/updating
    setMobilePrice("");
    setMobileColor("");
    fetchData(); // Refresh data after adding/updating
  };

  const deleteData = async (docId) => {
    await deleteDoc(doc(db, "Mobiles", docId));
    fetchData(); // Refresh data after deletion
  };

  const editData = (docId) => {
    const singleData = record.find((item) => item.docId === docId);
    setMobileName(singleData.mobileName);
    setMobilePrice(singleData.mobilePrice);
    setMobileColor(singleData.mobileColor);
    setEditIndex(docId);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-greeting">- - - MOBILE STORE - - -</h1>

      <input
        type="text"
        placeholder="Mobile Name"
        value={mobileName}
        onChange={(e) => setMobileName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mobile Color"
        value={mobileColor}
        onChange={(e) => setMobileColor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mobile Price"
        value={mobilePrice}
        onChange={(e) => setMobilePrice(e.target.value)}
      />
      
      <button onClick={addData}>{editIndex === null ? "Add" : "Update"}</button>

      <ul>
        {record.map((e) => (
          <li key={e.docId}>
            {e.mobileName}  -  {e.mobileColor}  -  {e.mobilePrice}
            <button onClick={() => editData(e.docId)}>Edit</button>
            <button onClick={() => deleteData(e.docId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
