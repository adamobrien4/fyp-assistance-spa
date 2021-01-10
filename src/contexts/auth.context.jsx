import React from 'react';



const authContext = React.CreateContext({})

const { instance, accounts, inProgress } = useMsal();


// const multiRew = async () => {


//     const users = () => await axios...
//     const users1 = () => await axios...
//     const users2 = () => await axios...
//     const users3 = () => await axios...

//     await Promise.all([users(),....]).

// }


const authContextProvider = (props) => {

    useEffect(() => {
        // run on load
        // request silent login
        // 
    }, [])



    

    const [instance, setInstance] = useState({})

    
return <authContext.Provider value={} >{props.children}</authContext.Provider>
    
    
}



export context authContextProvider