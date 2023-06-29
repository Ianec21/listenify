"use client";

import Image from "next/image";
import { FunctionComponent, forwardRef } from "react";
import PlayIcon from "../../assets/icons/play.svg";

interface TrackInterface{
    cover?: string;
    preview: string;
    title: string;
    className?: string;
    author: string;
}

const Track: FunctionComponent<TrackInterface> = forwardRef<HTMLDivElement, TrackInterface>((props, ref) => {
    const handlePlayClick = () => {
        const data = {artist: props.author, title: props.title, preview: props.preview, cover: props.cover}
        localStorage.setItem("currentTrack", JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
    }
    
    if(props?.cover){
        return <div className={props.className}>
            <div className="relative w-[100%] h-[226px] ">
                <Image src={props.cover} alt="Track cover" className="object-cover rounded-md" fill/>
            </div>

            <div className="flex flex-row justify-between items-center">
                <div>
                    <h1 className="truncate text-xs break-words mt-2 font-bold">{props.author}</h1>
                    <h1 className="truncate text-xs break-words">{props.title}</h1>
                </div>

                <PlayIcon onClick={handlePlayClick} className="w-[32px] h-[100%] fill-slate-600 mt-2 hover:cursor-pointer"/>
            </div>
        </div>
    } else {
        return <div>

        </div>
    }
})

export default Track;