/// <reference path="_refs.ts" />

module SteamLookupApp {
    "use strict";

    export class LookupApi {
        constructor() {

        }

        public SetBindings() {
            var profileObservable = $("#steamUserName")
                .keyupAsObservable()
                .map(LookupApi.FetchElementValue)
                .filter(LookupApi.FilterInput)
                .throttle(500)
                .distinctUntilChanged()
                .flatMapLatest(LookupApi.FetchValue);

            var selector = $("#results");
            var subscription = profileObservable.subscribe(LookupApi.ProcessResults, LookupApi.ProcessError);
        }

        private static ProcessResults(result) {
            $("#results").children().remove();
            var profile: TinySteamWrapper.SteamProfile = result.data;
            // There are better ways to do this...
            var htmlOutput = "<div class=\"row\">";
            htmlOutput += "<div class=\"col-md-12\"><h2>Profile Info</h2></div>";
            htmlOutput += "</div>";

            htmlOutput += "<div class=\"row\">";
            htmlOutput += "<div class=\"col-md-2\">Full Name</div>";
            htmlOutput += "<div class=\"col-md-4\">" + profile.RealName + "</div>";
            htmlOutput += "<div class=\"col-md-2\"><img src=\"" + profile.AvatarMedium + "\" alt=\"Avatar\" /></div>";
            htmlOutput += "</div>";

            htmlOutput += "<div class=\"row\">";
            htmlOutput += "<div class=\"col-md-12\"><h2>Games</h2></div>";
            htmlOutput += "</div>";

            htmlOutput += "<table class=\"table\">";
            htmlOutput += "<thead><tr><th>Game</th><th>Time Played</th></tr></thead>";
            htmlOutput += profile.Games.map(LookupApi.GameItemTemplate).join("");
            htmlOutput += "</table>";
            $(htmlOutput).appendTo("#results");
        }

        private static GameItemTemplate(game: TinySteamWrapper.SteamProfileGame) {
            var playTimeSpan: System.TimeSpan = LookupApi.ParseTimeValue(game.TotalPlayTime);
            var htmlOutput = "<tr><td>";
            htmlOutput += "<a href=\"/Steam/ViewGame/" + game.App.ID + "\">";
            htmlOutput += game.App.Name;
            htmlOutput += "</a>";
            htmlOutput += "</td>";

            htmlOutput += "<td>";
            if (Math.floor(playTimeSpan.TotalDays) > 0) {
                htmlOutput += playTimeSpan.Days + " day(s), " + playTimeSpan.Hours + " hour(s) and " + playTimeSpan.Minutes + " minute(s)";
            } else if (Math.floor(playTimeSpan.TotalHours) > 0) {
                htmlOutput += playTimeSpan.Hours + " hour(s) and " + playTimeSpan.Minutes + " minute(s)";
            } else {
                htmlOutput += playTimeSpan.Minutes + " minute(s)";
            }


            htmlOutput += "</td>";
            htmlOutput += "</tr>";
            return htmlOutput;
        }

        private static ParseTimeValue(timeValue): System.TimeSpan {
            var timeSpan: System.TimeSpan = {
                Ticks: 0,
                Days: 0,
                Hours: 0,
                Milliseconds: 0,
                Minutes: 0,
                Seconds: 0,
                TotalDays: 0,
                TotalHours: 0,
                TotalMilliseconds: 0,
                TotalMinutes: 0,
                TotalSeconds: 0
            };

            // Value is in format 11.12:59:59
            var dateValueRegex = timeValue.match(/(\d+).(\d+):(\d+):(\d+)/);
            if (timeValue.indexOf(".") === -1) {
                dateValueRegex = timeValue.match(/(\d+):(\d+):(\d+)/);
                if (dateValueRegex !== undefined && dateValueRegex !== null && dateValueRegex.length > 2) {
                    timeSpan.Hours = dateValueRegex[1];
                    timeSpan.Minutes = dateValueRegex[2];
                }
            } else {
                if (dateValueRegex !== undefined && dateValueRegex !== null && dateValueRegex.length > 3) {
                    timeSpan.Days = dateValueRegex[1];
                    timeSpan.Hours = dateValueRegex[2];
                    timeSpan.Minutes = dateValueRegex[3];
                }
            }

            timeSpan.TotalDays = Number(timeSpan.Days) + Number(timeSpan.Hours / 24) + Number((timeSpan.Minutes / 60) / 24);
            timeSpan.TotalHours = Number(timeSpan.Days * 24) + Number(timeSpan.Hours) + Number(timeSpan.Minutes / 60);
            timeSpan.TotalMinutes = Number(timeSpan.Days * 60 * 24) + Number(timeSpan.Hours * 60) + Number(timeSpan.Minutes);

            return timeSpan;
        }

        private static ProcessError(error) {
            $("#results").children().remove();
            $("Error: " + error).appendTo("#results");
        }

        private static FetchElementValue(element) {
            return $(element.target).val();
        }

        private static FilterInput(input) {
            return input.length > 2;
        }

        private static FetchValue(text) {
            return $.ajaxAsObservable({
                url: "http://localhost:53244/api/Profile/Get",
                data: {
                    action: 'get',
                    userName: text
                }
            });
        }
    }
}

$(document).ready(function () {
    var lookupApi = new SteamLookupApp.LookupApi();
    lookupApi.SetBindings();
});