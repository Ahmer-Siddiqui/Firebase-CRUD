import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { onValue, ref, remove, set, update } from "firebase/database";
import database from "../config/Firebase";
import { nanoid } from "nanoid";

const MyForm = () => {
  let id = nanoid();
  let dataOBJ = {
    userName: "",
    gmail: "",
    phoneNumber: "",
  };
  const [userData, setUserData] = useState([]);
  const [updateCheck, setUpdateCheck] = useState(false);
  const [data, setData] = useState(dataOBJ);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setUpdateCheck(false)
    let result = set(ref(database, "users/" + id), { ...data, id: id });
    result.then(()=>{
      setData(dataOBJ);
    }).catch((err)=>{
      console.log(`Some Error in your firebase ${err.message}`)
    })
  };
  const onUpdateHandler = (e) => {
    e.preventDefault();
    setUpdateCheck(false)
    console.log(data);

    update(ref(database, "users/" + data.id), data);

    setData(dataOBJ);
  };

  useEffect(() => {
    const starCountRef = ref(database, "users");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setUserData([]);
      } else {
        setUserData(Object.values(data));
      }
    });
  }, []);

  const deleteId = (id) => {
    remove(ref(database, "users/" + id));
  };
  const updateId = (idData) => {
    console.log(idData);
    setUpdateCheck(true)
    setData({
      ...data,
      ...idData
    });
  };

  return (
    <div className="container my-5">
      <Form onSubmit={updateCheck ? onUpdateHandler : onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            name="userName"
            value={data.userName}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="gmail"
            value={data.gmail}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Phone Number"
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={onChangeHandler}
          />
        </Form.Group>
        {updateCheck ? (
          <Button variant="primary" type="submit">Update</Button>
        ) : (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
      </Form>
      <Table striped bordered hover className="my-5">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((elem, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{elem.userName}</td>
                <td>{elem.gmail}</td>
                <td>@{elem.phoneNumber}</td>
                <td>
                  <button className="mx-2" onClick={() => deleteId(elem.id)}>
                    D
                  </button>
                  <button onClick={() => updateId(elem)}>U</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default MyForm;
