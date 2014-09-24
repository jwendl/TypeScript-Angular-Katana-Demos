using System.Web.Mvc;

namespace SteamLookupApp.Controllers
{
    public class SteamController
        : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ViewGame()
        {
            return View();
        }
    }
}