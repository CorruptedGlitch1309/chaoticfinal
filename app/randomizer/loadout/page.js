'use client';
import Nav from "@/app/ui/nav";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page () {
    const searchparams = useSearchParams();
    const data = searchparams.get("players")
    const [players, setPlayers] = useState([])
    
    useEffect(() => {
        if (data) {
            setPlayers(JSON.parse(data));
        };
    }, [data])

    return (
        <>
            <Nav players={[]} />
            <div className="bg-customgray h-screen text-4xl">UNDER DEVELOPMENT</div>
        </>
    );
};