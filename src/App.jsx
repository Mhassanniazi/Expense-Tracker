import { useState } from "react";
import "./App.css"

function App() {
  const [balance, setBalance] = useState(0)
  const [currency, setCurrency] = useState('$')
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [amount, setAmount] = useState("")
  const [item, setItem] = useState("")
  const [data, setData] = useState([])

  const addData = () => {
    setData([...data, { "item": item, "currency": currency, "amount": amount }])
    setBalance((prev) => parseInt(prev) + parseInt(amount))
    amount >= 0 ? setIncome((prev) => parseInt(prev) + parseInt(amount)) : setExpense((prev) => parseInt(prev) + parseInt(amount))
    setItem("")
    setAmount("")
  }
  const deletee=(value,i)=>{
    value.amount >= 0 ? setIncome((prev) => parseInt(prev) - parseInt(value.amount)) : setExpense((prev) => parseInt(prev) - parseInt(value.amount))
    setBalance((prev)=>parseInt(prev) - parseInt(value.amount))
    data.splice(i,1)
    setData(data.slice(0))  // here slice returns a deep copy so setstate notify that some change is occured 
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "white", backgroundColor: "rgba(231, 156, 18, 0.89)" }}>EXPENSE TRACKER</h1>
      <div className="main">
        <h3 className="head">YOUR BALANCE</h3>
        <span style={{ fontWeight: "bold", fontSize: "24px" }}>{currency + balance}</span><br />
        <div className="inline-head">
          <div className="Inline">
            <span>INCOME</span> <br />
            {currency + income}
          </div>
          <div className="Inline">
            <span>EXPENSE</span> <br />
            {currency + expense}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-around">
          <div className="col-sm-6 box">
            <h4>ADD TRANSACTION</h4>
            <select className="field" name="drop" id="currency" onChange={(event) => setCurrency(event.target.value)}>
              <option value="$">USD</option>
              <option value="Rs">PKR</option>
            </select>
            <br />
            <input className="field" value={item} type="text" placeholder="ITEMS.." onChange={(event) => setItem(event.target.value)} />
            <br />
            <input className="field" value={amount} placeholder="AMOUNT.." type="number" name="a" id="ab" onChange={(event) => setAmount(event.target.value)} />
            <br />
            <button className="button-1" onClick={addData}>ADD</button>
          </div>
          <div className="col-sm-6 box ">
            <h4>TRANSACTION HISTORY</h4>
            {data.map((value, index) => {
              return <li className="list" key={index}><span className="text-first">{value.item}</span>{value.currency + value.amount}<button onClick={()=>deletee(value,index)} type="button" class="btn btn-danger">DELETE</button></li>
            })}

          </div>
        </div>
      </div>
    </div>
  )
}

export default App