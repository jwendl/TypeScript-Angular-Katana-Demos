/// <reference path="_refs.ts" />

module SteamLookupApp {
    "use strict";

    export class ViewGame {
        constructor() {

        }

        public SetBindings(appId: number) {
            var observer = Rx.Observer.create(ViewGame.OnNextItem, ViewGame.OnError);

            var result = $.ajaxAsObservable({
                url: "http://localhost:53244/api/Game/Get",
                data: {
                    action: 'get',
                    appId: appId
                }
            }).subscribe(observer);
        }

        private static OnNextItem = function (response) {
            var steamGame: SteamLookupApp.Models.SteamGame = response.data;
            $("#results").html(ViewGame.FetchGameInfo(steamGame));
            $.each(steamGame.DownloadableContent, (index, value) => {
                $(ViewGame.FetchGameInfo(value)).appendTo("#results");
            });
        }

        private static FetchGameInfo = function (gameInfo: SteamLookupApp.Models.SteamGame) {
            var html = "<div class=\"row\">";

            html += "<div class=\"col-md-6\">";

            html += "<div class=\"row\">";
            html += "<div class=\"col-md-4\">Name</div>";
            html += "<div class=\"col-md-8\">";
            html += "<a href=\"http://store.steampowered.com/app/" + gameInfo.Id + "/\" target=\"_new\">";
            html += gameInfo.Name;
            html += "</a>";
            html += "</div>";
            html += "</div>";

            if (gameInfo.Pricing !== undefined && gameInfo.Pricing !== null) {
                html += "<div class=\"row\">";
                html += "<div class=\"col-md-4\">Initial Price</div>";
                html += "<div class=\"col-md-4\">";
                html += gameInfo.Pricing.Initial;
                html += "</div>";
                html += "</div>";

                if (gameInfo.Pricing.Final !== undefined && gameInfo.Pricing.Final !== "") {
                    html += "<div class=\"row\">";
                    html += "<div class=\"col-md-4\">Final Price</div>";
                    html += "<div class=\"col-md-4\">";
                    html += gameInfo.Pricing.Final;
                    if (gameInfo.Pricing.Discount !== "0") {
                        html += " ( " + gameInfo.Pricing.Discount + "% off )";
                    }
                    html += "</div>";
                    html += "</div>";
                }
            }

            html += "</div>";

            html += "<div class=\"col-md-6 pull-right\">";
            html += "<img src=\"" + gameInfo.ImageLink + "\" alt=\"" + gameInfo.ImageLink + "\" title=\"Game Info Link\" />";
            html += "</div>"; 

            html += "</div>";

            return html;
        }

        private static OnError = function (response) {
            $("#results").html(response.error);
        }
    }
}


$(document).ready(function () {
    var viewGame = new SteamLookupApp.ViewGame();
    viewGame.SetBindings($("#AppId").val());
});