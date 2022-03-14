import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    // variable that stores the data from the server
    const [isLoading, setIsLoading] = useState(true);
    // the data is still being loaded, this is in case the fetch requests takes a little while before the page loads
    const [error, setError] = useState(null);
    // error  catching variable

    useEffect(() => {

        const abortCont = new AbortController();
        // variable to abort fetch requests if pages are switched abruptly before the requests are completed
        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if( !res.ok ){
                        throw Error('Could not fetch the data for that resource');
                    } // throw-catch block in case of errors
                    return res.json();
                })
                .then(data => {
                    setError(null); // data successfully fetched
                    setData(data);
                    setIsLoading(false); // loading message no longer required
                })
                .catch(err => {
                    if(err.name === 'AbortError'){
                        console.log("Fetch aborted"); // for when the user abruptly switches pages before the fetch request is completed
                    } else {
                        setError(err.message);
                        setIsLoading(false);
                    } // throw-catch block in case of errors
                })
        }, 50); // to simulate that the data from server is loaded, not necessary in production build for obvious reasons

        return () => abortCont.abort();

    }, [url]); // URL is the dependancy for the custom hook to run

    return { data, isLoading, error }

}

export default useFetch;