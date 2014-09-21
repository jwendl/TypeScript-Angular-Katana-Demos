var TinySteamWrapper;
(function (TinySteamWrapper) {
    (function (Steam) {
        (function (CommunityVisibilityState) {
            CommunityVisibilityState[CommunityVisibilityState["Private"] = 1] = "Private";
            CommunityVisibilityState[CommunityVisibilityState["Public"] = 3] = "Public";
        })(Steam.CommunityVisibilityState || (Steam.CommunityVisibilityState = {}));
        var CommunityVisibilityState = Steam.CommunityVisibilityState;
        (function (PersonaState) {
            PersonaState[PersonaState["Offline"] = 0] = "Offline";
            PersonaState[PersonaState["Online"] = 1] = "Online";
            PersonaState[PersonaState["Busy"] = 2] = "Busy";
            PersonaState[PersonaState["Away"] = 3] = "Away";
            PersonaState[PersonaState["Snooze"] = 4] = "Snooze";
            PersonaState[PersonaState["LookingToTrade"] = 5] = "LookingToTrade";
            PersonaState[PersonaState["LookingToPlay"] = 6] = "LookingToPlay";
        })(Steam.PersonaState || (Steam.PersonaState = {}));
        var PersonaState = Steam.PersonaState;
    })(TinySteamWrapper.Steam || (TinySteamWrapper.Steam = {}));
    var Steam = TinySteamWrapper.Steam;
})(TinySteamWrapper || (TinySteamWrapper = {}));
//# sourceMappingURL=Models.js.map
