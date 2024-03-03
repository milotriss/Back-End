import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import "./app.css";
import baseAxios from "./configs/axios.config";

function App() {
  const [modal, setModal] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [pages, setPages] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);
  const [formCreate, setFormCreate] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    gender: "",
    birthDay: "",
    country: "",
  });
  const idUpdate = useRef(0)
  const handleGetData = async () => {
    const data: any = await baseAxios.get("/students");
    setData(data.data);
  };
  const renderNumberPages = async (limit: number = 5) => {
    const studentsData: any = await baseAxios.get("/students/all-students");
    const students = studentsData.data;
    const arr = [];
    const result = Math.ceil(students.length / limit);
    for (let i = 1; i <= result; i++) {
      arr.push(i);
    }
    setPages(arr);
  };
  useEffect(() => {
    handleGetData();
    renderNumberPages();
  }, []);
  const handlePagination = async (num: number) => {
    const data: any = await baseAxios.get(`/students?page=${num}&limit=5`);
    setData(data.data);
  };
  const changeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    if (searchValue.length > 0) {
      const getSearchValue = async () => {
        const result: any = await baseAxios.get(
          `/students/search?search=${searchValue}&page=${pages.length}&limit=5`
        );
        const data = result.data;
        const arr = [];
        const page = Math.ceil(data.length / 5);
        for (let i = 1; i <= result; i++) {
          arr.push(i);
        }
        setPages(arr);
        setData(data);
      };
      setTimeout(() => {
        getSearchValue();
      }, 1000);
    } else {
      handleGetData();
      renderNumberPages();
    }
  }, [searchValue]);
  const handleSortASC = async () => {
    const data = await baseAxios.get(
      `/students?sort=ASC&page=${pages.length}&limit=5`
    );
    setData(data.data);
    //  handleGetData();
  };
  const handleSortDESC = async () => {
    const data = await baseAxios.get(
      `/students?sort=DESC&page=${pages.length}&limit=5`
    );
    setData(data.data);
    //  handleGetData();
  };
  const handleDelete = async (id: number) => {
    await baseAxios.delete(`/students/delete/${id}`);
    handleGetData();
    renderNumberPages()
  };
  const handleFormData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormCreate({
      ...formCreate,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleUpdate = async (id:number) => {
    if (isModal) {
      await baseAxios.patch(`/students/update/${id}`,formCreate)
      setFormCreate({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        gender: "",
        birthDay: "",
        country: "",
      })
      setIsModal(false)
      setModal(false)
      handleGetData();
      renderNumberPages();
    }else {
      await baseAxios.post("/students/create", formCreate);
      setFormCreate({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        gender: "",
        birthDay: "",
        country: "",
      })
      setModal(false);
      handleGetData();
      renderNumberPages()
    }
  }
  
  return (
    <div className="app">
      <header>
        <h1>SM 2</h1>
        <div className="appAction">
          <button
            onClick={() => {
              setIsModal(false);
              setModal(true);
            }}
          >
            Create student
          </button>
          <input
            onChange={changeSearch}
            value={searchValue}
            placeholder="Search by name..."
            type="text"
          />
        </div>
      </header>
      <main>
        <FaSortAmountDown onClick={handleSortDESC} className="icon" />
        <FaSortAmountDownAlt onClick={handleSortASC} className="icon" />
        <table>
          <thead>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Day of Birth</th>
            <th>Gender</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Action</th>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item: any, index: number) => {
                return (
                  <tr key={item.id}>
                    <td>{index}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.birthDay}</td>
                    {item.gender === 0 ? <td>Female</td> : <td>Male</td>}
                    <td>{item.address}</td>
                    <td>{item.city}</td>
                    <td>{item.country}</td>
                    <td className="tableActions">
                      <button onClick={() => {
                        setFormCreate({
                          firstName: item.firstName,
                          lastName: item.lastName,
                          email: item.email,
                          phone: item.phone,
                          address: item.address,
                          city: item.city,
                          gender: item.gender,
                          birthDay: item.birthDay,
                          country: item.country,
                        })
                        idUpdate.current = item.id;
                        setModal(true)
                        setIsModal(true)
                      }}>Edit</button>
                      <button onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
      <footer id="listPages">
        {pages.length > 0 &&
          pages.map((item: number, index: number) => {
            return (
              <span
                onClick={() => handlePagination(item)}
                key={index}
                id="numberPages"
              >
                {item}
              </span>
            );
          })}
      </footer>
      {modal ? (
        <section
          onClick={() => {
            setFormCreate({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              address: "",
              city: "",
              gender: "",
              birthDay: "",
              country: "",
            });
            setModal(false);
            setIsModal(false)
          }}
          className="modalOverlay"
        >
          <div onClick={(e: any) => e.stopPropagation()} className="modal">
            {isModal ? <h1>Update Student</h1> : <h1>Create New Student</h1>}
            <input
              value={formCreate.firstName}
              name="firstName"
              onChange={handleFormData}
              placeholder="First Name"
              type="text"
            />
            <input
              value={formCreate.lastName}
              name="lastName"
              onChange={handleFormData}
              type="text"
              placeholder="Last Name"
            />
            <input
              value={formCreate.email}
              name="email"
              onChange={handleFormData}
              type="email"
              placeholder="Email"
            />
            <input
              value={formCreate.phone}
              name="phone"
              onChange={handleFormData}
              type="text"
              placeholder="Your Phone"
            />
            <input
              value={formCreate.birthDay}
              name="birthDay"
              onChange={handleFormData}
              type="text"
              placeholder="Birthday"
            />
            <input
              value={formCreate.address}
              name="address"
              onChange={handleFormData}
              type="text"
              placeholder="Address"
            />
            <input
              value={formCreate.city}
              name="city"
              onChange={handleFormData}
              type="text"
              placeholder="City"
            />
            <input
              value={formCreate.country}
              name="country"
              onChange={handleFormData}
              type="text"
              placeholder="Country"
            />
            <select
              value={formCreate.gender}
              onChange={handleFormData}
              name="gender"
              id=""
            >
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
            <button onClick={() => handleUpdate(idUpdate.current)}>{isModal?'Update':'Create'}</button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default App;
