using Newtonsoft.Json;
using SteamLookupApp.Models;
using System;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace SteamLookupApp.Controllers.api
{
    /// <summary>
    /// 
    /// </summary>
    public class GameController
        : ApiController
    {
        public async Task<SteamGame> Get(int appId)
        {
            using (var webClient = new WebClient())
            {
                var urlString = "http://store.steampowered.com/api/appdetails?appids={0}";
                var gameUri = new Uri(String.Format(urlString, appId));
                var jsonGameString = await webClient.DownloadStringTaskAsync(gameUri);
                jsonGameString = jsonGameString.Replace("[]", "{}");

                var jsonSteamGame = JsonConvert.DeserializeObject<JsonSteamGame>(jsonGameString);
                var dlcAppIds = String.Join(",", jsonSteamGame[appId].data.dlc);

                var dlcUri = new Uri(String.Format(urlString, dlcAppIds));
                var jsonDlcString = await webClient.DownloadStringTaskAsync(dlcUri);
                jsonDlcString = jsonDlcString.Replace("[]", "{}");
                var jsonDlcList = JsonConvert.DeserializeObject<JsonSteamGame>(jsonDlcString);
            }

            return default(SteamGame);
        }
    }
}