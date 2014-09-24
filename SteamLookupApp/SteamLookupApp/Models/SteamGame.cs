using System;
using System.Collections.Generic;
using System.Globalization;

namespace SteamLookupApp.Models
{
    public class SteamGame
    {
        public SteamGame()
        {

        }

        public SteamGame(Data gameData)
        {
            Id = gameData.steam_appid;
            Name = gameData.name;
            Website = gameData.website;
            ImageLink = gameData.header_image;

            var priceOverview = gameData.price_overview;
            if (priceOverview != null)
            {
                Pricing = new PriceInformation()
                {
                    Final = FormatCurrency(priceOverview.final, priceOverview.currency),
                    Initial = FormatCurrency(priceOverview.initial, priceOverview.currency),
                    Discount = Convert.ToString(priceOverview.discount_percent),
                };
            }

            DownloadableContent = new List<SteamGame>();
        }

        // Based on http://stackoverflow.com/questions/13364984/format-decimal-as-currency-based-on-currency-code
        private string FormatCurrency(int value, string countryCode)
        {
            var symbols = GetCurrencySymbols();
            var decimalValue = (decimal)value / 100;
            return String.Format("{0}{1:0.00}", symbols[countryCode], decimalValue);
        }

        private static IDictionary<string, string> GetCurrencySymbols()
        {
            var result = new Dictionary<string, string>();
            var cultureStrings = new List<string>() { "en-US" };
            foreach (var cultureString in cultureStrings)
            {
                var cultureInfo = new CultureInfo(cultureString);
                var regionInfo = new RegionInfo(cultureInfo.Name);
                result[regionInfo.ISOCurrencySymbol] = regionInfo.CurrencySymbol;
            }

            return result;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string Website { get; set; }
        public string ImageLink { get; set; }
        public PriceInformation Pricing { get; set; }
        public IList<SteamGame> DownloadableContent { get; set; }
    }
}