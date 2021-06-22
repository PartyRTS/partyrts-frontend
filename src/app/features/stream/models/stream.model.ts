export interface Stream {
  idStream: number;
  idUser: number;
  idPlaylist: number;
  streamTitle: string;
  privateStream: boolean;
  fullUsers: number;
  currentNumberVideo: number;
  activeStream: boolean;
  stopStream: boolean;
}
