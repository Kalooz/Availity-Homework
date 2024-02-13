import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { User } from "./Registration";

interface userSearch {
  npi: number;
}

const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [{}];
};

function Search() {
  const [users] = useState<User[]>(getUsers());
  const [user] = useState<userSearch>({
    npi: 0,
  });
  const [result, setResult] = useState<User>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (user.npi != null) {
      setResult(users.find((query) => query.npi === user.npi));
    }
    e.preventDefault();
  };

  return (
    <main className="search">
      <div className="search-form">
        <Form className="search-form__form" onSubmit={(e) => handleSubmit(e)}>
          <Form.Text className="text-muted">
            <h1>Search for Provider</h1>
          </Form.Text>
          <Form.Label>
            <span>NPI Number</span>
            <Form.Control
              type="number"
              onChange={(e) => (user.npi = Number(e.target.value))}
              required
            />
          </Form.Label>
          <Button className="search-form__button mt-2" type="submit">
            Search
          </Button>
        </Form>

        <div className="search-table mt-5">
          {result && (
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>

                <tr>
                  <td>{result.firstName}</td>
                  <td>{result.lastName}</td>
                </tr>

                <tr>
                  <th colSpan={2}>NPI</th>
                </tr>
                <tr>
                  <td colSpan={2}>{result.npi}</td>
                </tr>

                <tr>
                  <th colSpan={2}>Address</th>
                </tr>
                <tr>
                  <td colSpan={2}>{result.address}</td>
                </tr>
                <tr>
                  <th colSpan={2}>Apt, suite, etc.</th>
                </tr>
                <tr>
                  <td colSpan={2}> {result.address2}</td>
                </tr>
                <tr>
                  <th colSpan={2}>Phone Number</th>
                </tr>
                <tr>
                  <td colSpan={2}>{result.phoneNumber}</td>
                </tr>
                <tr>
                  <th colSpan={2}>Email</th>
                </tr>
                <tr>
                  <td colSpan={2}>{result.email}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </main>
  );
}

export default Search;
