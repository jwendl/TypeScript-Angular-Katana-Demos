using System.Threading.Tasks;
using System.Web.Http;
using TinySteamWrapper;

namespace SteamLookupApp.Controllers.api
{
    public class ProfileController
        : ApiController
    {
        public async Task<SteamProfile> Get(string userName)
        {
            SteamManager.SteamAPIKey = "1E17298A1D3EEC9E33720A02FEAD5232";

            var steamId = await SteamManager.GetSteamIDByName(userName);
            if (steamId != 0)
            {
                var profile = await SteamManager.GetSteamProfileByID(steamId);
                if (profile != null)
                {
                    await SteamManager.LoadGamesForProfile(profile);
                }

                return profile;
            }

            return default(SteamProfile);
        }
    }
}