
 
 

 


declare module TinySteamWrapper {
interface SteamProfile {
  SteamID: number;
  CommunityVisibilityState: TinySteamWrapper.Steam.CommunityVisibilityState;
  ProfileState: number;
  PersonaName: string;
  LastLogOff: Date;
  ProfileUrl: string;
  Avatar: string;
  AvatarMedium: string;
  AvatarFull: string;
  PersonaState: TinySteamWrapper.Steam.PersonaState;
  RealName: string;
  PrimaryClanID: number;
  TimeCreated: Date;
  PersonaStateFlags: number;
  CountryCode: string;
  StateCode: string;
  CityID: string;
  CurrentGameServerIP: string;
  CurrentGameExtraInfo: string;
  CurrentGame: TinySteamWrapper.SteamApp;
  CurrentGameServerSteamID: number;
  CurrentLobbySteamID: number;
  Games: TinySteamWrapper.SteamProfileGame[];
}
interface SteamApp {
  Name: string;
  ID: number;
}
interface SteamProfileGame {
  App: TinySteamWrapper.SteamApp;
  TotalPlayTime: System.TimeSpan;
}
}
declare module System {
interface TimeSpan {
  Ticks: number;
  Days: number;
  Hours: number;
  Milliseconds: number;
  Minutes: number;
  Seconds: number;
  TotalDays: number;
  TotalHours: number;
  TotalMilliseconds: number;
  TotalMinutes: number;
  TotalSeconds: number;
}
}


