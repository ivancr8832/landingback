import { Video } from "../interfaces";

export const getRandomVideo = (listVideos: Video[]): Video => {
    const randomIndex = Math.floor(Math.random() * listVideos.length);
    return listVideos[randomIndex];
}