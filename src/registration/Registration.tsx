import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

export interface User {
  firstName: string;
  lastName: string;
  npi: number;
  address: string;
  address2: string;
  phoneNumber: string;
  email: string;
}

const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : null;
};

const saveUsers = (user: User) => {
  let users: User[] = getUsers();
  if (!users) {
    users = [user];
  } else {
    users.push(user);
  }

  const usersString = JSON.stringify(users);
  localStorage.setItem("users", usersString);
};

export default function Registration() {
  const [users, setUsers] = useState<User[]>(getUsers());
  const [user] = useState<User>({
    firstName: "",
    lastName: "",
    npi: 0,
    address: "",
    address2: "",
    phoneNumber: "",
    email: "",
  });

  const clearUsers = () => {
    localStorage.clear();
    setUsers(getUsers());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!users) {
      setUsers([
        {
          firstName: user.firstName,
          lastName: user.lastName,
          npi: user.npi,
          address: user.address,
          address2: user.address2,
          phoneNumber: user.phoneNumber,
          email: user.email,
        },
      ]);
    } else {
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          npi: user.npi,
          address: user.address,
          address2: user.address2,
          phoneNumber: user.phoneNumber,
          email: user.email,
        },
      ]);
    }

    saveUsers(user);
    e.preventDefault();
  };

  return (
    <main className="register">
      <div className="register-form">
        <Form className="register-form__form" onSubmit={(e) => handleSubmit(e)}>
          <Form.Text className="text-muted">
            <h1>Registration Form</h1>
          </Form.Text>
          <Form.Label>
            <span>First Name</span>
            <Form.Control
              type="text"
              onChange={(e) => (user.firstName = e.target.value)}
              required
            />
          </Form.Label>
          <Form.Label>
            <span>Last Name</span>
            <Form.Control
              type="text"
              onChange={(e) => (user.lastName = e.target.value)}
              required
            />
          </Form.Label>
          <Form.Label>
            <span>NPI Number</span>
            <Form.Control
              type="number"
              onChange={(e) => (user.npi = Number(e.target.value))}
              required
            />
          </Form.Label>
          <Form.Label>
            <span>Address</span>
            <Form.Control
              type="text"
              onChange={(e) => (user.address = e.target.value)}
              required
            />
          </Form.Label>
          <Form.Label>
            <span>Apt, suite, etc.</span>
            <Form.Control
              type="text"
              onChange={(e) => (user.address2 = e.target.value)}
              required
            />
          </Form.Label>
          <Form.Label>
            <span>Telephone Number</span>
            <Form.Control
              type="tel"
              id="phone"
              name="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={(e) => (user.phoneNumber = e.target.value)}
              required
            />
          </Form.Label>
          <Form.Label>
            <span>Email Adress</span>
            <Form.Control
              type="email"
              onChange={(e) => (user.email = e.target.value)}
              required
            />
          </Form.Label>

          <Button className="register-form__button" type="submit">
            Register
          </Button>
        </Form>

        <hr />
        <p className="text-center">Already have an account?</p>

        <Button
          href="/login"
          className="register-form__button mt-2"
          variant="secondary"
        >
          Search
        </Button>
      </div>

      <div className="register-table">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>

            {users &&
              users.map((test: User) => {
                return (
                  <tr>
                    <td>{test.firstName}</td>
                    <td>{test.lastName}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <Button className="register-table__clear" onClick={clearUsers}>
          Clear
        </Button>
      </div>
    </main>
  );
}
