"use client";

import Audio from "@/components/ui/audio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SearchTrack from "@/hooks/Track";
import { useRef, useState } from "react";

interface TracksType {
  data: [];
  total: number;
}

interface Track {
  title: string;
  preview: string;
}

export default function Home() {
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

  const PlaySong = (song: Track) => {
    setPlayTrack(song);

    if(playerRef.current){
      //playerRef.current.src = song.preview;
      //playerRef.current.play();
    }
  }

  return (
    <main>
      <div className="p-2">
        <h1 className="text-3xl font-bold">
          Music Player
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

        <div className="max-h-[70vh] overflow-y-scroll">
        {tracksData ? (
            <div>
              {tracksData.data.map((track: any) => (
                <div key={`track_${track.id}`} className="w-full flex justify-between mb-2">
                  <h1>{track.artist.name} - {track.title}</h1>
                  <Button onClick={() => PlaySong(track)}>Play</Button>
                </div>
              ))}
            </div>
          ) : <h1>No songs</h1>}
        </div>
      </div>

      <Audio data={playTrack}/>
    </main>
  )
}