const ATMDeposit = ({ onChange, isDeposit, validTransaction }) => {
  let isValid = validTransaction;
  const choice = ['Deposit', 'Cash Back'];
  //console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <span>$</span> <input id="number-input" type="number" width="100" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance: $${totalState} `;
  //console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    //console.log(`handleChange ${event.target.value}`);
    //console.log(validTransaction);
    setValidTransaction(false);
    if (event.target.value <= 0) return;
    if (atmMode === "Cash Back" && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
    
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    let eValue = event.target.value;
    setAtmMode(eValue);
    if (eValue === "Deposit") { 
      setIsDeposit(true); 
    } else if (eValue === "Cash Back") { 
      setIsDeposit(false); 
    } 
  };

  return (
    <form className="atm" onSubmit={handleSubmit}>
      <h1>ATM Machine</h1>
      <h2 id="total">{status}</h2>
      <p>Select an action below to continue.</p>
      <div>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value="">- Select Action -</option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
      </div>
      { atmMode != "" ?
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} validTransaction={validTransaction}></ATMDeposit>
        :
        null
      }
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));