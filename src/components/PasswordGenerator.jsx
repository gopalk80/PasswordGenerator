import { useEffect, useState, useRef, useCallback } from "react";

function PasswordGenerator(){
    const [length, setLength] = useState(8);
    const [numAllowed, setNumAllowed] = useState(false);
    const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
    const [password, setPassword] = useState("");
    //useRef hook
    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = '';
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        // if(numAllowed){
        //     str = str + '0123456789';
        // }
        if(numAllowed) str += "0123456789";         //shorthand for above if condition
        // if(specialCharAllowed){
        //     str = str + '!@#$%^&*()_-';
        // }
        if(specialCharAllowed) str += "!@#$%^&*()_-";    //shorthand for above if condition

        for(let i = 1; i<= length; i++){
            let char = Math.floor(Math.random()*str.length);
            //pass = pass+str.charAt(char);
            pass += str.charAt(char);               //shorthand for above concatination
        }
        setPassword(pass);  //set final password

    }, [length, numAllowed, specialCharAllowed, setPassword])

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current.select();
        window.navigator.clipboard.writeText(password);
    }, [password])

    //useEffect() hook To avoid Error: Too many re-renders. React limits the number of renders
    useEffect(()=>{
        passwordGenerator();
    }, [length, numAllowed, specialCharAllowed])
    
    return(
        <div className="w-full max-w-md mx-auto shadow-md rounded-2xl px-6 py-3 my-8 bg-gray-800">
            <h1 className="text-white text-center">Password Generator</h1>
            <div className="flex shadow rounded-lg my-6 mb-4 overflow-hidden">
                <input type="text" 
                value={password} 
                className="w-full outline-none bg-amber-50 py-2 px-2"
                placeholder="password"
                readOnly
                ref = {passwordRef}
                />
                <button
                onClick={copyPasswordToClipboard}
                className="outline-none bg-blue-500 text-white py-1 px-2 shrink-0"
                >copy</button>
            </div>
            <div className="flex gap-x-3 text-sm">
                <div className="flex items-center gap-x-1">
                    <input type="range" 
                    max={20}
                    min={8}
                    value={length}
                    className="cursor-pointer"
                    onChange={(e)=>{setLength(e.target.value)}}
                    />
                    <label htmlFor="length" className="text-orange-400">Length: {length}</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input type="checkbox"
                    defaultChecked = {numAllowed}
                    id="numInput"
                    onChange={()=>{
                        setNumAllowed((prev) => !prev);
                    }}
                    />
                    <label htmlFor="numbers" className="text-orange-400">Numbers</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input type="checkbox"
                    defaultChecked = {specialCharAllowed}
                    id="charInput"
                    onChange={() => {
                        setSpecialCharAllowed((prev) => !prev)
                    }}
                    />
                    <label htmlFor="chars" className="text-orange-400">Special Char</label>
                </div>
            </div>
        </div>
    )
}

export default PasswordGenerator;