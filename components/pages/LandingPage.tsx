

const LandingPage = async() => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/")
    const data = await res.json()
    console.log(data)
    return (
        <div>
            {!!data.length && data?.map((i) => (<p key={i.id}>{i.title}</p>))}
        </div>
    );
}

export default LandingPage;