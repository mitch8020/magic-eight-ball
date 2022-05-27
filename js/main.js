document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const userName = document.querySelector("#userName").value;
  const res = await fetch(`/api?student=${userName}`) //the end of this is the query parameter. student is the query,   userName is the parameter
  const data = await res.json()

  console.log(data);
  document.querySelector("#fortune").textContent = data.myFortune
}