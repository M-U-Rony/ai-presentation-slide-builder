'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function Promtpage(){

    const [promt,setpromt] = useState<String>('');
    const [slidecnt,setslidecnt]=useState<Number>(1)
    const [loading,setloading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault();

        try {

            setloading(true);

            if(promt.length==0){
                // use a toast
                console.log("Give promt first");
                setloading(false);
                return;
            }
            
            const res = await fetch('/api/getAicontent',{
                method: "POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({promt,slidecnt})
            })

            if(!res.ok){
                console.error("Failed to generate content");
                return;
            }

            const data = await res.json();
            console.log("AI Output:", data);
            setloading(false)
            router.push('/slides');

        } catch (error) {
            console.log(error);
        }
        
    }

    return(
        <>
        <form action="" className="flex flex-col border-2 border-black" onSubmit={handleSubmit}>
            <input type="text" className="p-10" placeholder="Write promt here" onChange={(e)=> setpromt(e.target.value)}/>
            <input type="number" className="p-2" placeholder="Slide count" onChange={(e)=> setslidecnt(Number(e.target.value))}/>
            <button type="submit">Submit</button>
        </form>
        {loading ? "Generating" : ""}
        </>
    )
}