import { CopyBlock, monoBlue } from "react-code-blocks";
import Diagram from "../resources/sql-diagram.png";

const answers = [
  {
    question: "a",
    code: `SELECT 
    FirstName,
    LastName
FROM 
    Customer
WHERE 
    LastName LIKE 'S%'
ORDER BY 
    LastName DESC, FirstName DESC;`,
  },
  {
    question: "b",
    code: `SELECT 
    Customer.PKCustID,
    Customer.FirstName,
    Customer.LastName,
    COALESCE(SUM(OrderLine.Cost * OrderLine.Quantity), 0) AS TotalOrderValue
FROM 
    Customer
LEFT JOIN 
    Order ON Customer.PKCustID = Order.FK1CustomerID
LEFT JOIN 
    OrderLine ON Order.PKOrderID = OrderLine.FK1OrdID
WHERE 
    Order.OrderDate >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
GROUP BY 
    Customer.PKCustID, Customer.FirstName, Customer.LastName;

`,
  },
  {
    question: "c",
    code: `SELECT 
    Customer.PKCustID,
    Customer.FirstName,
    Customer.LastName,
    COALESCE(SUM(OrderLine.Cost * OrderLine.Quantity), 0) AS TotalOrderValue
FROM 
    Customer
LEFT JOIN 
    Order ON Customer.PKCustID = Order.FK1CustomerID
LEFT JOIN 
    OrderLine ON Order.PKOrderID = OrderLine.FK1OrdID
WHERE 
    Order.OrderDate >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
    OR Order.OrderDate IS NULL
GROUP BY 
    Customer.PKCustID, Customer.FirstName, Customer.LastName
HAVING 
    TotalOrderValue > 100 AND TotalOrderValue < 500;
`,
  },
];

function SQL() {
  return (
    <main className="container">
      <h1>SQL Questions</h1>
      <div>
        <h2 className="my-5">
          This database diagram is to be used for the questions that follow:
        </h2>

        <img className="mb-2 w-100" src={Diagram} alt="SQL Diagram" />
      </div>

      <div>
        <h3 className="my-5">
          A: Write a SQL query that will produce a reverse-sorted list
          (alphabetically by name) of customers (first and last names) whose
          last name begins with the letter 'S.'
        </h3>
        <CopyBlock
          text={answers[0].code}
          language={"sql"}
          showLineNumbers={true}
          theme={monoBlue}
          codeBlock
        />
      </div>

      <div>
        <h3 className="my-5">
          B: Write a SQL query that will show the total value of all orders each
          customer has placed in the past six months. Any customer without any
          orders should show a $0 value.
        </h3>

        <CopyBlock
          text={answers[1].code}
          language={"sql"}
          showLineNumbers={true}
          theme={monoBlue}
          codeBlock
        />
      </div>

      <div>
        <h3 className="my-5">
          C: Amend the query from the previous question to only show those
          customers who have a total order value of more than $100 and less than
          $500 in the past six months.
        </h3>

        <CopyBlock
          text={answers[2].code}
          language={"sql"}
          showLineNumbers={true}
          theme={monoBlue}
          codeBlock
        />
      </div>
    </main>
  );
}

export default SQL;
