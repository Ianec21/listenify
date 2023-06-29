"use client";

import Image from "next/image";
import { FunctionComponent, forwardRef, useEffect, useRef, useState } from "react";

import FavoriteIcon from "../../assets/icons/favorite.svg";
import PlayIcon from "../../assets/icons/play.svg";
import PauseIcon from "../../assets/icons/pause.svg";
import ArrowIcon from "../../assets/icons/arrow.svg";
import SoundMaxIcon from "../../assets/icons/sound_max.svg";
import SoundMinIcon from "../../assets/icons/sound_min.svg";
import SoundMuteIcon from "../../assets/icons/sound_mute.svg";

const Audio: FunctionComponent = forwardRef<HTMLDivElement>((props, ref) => {
    const [data, setData] = useState<any>(null);
    const trackSlider = useRef<any>();
    const audio = useRef<any>();

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<string>("0:00");
    const [durationTime, setDurationTime] = useState<string>("0:00");

    const [audioVolume, setAudioVolume] = useState<number>(100);
    const [muted, setMuted] = useState<boolean>(false);

    useEffect(() => {
        console.log(data);
        if(audio.current && trackSlider.current && typeof(data) == "object"){
            audio.current.src = data.preview;
            audio.current.addEventListener("loadedmetadata", () => {
                audio.current.play();
                setDurationTime(calculateTime(audio.current.duration));
                trackSlider.current.max = Math.floor(audio.current.duration);
                setIsPlaying(true);
            });

            audio.current.addEventListener("timeupdate", () => {
                trackSlider.current.value = Math.floor(audio.current.currentTime);
                setCurrentTime(calculateTime(trackSlider.current.value));

                if(Math.floor(trackSlider.current.value) >= Math.floor(audio.current.duration)){
                    audio.current.currentTime = 0;
                    audio.current.pause();
                    setIsPlaying(false);
                }
            });
        }
    }, [data]);

    window.addEventListener("storage", () => {
        const currentTrack: any = localStorage.getItem("currentTrack");
        setData(JSON.parse(currentTrack) || null);
    })

    const calculateTime = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    }

    const HandlePlayPause = () => {
        setIsPlaying(!isPlaying);

        if(isPlaying === true){
            audio.current.pause();
        } else {
            audio.current.play();
        }
    }

    const HandleMuteClick = () => {
        if(muted === false){
            setMuted(true);
            audio.current.volume = 0;
        } else {
            setMuted(false);
            audio.current.volume = audioVolume/100;
        }
    }

    if(data != null && data.preview){
        return(
            <div className="absolute flex bottom-0 w-full bg-slate-300 h-[100px] p-2 items-center justify-around">
                <audio ref={audio} preload="metadata"/>
                <div className="flex gap-2 h-[100%] items-center w-1/6">
                    <Image src={data.cover} width={50} height={50} alt="Artist Photo"/>
    
                    <div className="w-3/4">
                        <h1 className="font-bold truncate">{data.title}</h1>
                        <p className="text-xs">{data.artist}</p>
                    </div>
    
                    <div>
                        <FavoriteIcon className="stroke-slate-600"/>
                    </div>
                </div>

                <div className="flex flex-col items-center w-2/4">
                    <div className="flex">
                        <ArrowIcon className="rotate-180 font-lg w-[36px] fill-slate-600"/>
                        <div onClick={HandlePlayPause}>
                            {isPlaying ? <PauseIcon className="w-[48px] fill-slate-600"/> : <PlayIcon className="w-[48px] fill-slate-600"/>}
                        </div>
                        <ArrowIcon className="rotate w-[36px] fill-slate-600"/>
                    </div>

                    <div className="flex gap-2 items-center w-full">
                        <p>{currentTime}</p>
                        <input 
                            ref={trackSlider} 
                            type="range" 
                            max="100" 
                            defaultValue="0" 
                            className="w-full"
                            onChange={(e: any) => {
                                setCurrentTime(calculateTime(e.target.value));

                                audio.current.currentTime = e.target.value;
                            }}
                        />
                        <p>{durationTime}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <div onClick={HandleMuteClick}>
                        {audioVolume <= 0 || muted ? 
                            <SoundMuteIcon className="fill-slate-600 stroke-slate-600"/> 
                        : audioVolume > 0 && audioVolume < 50 ? 
                            <SoundMinIcon className="fill-slate-600 stroke-slate-600"/> 
                        : 
                        <SoundMaxIcon className="fill-slate-600 stroke-slate-600"/>
                        }
                    </div>
                    <input 
                        type="range" 
                        max="100" 
                        defaultValue="100"
                        onChange={(e: any) => {
                            setAudioVolume(e.target.value);
                            audio.current.volume = e.target.value/100;
                        }}
                    />
                </div>
            </div>
        )
    } else {
        return(
            <div className="absolute flex-col flex bottom-0 w-full bg-slate-300 h-[100px] p-2 items-center justify-center">
                <div className="flex">
                    <ArrowIcon className="rotate-180 font-lg w-[36px]" fill={"gray"}/>
                    <PlayIcon className="w-[48px]" fill={"gray"}/>
                    <ArrowIcon className="rotate w-[36px]" fill={"gray"}/>
                </div>
                
                <div className="flex h-full gap-2 items-center w-2/4 items-center">
                    <p>0:00</p>
                    <input 
                        ref={trackSlider} 
                        type="range" 
                        max="100" 
                        defaultValue="0" 
                        className="w-full"
                        disabled={true}
                    />
                    <p>0:00</p>
                </div>
            </div>
        )
    }
});

export default Audio;