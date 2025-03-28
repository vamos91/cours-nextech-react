import React, { useState } from 'react';
import { Input, Button } from '@material-tailwind/react';

const Contact = () => {
    const [email, setEmail] = useState('')
    const [isClicked, setIsClicked] = useState(false)

    const printValue = (e) => {
        e.preventDefault()
        setIsClicked(true)
        console.log(email)
        //send request to backend
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="w-64">
                <form onSubmit={printValue}>
                    <Input
                        type="text"
                        placeholder='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Button disabled={isClicked} type="submit">Valider</Button>
                </form>
            </div>
            
        </div>
    );
};

export default Contact;