"use client";

import Audio from "@/components/ui/audio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Track from "@/components/ui/track";
import SearchTrack from "@/hooks/Track";
import { FunctionComponent, useRef, useState } from "react";

interface TracksType {
  data: [];
  total: number;
}

interface Track {
  title: string;
  preview: string;
}

const Search: FunctionComponent = () => {
    const [tracksData, setTracksData] = useState<TracksType>();
    const [playTrack, setPlayTrack] = useState<Track>();

    const searchRef = useRef<any>();
    const playerRef = useRef<any>();

    const SearchSongHandler = async() => {
        if(searchRef.current){
        const data = await SearchTrack(searchRef.current.value);
        //console.log(data.data);
        if(!data.error){
            setTracksData(data);
        } else alert(data.data.error);
        }
    }

    const PlaySong = async(song: Track) => {
        setPlayTrack(song);
        if(song != null){
            localStorage.setItem("currentTrack", JSON.stringify(song))
        }

        window.dispatchEvent(new Event("storage"));
    }

    return (
        <div className="p-4 w-full">
            <h1 className="text-3xl font-bold">
            Search
            </h1>

            <div className="flex items-center gap-2 mb-4">
                <Input 
                    ref={searchRef}
                    type="text" 
                    placeholder="Search for a song"
                    className="mt-2"
                />

                <Button onClick={SearchSongHandler}>Search</Button>
            </div>

            <div className="max-h-[70vh] w-full overflow-y-scroll">
            {tracksData ? (
                <div className="flex flex-row gap-2 flex-wrap justify-center">
                    {tracksData.data.map((track: any) => (
                        <Track
                            className="w-[226px] mt-2 bg-slate-200 rounded-md p-2"
                            cover={track.album.cover_big}
                            preview={track.preview}
                            title={track.title}
                            author={track.artist.name}
                        />
                    ))}
                </div>
            ) : <h1>No songs</h1>}
            </div>
        </div>
    )
}

export default Search;