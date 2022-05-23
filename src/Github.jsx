import axios from "axios";

const {useState,useEffect} = require("react");


const getGithubUsers=(q="masai",page=1)=>{
  return axios("https://api.github.com/search/users",{
  method:"GET" , 
  params:{
      q:q,
      per_page:5,
      page
    }
  })
}
const Github = () => {
  const [loading ,setLoading]= useState(true)
  const [error,setError]=useState(false)
  const [query,setQuery]=useState("masai")
  const [data,setData]=useState([])
  const [page,setPage]=useState(1)

  useEffect(()=>{
    setLoading(true)
    getGithubUsers(query,page)
    .then((res)=>{
      setLoading(false)
      setData(res.data.items);
      //console.log(res)
      setError(false);
    })
    .catch((err)=>{
      setLoading(false)
      setError(true);
      //console.log(err);
    })
  },[query,page])


   const handleClick=(query)=> setQuery(query);
  //console.log(data);
  //console.log(query);
  return (
    <div>
      <h2>Github Users</h2>
    {loading && <div>...loading</div>}
    {error && <div>...error</div>}
   <SearchBox handleClick={handleClick }/>
    {/* <button onClick={()=> setLoading(!loading)}>Toggle</button> */}
   
   {
     data.map((item)=>{
       return <GithubCard key={item.id} {...item}/>
     } )
   }
   <div>
     <button disabled={page===1} onClick={()=>setPage(page-1)}>PREV</button>
     <button  onClick={()=>setPage(page+1)}>NEXT</button>
   </div>
    </div>
  )
}

const SearchBox =({handleClick}) => {
  const [text , setText]=useState("");
  return (
    <div>
      <input type="text" value={text} onChange={(e)=> setText(e.target.value)} /> 
      <button onClick={handleClick}>SEARCH</button> 
    </div>
  )
}

const GithubCard=({avatar_url,login})=>{
  return(
    <div style={{display:"flex", gap:"2rem"}}>
<img style={{width:"50px",height:"60px",borderRadius:"5px"}} src={avatar_url} alt={login}/>
<div>{login}</div>

    </div>
  )

}
export default Github

